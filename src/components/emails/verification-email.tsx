import * as React from 'react';

interface VerificationEmailProps {
  verificationCode: string;
}

export const VerificationEmail: React.FC<Readonly<VerificationEmailProps>> = ({
  verificationCode,
}) => (
  <div>
    <h1>Your RKS.Best Verification Code</h1>
    <p>Hi,</p>
    <p>
      Thank you for your enquiry. Please use the following code to verify your
      email address. This code will expire in 10 minutes.
    </p>
    <hr />
    <h2>
      <strong>Verification Code: {verificationCode}</strong>
    </h2>
    <hr />
    <p>If you did not request this, please ignore this email.</p>
  </div>
);
