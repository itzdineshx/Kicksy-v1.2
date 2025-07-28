import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  ConfirmationResult,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, isFirebaseEnabled } from '@/config/firebase';

class FirebaseAuthService {
  private recaptchaVerifier: RecaptchaVerifier | null = null;

  // Google Sign-In
  async signInWithGoogle(): Promise<FirebaseUser | null> {
    if (!isFirebaseEnabled || !auth) {
      throw new Error('Firebase is not properly configured. Please add your Firebase credentials.');
    }
    
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
    if (!isFirebaseEnabled || !auth) {
      return; // Silently fail if Firebase is not configured
    }
    
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
    if (!isFirebaseEnabled || !auth) {
      throw new Error('Firebase is not properly configured. Please add your Firebase credentials.');
    }
    
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
    if (!isFirebaseEnabled || !auth) {
      return; // Silently fail if Firebase is not configured
    }
    
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
    if (!isFirebaseEnabled || !auth) {
      return null;
    }
    return auth.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    if (!isFirebaseEnabled || !auth) {
      callback(null);
      return () => {}; // Return empty unsubscribe function
    }
    return auth.onAuthStateChanged(callback);
  }
}

export const firebaseAuthService = new FirebaseAuthService();