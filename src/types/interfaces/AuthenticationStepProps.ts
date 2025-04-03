export interface AuthenticationStepProps {
  handleNext?: () => Promise<void>;
  handleBack?: () => void;
  handleLogin?: () => Promise<void>;
  handleFinish?: () => Promise<void>;
  error?: string;
  [key: string]: any;
}
