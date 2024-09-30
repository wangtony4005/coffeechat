import React, { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Fade = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      console.log("isInView", isInView);
      controls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 0 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 2.0, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Fade;
