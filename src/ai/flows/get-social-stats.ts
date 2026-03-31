'use server';
/**
 * @fileOverview A flow for fetching social media statistics and content.
 *
 * - getSocialStats - Fetches statistics and content for supported social media platforms.
 * - SocialStatsOutput - The return type for the getSocialstats function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const YoutubeVideoSchema = z.object({
  title: z.string().describe('The title of the YouTube video.'),
  thumbnailUrl: z.string().url().describe('The URL of the video thumbnail.'),
  videoId: z.string().describe('The ID of the video.'),
});

const SocialStatsOutputSchema = z.object({
  youtubeSubscribers: z.number().optional().describe('The number of YouTube subscribers.'),
  youtubeLatestVideos: z.array(YoutubeVideoSchema).optional().describe('A list of the latest YouTube videos.'),
});
export type SocialStatsOutput = z.infer<typeof SocialStatsOutputSchema>;

export async function getSocialStats(): Promise<SocialStatsOutput> {
  return getSocialStatsFlow();
}

const getSocialStatsFlow = ai.defineFlow(
  {
    name: 'getSocialStatsFlow',
    inputSchema: z.void(),
    outputSchema: SocialStatsOutputSchema,
  },
  async () => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.warn('YOUTUBE_API_KEY environment variable not set. Please set it to fetch YouTube stats.');
      return {};
    }

    const channelId = 'UCnwUI6G3UL3jWw_gr7zTtAw'; // for @RKSBEST

    try {
      // Fetch channel statistics
      const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
      const channelResponse = await fetch(channelUrl);
      if (!channelResponse.ok) {
        const errorData = await channelResponse.json();
        console.error('Failed to fetch YouTube channel data:', channelResponse.statusText, errorData.error?.message || JSON.stringify(errorData));
        // Continue to try and fetch videos even if stats fail
      }
      
      const channelData = channelResponse.ok ? await channelResponse.json() : null;
      const subscriberCount = channelData?.items?.[0]?.statistics?.subscriberCount;

      let latestVideos: z.infer<typeof YoutubeVideoSchema>[] | undefined;
      
      // Fetch latest videos using the search endpoint, which is more reliable.
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=2&key=${apiKey}`;
      const videosResponse = await fetch(searchUrl);

      if (videosResponse.ok) {
        const videosData = await videosResponse.json();
        latestVideos = videosData.items?.map((item: any) => {
          // Ensure the item is a video before processing.
          if (item.id.kind === 'youtube#video') {
            return {
              title: item.snippet.title,
              thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
              videoId: item.id.videoId,
            }
          }
          return null;
        }).filter(Boolean);
      } else {
        const errorData = await videosResponse.json();
        console.error('Failed to fetch YouTube videos:', videosResponse.statusText, errorData.error?.message || JSON.stringify(errorData));
      }

      return {
        youtubeSubscribers: subscriberCount ? parseInt(subscriberCount, 10) : undefined,
        youtubeLatestVideos: latestVideos,
      };

    } catch (error) {
      console.error('Error fetching YouTube data:', error instanceof Error ? error.message : error);
      return {};
    }
  }
);
