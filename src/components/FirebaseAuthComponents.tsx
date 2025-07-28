import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { firebaseAuthService } from '@/services/FirebaseAuthService';
import { Phone, Mail } from 'lucide-react';
import type { ConfirmationResult } from 'firebase/auth';

export const GoogleSignInButton = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await firebaseAuthService.signInWithGoogle();
      if (user) {
        toast({
          title: "Success!",
          description: `Welcome, ${user.displayName || user.email}!`
        });
        onSuccess?.();
      }
    } catch (error: any) {
      toast({
        title: "Google Sign-In Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      variant="outline"
      className="w-full"
    >
      <Mail className="w-4 h-4 mr-2" />
      {isLoading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
};

export const PhoneAuthComponent = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Setup recaptcha when component mounts
    firebaseAuthService.setupRecaptcha('recaptcha-container');
  }, []);

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await firebaseAuthService.sendOTP(phoneNumber);
      setConfirmationResult(result);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code"
      });
    } catch (error: any) {
      toast({
        title: "Failed to Send OTP",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim() || !confirmationResult) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the verification code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = await firebaseAuthService.verifyOTP(confirmationResult, otp);
      if (user) {
        toast({
          title: "Success!",
          description: `Welcome, ${user.phoneNumber}!`
        });
        onSuccess?.();
      }
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid verification code",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Phone Number Sign-In
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!confirmationResult ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Enter your phone number with country code (e.g., +1234567890)
              </p>
            </div>
            <Button 
              onClick={handleSendOTP} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full"
                maxLength={6}
              />
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code sent to {phoneNumber}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleVerifyOTP} 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button 
                onClick={() => {
                  setConfirmationResult(null);
                  setOtp('');
                }} 
                variant="outline"
                disabled={isLoading}
              >
                Change Number
              </Button>
            </div>
          </div>
        )}
        
        {/* Recaptcha container - hidden */}
        <div id="recaptcha-container" className="hidden"></div>
      </CardContent>
    </Card>
  );
};