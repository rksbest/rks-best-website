'use server';

import { EnquiryEmail } from '@/components/emails/enquiry-email';
import { VerificationEmail } from '@/components/emails/verification-email';
import { createHmac, timingSafeEqual } from 'crypto';
import { Resend } from 'resend';
import { z } from 'zod';

// Schemas
const enquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  code: z.string().length(6, { message: 'Verification code must be exactly 6 digits.' }),
  mobile: z.string().min(10, { message: 'Mobile number must be at least 10 digits.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  token: z.string().optional(),
});

const emailSchema = z
  .string()
  .email({ message: 'Please enter a valid email address.' });

const verifyCodeSchema = z.object({
    email: z.string().email(),
    code: z.string().length(6, { message: 'Verification code must be exactly 6 digits.' }),
    token: z.string(),
});

// State Type for form
export type EnquiryFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resendDomain = process.env.RESEND_DOMAIN;
const verificationSecret = process.env.VERIFICATION_SECRET;

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sign(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('hex');
}

export async function verifyCode(
  input: z.infer<typeof verifyCodeSchema>
): Promise<{ success: boolean; message: string }> {
  const validatedFields = verifyCodeSchema.safeParse(input);
  if (!validatedFields.success) {
    return { success: false, message: 'Invalid input.' };
  }

  if (!verificationSecret) {
      console.error('VERIFICATION_SECRET is not set.');
      return { success: false, message: 'Server configuration error.' };
  }

  const { email, code, token } = validatedFields.data;

  try {
    const [encodedTokenEmail, tokenExpires, tokenSignature] = token.split('.');
    if (!encodedTokenEmail || !tokenExpires || !tokenSignature) {
        throw new Error('Invalid token format');
    }
    const tokenEmail = Buffer.from(encodedTokenEmail, 'base64').toString('utf-8');
    const expires = Number(tokenExpires);

    if (Date.now() > expires) {
      return { success: false, message: 'Verification code has expired.' };
    }

    if (email !== tokenEmail) {
      return { success: false, message: 'Email address mismatch.' };
    }

    const dataToSign = `${encodedTokenEmail}.${expires}.${code}`;
    const expectedSignature = sign(dataToSign, verificationSecret);

    const expectedSignatureBuffer = Buffer.from(expectedSignature);
    const receivedSignatureBuffer = Buffer.from(tokenSignature);

    if (
      expectedSignatureBuffer.length !== receivedSignatureBuffer.length ||
      !timingSafeEqual(expectedSignatureBuffer, receivedSignatureBuffer)
    ) {
      return { success: false, message: 'Invalid verification code.' };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error('Token verification error:', err);
    return { success: false, message };
  }

  return { success: true, message: 'Email verified successfully!' };
}

export async function sendVerificationCode(
  email: string
): Promise<{ success: boolean; message: string; token?: string }> {
  if (!resendApiKey || !resendDomain || !verificationSecret) {
    console.error(
      '[v0] RESEND_API_KEY, RESEND_DOMAIN, or VERIFICATION_SECRET environment variable is not set.',
      {
        hasApiKey: !!resendApiKey,
        hasDomain: !!resendDomain,
        hasSecret: !!verificationSecret,
      }
    );
    return { success: false, message: 'Server configuration error.' };
  }

  const validatedEmail = emailSchema.safeParse(email);
  if (!validatedEmail.success) {
    return { success: false, message: 'Invalid email address.' };
  }

  const resend = new Resend(resendApiKey);
  const verificationCode = generateVerificationCode();
  const expires = (Date.now() + 10 * 60 * 1000).toString(); // 10 minutes expiry

  // Base64 encode the email to handle special characters like '.'
  const encodedEmail = Buffer.from(email).toString('base64');
  const dataToSign = `${encodedEmail}.${expires}.${verificationCode}`;
  const signature = sign(dataToSign, verificationSecret);
  const token = `${encodedEmail}.${expires}.${signature}`;

  try {
    console.log('[v0] Sending verification email with Resend', { email, code: verificationCode });
    const response = await resend.emails.send({
      from: `RKS.Best Verification <verify@${resendDomain}>`,
      to: email,
      subject: 'Your Verification Code for RKS.Best',
      react: VerificationEmail({ verificationCode }),
      text: `Your verification code is: ${verificationCode}`,
    });
    console.log('[v0] Resend email send response:', response);
    return { success: true, message: 'Verification code sent.', token };
  } catch (error) {
    console.error('[v0] Resend API Error (Verification):', error);
    return { success: false, message: 'Failed to send verification code.' };
  }
}

export async function handleEnquiry(
  prevState: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  if (!resendApiKey || !resendDomain || !verificationSecret) {
    console.error(
      'RESEND_API_KEY, RESEND_DOMAIN or VERIFICATION_SECRET environment variable is not set.'
    );
    return {
      status: 'error',
      message: 'Server configuration error. Please try again later.',
    };
  }

  const validatedFields = enquirySchema.safeParse({
    name: formData.get('name') ?? '',
    code: formData.get('code') ?? '',
    mobile: formData.get('mobile') ?? '',
    message: formData.get('message') ?? '',
    token: formData.get('token') ?? undefined,
  });

  if (!validatedFields.success) {
    const firstError = Object.values(
      validatedFields.error.flatten().fieldErrors
    )[0]?.[0];
    return {
      status: 'error',
      message: firstError || 'Please check your input and try again.',
    };
  }

  const { name, code, mobile, message, token } = validatedFields.data;
  
  let email: string;

  // Verify the token and code
  if (!token) {
    return {
      status: 'error',
      message: 'Verification token is missing. Please try again.',
    };
  }

  try {
    const [encodedTokenEmail, tokenExpires, tokenSignature] = token.split('.');
    if (!encodedTokenEmail || !tokenExpires || !tokenSignature) {
        throw new Error('Invalid token format');
    }
    const tokenEmail = Buffer.from(encodedTokenEmail, 'base64').toString('utf-8');
    const expires = Number(tokenExpires);

    if (Date.now() > expires) {
      return {
        status: 'error',
        message: 'Verification code has expired. Please request a new one.',
      };
    }

    const validatedEmail = emailSchema.safeParse(tokenEmail);
    if (!validatedEmail.success) {
        return {
            status: 'error',
            message: 'Invalid email format in token. Please try again.',
        };
    }
    email = validatedEmail.data;

    const dataToSign = `${encodedTokenEmail}.${expires}.${code}`;
    const expectedSignature = sign(dataToSign, verificationSecret);

    const expectedSignatureBuffer = Buffer.from(expectedSignature);
    const receivedSignatureBuffer = Buffer.from(tokenSignature);

    // Use timingSafeEqual to prevent timing attacks
    if (
      expectedSignatureBuffer.length !== receivedSignatureBuffer.length ||
      !timingSafeEqual(expectedSignatureBuffer, receivedSignatureBuffer)
    ) {
      return {
        status: 'error',
        message: 'Invalid verification code. Please try again.',
      };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error('Token verification error:', err);
    return { status: 'error', message };
  }

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: `RKS.Best Enquiry <noreply@${resendDomain}>`,
      to: 'iam@rks.best',
      subject: 'New Verified Enquiry from RKS.Best Website',
      react: EnquiryEmail({ name, email, mobile, message }),
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
    });
    return {
      status: 'success',
      message: 'Your enquiry has been sent successfully!',
    };
  } catch (error) {
    console.error('Resend API Error (Final Send):', error);
    return {
      status: 'error',
      message: 'There was an error sending your enquiry. Please try again.',
    };
  }
}
