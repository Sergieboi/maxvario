"use client";

import { cn } from "@nextui-org/react";
import { FC, ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastProps = {
  message: string | ReactNode;
  modelType: "success" | "error";
  hide?: VoidFunction;
};

const MVToast: FC<ToastProps> = ({ message, modelType, hide }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Trigger exit animation after 4 seconds
      if (hide) hide(); // Call hide function
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.3, ease: "easeIn" },
          }}
          className={cn(
            "fixed bottom-4 left-4 p-4 rounded-md text-white z-30 min-w-48",
            modelType === "success" ? "bg-success" : "bg-danger"
          )}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MVToast;
