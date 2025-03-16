
import { motion } from "framer-motion";
import LinkButton from "./LinkButton";
import { Mail } from "lucide-react";

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel max-w-2xl w-full p-8 md:p-12"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-2 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight title-gradient">
            Stanley
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light italic">
            Building cool shit because I can.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-8" />
          
          <div className="grid grid-cols-3 gap-4">
            <LinkButton
              icon={<Mail className="w-5 h-5" />}
              href="mailto:stanleytrevs@gmail.com"
              label="Email"
              delay={0.6}
            />
            <LinkButton
              icon={
                <div className="relative w-5 h-5">
                  <img 
                    src="https://i.imgur.com/9VcMLCL.png" 
                    alt="X" 
                    className="w-full h-full object-contain"
                  />
                </div>
              }
              href="https://x.com/stanleytrevis"
              label="Twitter"
              delay={0.7}
            />
            <LinkButton
              icon={
                <div className="relative w-5 h-5">
                  <img 
                    src="https://i.imgur.com/dastgOA.png" 
                    alt="Discord" 
                    className="w-full h-full object-contain"
                  />
                </div>
              }
              href="discord.gg/wx6DsDYu"
              label="Discord"
              delay={0.8}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
