
import StarBackground from "@/components/StarBackground";
import ProfileCard from "@/components/ProfileCard";
import CursorEffect from "@/components/CursorEffect";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Index = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <StarBackground />
      <CursorEffect />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-radial from-accent/5 to-transparent pointer-events-none"
      />
      
      <div className="z-10">
        <ProfileCard />
      </div>
    </div>
  );
};

export default Index;
