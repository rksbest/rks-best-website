import * as React from 'react';

interface VerificationEmailProps {
  verificationCode: string;
}

export const VerificationEmail: React.FC<Readonly<VerificationEmailProps>> = ({
  verificationCode,
}) => (
  <div style={{
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
  }}>
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RKS%20Logo_20260324_210353_0000-DQefPGce7KB0TzNoOM0Grb217zXwHy.png"
          alt="RKS Logo"
          style={{
            height: '70px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#1a1a1a',
      }}>
        Your RKS.Best Verification Code
      </h1>

      <p style={{
        fontSize: '16px',
        color: '#333',
        marginBottom: '20px',
        lineHeight: '1.6',
      }}>
        Hi,
      </p>

      <p style={{
        fontSize: '16px',
        color: '#333',
        marginBottom: '30px',
        lineHeight: '1.6',
      }}>
        Thank you for your enquiry. Please use the following code to verify your email address. This code will expire in 10 minutes.
      </p>

      <div style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '6px',
        textAlign: 'center',
        marginBottom: '30px',
        border: '2px solid #e0e0e0',
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#000',
          margin: '0',
          letterSpacing: '2px',
        }}>
          {verificationCode}
        </h2>
      </div>

      <p style={{
        fontSize: '14px',
        color: '#666',
        marginBottom: '30px',
        lineHeight: '1.6',
      }}>
        If you did not request this, please ignore this email.
      </p>

      <hr style={{
        border: 'none',
        borderTop: '1px solid #e0e0e0',
        margin: '30px 0',
      }} />

      <div style={{
        textAlign: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #e0e0e0',
      }}>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RKS%20Logo_20260324_210353_0000-DQefPGce7KB0TzNoOM0Grb217zXwHy.png"
          alt="RKS Logo"
          style={{
            height: '35px',
            width: 'auto',
            objectFit: 'contain',
            marginBottom: '10px',
          }}
        />
        <p style={{
          fontSize: '11px',
          color: '#bbb',
          margin: '0',
        }}>
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    </div>
  </div>
);
