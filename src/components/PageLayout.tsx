
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  // Scroll to top when page is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="container mx-auto px-4 pt-20 sm:pt-24"
        >
          {(title || subtitle) && (
            <motion.header 
              className="mb-8 md:mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {title && (
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
                  <motion.span 
                    className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary inline-block"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {title}
                  </motion.span>
                </h1>
              )}
              {subtitle && (
                <motion.p 
                  className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </motion.header>
          )}
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageLayout;
