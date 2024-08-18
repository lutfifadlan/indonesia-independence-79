"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Flag from 'react-world-flags'; // Import the Flag component
import NumberTicker from "./magicui/number-ticker";

export function Header() {
  return (
    <div className="relative z-10 flex justify-center items-center">
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-4xl px-4  font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto flex items-center justify-center"
        >
          <Highlight className="text-black dark:text-white flex items-center">
            Hari Kemerdekaan Indonesia ke-
            <NumberTicker value={79} />
          </Highlight>
          <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: [10, -4, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className={`ml-2 flutter`}
            >
              <Flag code="ID" style={{ width: 48, height: 32 }} alt="Indonesia Flag" />
          </motion.div>
        </motion.h1>
      </HeroHighlight>
    </div>
  );
}