import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  ConfirmationResult,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/config/firebase';

class FirebaseAuthService {
  private recaptchaVerifier: RecaptchaVerifier | null = null;

  // Google Sign-In
  async signInWithGoogle(): Promise<FirebaseUser | null> {
    try {
      const provider = new GoogleAuthProvider();
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  // Phone Number Sign-In Setup
  async setupRecaptcha(containerId: string): Promise<void> {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved - will proceed with submit function
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again
          this.recaptchaVerifier = null;
        }
      });
    }
  }

  // Send OTP to phone number
  async sendOTP(phoneNumber: string): Promise<ConfirmationResult> {
    try {
      if (!this.recaptchaVerifier) {
        throw new Error('Recaptcha not initialized');
      }
      
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        phoneNumber, 
        this.recaptchaVerifier
      );
      
      return confirmationResult;
    } catch (error) {
      console.error('OTP send error:', error);
      // Reset recaptcha on error
      this.recaptchaVerifier = null;
      throw error;
    }
  }

  // Verify OTP
  async verifyOTP(confirmationResult: ConfirmationResult, otp: string): Promise<FirebaseUser | null> {
    try {
      const result = await confirmationResult.confirm(otp);
      return result.user;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await auth.signOut();
      this.recaptchaVerifier = null;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return auth.onAuthStateChanged(callback);
  }
}

export const firebaseAuthService = new FirebaseAuthService();