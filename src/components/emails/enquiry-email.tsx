import * as React from 'react';

interface EnquiryEmailProps {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

export const EnquiryEmail: React.FC<Readonly<EnquiryEmailProps>> = ({
  name,
  email,
  mobile,
  message,
}) => (
  <div>
    <h1>New Enquiry from RKS.Best Website</h1>
    <p>
      You have received a new enquiry from your website contact form.
    </p>
    <hr />
    <h2>Enquiry Details:</h2>
    <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Mobile:</strong> {mobile}</li>
    </ul>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
);
