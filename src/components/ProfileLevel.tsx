
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProfileLevelProps {
  level: number;
  progress: number; // 0-100
  className?: string;
}

const ProfileLevel = ({ level, progress, className }: ProfileLevelProps) => {
  const [progressAnimation, setProgressAnimation] = useState(0);
  
  useEffect(() => {
    // Animate progress from 0 to the actual value
    const timer = setTimeout(() => {
      setProgressAnimation(progress);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative rounded-lg bg-card p-4 border border-white/10 shadow-lg hover:shadow-accent/5 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Nível de fã
        </h3>
        <motion.span 
          whileHover={{ scale: 1.1 }}
          className="text-lg font-bold text-accent text-glow transition-all duration-300"
        >
          {level}
        </motion.span>
      </div>
      <Progress 
        value={progressAnimation} 
        className="h-2 mb-2 overflow-hidden" 
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="font-medium">{progress}%</span>
        <motion.span 
          whileHover={{ color: "hsl(var(--accent))" }}
          className="transition-colors duration-300"
        >
          Próximo nível: {level + 1}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ProfileLevel;
