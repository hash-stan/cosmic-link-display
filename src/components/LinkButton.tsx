
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LinkButtonProps {
  icon: ReactNode;
  href: string;
  label: string;
  delay?: number;
}

const LinkButton = ({ icon, href, label, delay = 0 }: LinkButtonProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: delay,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -3 }}
      className="link-icon-wrapper"
      aria-label={label}
    >
      <div className="relative z-10">
        {icon}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-accent/30 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
      
      <motion.div
        className="absolute -inset-px rounded-3xl opacity-0 bg-gradient-to-br from-accent/20 to-transparent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

export default LinkButton;
