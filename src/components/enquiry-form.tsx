'use client';

import * as React from 'react';
import { useFormStatus } from 'react-dom';
import { handleEnquiry, sendVerificationCode, verifyCode, type EnquiryFormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DigitInput } from '@/components/digit-input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const initialState: EnquiryFormState = {
  status: 'idle',
  message: '',
};

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={!disabled ? 'success' : 'default'}
      className={cn(
        "w-full",
        !disabled && "animate-pulse-shadow-success"
      )}
      disabled={disabled || pending}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Enquiry
    </Button>
  );
}

const emailSchema = z.string().email({ message: 'Please enter a valid email address.' });

export function EnquiryForm({ onFormSubmit }: { onFormSubmit: () => void }) {
  const [state, formAction] = React.useActionState(handleEnquiry, initialState);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const codeRef = React.useRef<HTMLInputElement>(null);

  const [showVerification, setShowVerification] = React.useState(false);
  const [verificationToken, setVerificationToken] = React.useState<string | null>(null);
  const [isSendingCode, setIsSendingCode] = React.useState(false);
  const [cooldown, setCooldown] = React.useState(0);
  
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);
  const [verificationError, setVerificationError] = React.useState<string | null>(null);

  const isSuccess = state.status === 'success';

  // Cooldown timer effect
  React.useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Effect to handle form submission result (toast and reset)
  React.useEffect(() => {
    if (state.message && state.status !== 'idle') {
      toast({
        title: state.status === 'success' ? 'Success!' : 'Error',
        description: state.message,
        variant: state.status === 'error' ? 'destructive' : 'default',
        duration: 5000,
      });

      if (isSuccess) {
        formRef.current?.reset();
        setShowVerification(false);
        setVerificationToken(null);
        setCooldown(0);
        setIsVerified(false);
        setVerificationError(null);
        setTimeout(() => onFormSubmit(), 1000); 
      }
    }
  }, [state, toast, onFormSubmit, isSuccess]);

  const resetVerificationState = () => {
      setShowVerification(false);
      setIsVerified(false);
      setVerificationToken(null);
      setVerificationError(null);
      if (codeRef.current) {
          codeRef.current.value = '';
      }
  };
  
  const handleEmailChange = () => {
    if (isVerified || showVerification) {
        resetVerificationState();
    }
  };

  const handleSendCode = async () => {
    if (isSendingCode || cooldown > 0 || isVerified) return;

    const email = emailRef.current?.value;
    
    // Always reset previous verification state when sending a new code
    resetVerificationState();

    if (!email) {
        toast({ title: 'Error', description: 'Please enter an email address first.', variant: 'destructive'});
        return;
    }

    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: 'Invalid Email',
        description: validation.error.errors[0].message,
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    setIsSendingCode(true);
    const result = await sendVerificationCode(email);
    setIsSendingCode(false);

    if (result.success && result.token) {
      setVerificationToken(result.token);
      setShowVerification(true);
      setCooldown(30); // 30-second cooldown
      toast({
        title: 'Check Your Email',
        description: `A verification code has been sent to ${email}.`,
        duration: 5000,
      });
      // A slight delay to allow the code input to render before focusing
      setTimeout(() => codeRef.current?.focus(), 100);
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
        duration: 5000,
      });
    }
  };

  const handleCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setVerificationError(null);

    // Auto-verify when 6 digits are entered
    if (code.length === 6) {
        if (!verificationToken || !emailRef.current?.value) return;

        setIsVerifying(true);
        const result = await verifyCode({
            email: emailRef.current.value,
            code,
            token: verificationToken,
        });
        setIsVerifying(false);

        if (result.success) {
            setIsVerified(true);
            setVerificationError(null);
            toast({
                title: 'Success!',
                description: result.message,
                variant: 'default',
            });
        } else {
            setIsVerified(false);
            setVerificationError(result.message);
        }
    }
  }

  const handleEmailBlur = () => {
    const email = emailRef.current?.value;
    const validation = emailSchema.safeParse(email);
    // Send code on blur only if email is valid and we haven't started verification for it yet
    if (validation.success && !showVerification && !isVerified) {
      handleSendCode();
    }
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your Name" required readOnly={isSuccess} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            readOnly={isVerified || isSuccess}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
          />
        </div>
        
        {verificationToken && <input type="hidden" name="token" value={verificationToken} />}

        {showVerification && (
          <div className="space-y-2 animate-in fade-in">
             <div className="flex items-center justify-between">
                <Label htmlFor="code">Verification Code</Label>
                <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 text-xs"
                    onClick={handleSendCode}
                    disabled={isSendingCode || cooldown > 0 || isVerified}
                >
                    {isSendingCode 
                        ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        : (cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code')
                    }
                </Button>
            </div>
            <div className="relative">
              <Input 
                ref={codeRef}
                id="code" 
                name="code" 
                type="text" 
                placeholder="Enter 6-digit code" 
                required 
                minLength={6} 
                maxLength={6} 
                pattern="\\d{6}" 
                readOnly={isVerified || isSuccess}
                onChange={handleCodeChange} 
                className={cn(
                    verificationError && "border-destructive focus-visible:ring-destructive",
                    isVerified && "border-green-500 focus-visible:ring-green-500"
                )}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  {isVerifying && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  {!isVerifying && isVerified && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {!isVerifying && verificationError && <XCircle className="h-4 w-4 text-destructive" />}
              </div>
            </div>
            {verificationError && <p className="text-sm text-destructive mt-1">{verificationError}</p>}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <DigitInput id="mobile" name="mobile" type="tel" placeholder="Your Mobile Number" required minLength={10} readOnly={isSuccess} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="How can I help you?" required minLength={10} readOnly={isSuccess} />
        </div>
      
      {!isSuccess && <SubmitButton disabled={!isVerified} />}
    </form>
  );
}
