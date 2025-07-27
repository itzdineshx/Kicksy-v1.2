import { useNotificationNavigation } from "@/hooks/useNotificationNavigation";
import { ReactNode } from "react";

interface NavigationHandlerProps {
  children: ReactNode;
}

const NavigationHandler = ({ children }: NavigationHandlerProps) => {
  // This component is inside Router context, so useNavigate works here
  useNotificationNavigation();
  
  return <>{children}</>;
};

export default NavigationHandler;