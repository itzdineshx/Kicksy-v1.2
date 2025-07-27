import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressiveDisclosureProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: "default" | "minimal" | "card";
  className?: string;
}

const ProgressiveDisclosure = ({ 
  title, 
  children, 
  defaultOpen = false, 
  variant = "default",
  className = ""
}: ProgressiveDisclosureProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: 16
    }
  };

  if (variant === "minimal") {
    return (
      <div className={`space-y-2 ${className}`}>
        <Button
          variant="ghost"
          onClick={toggleOpen}
          className="flex items-center justify-between w-full p-2 h-auto text-left hover:bg-muted/50"
        >
          <span className="font-medium">{title}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card className={className}>
        <CardHeader 
          className="cursor-pointer hover:bg-muted/50 transition-colors duration-200"
          onClick={toggleOpen}
        >
          <CardTitle className="flex items-center justify-between">
            {title}
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CardTitle>
        </CardHeader>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <CardContent>{children}</CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    );
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      <Button
        variant="ghost"
        onClick={toggleOpen}
        className="flex items-center justify-between w-full p-4 h-auto text-left rounded-lg hover:bg-muted/50"
      >
        <span className="font-semibold text-lg">{title}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className="px-4 pb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressiveDisclosure;