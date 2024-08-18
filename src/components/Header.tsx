"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Flag from "react-world-flags"; // Import the Flag component
import NumberTicker from "./magicui/number-ticker";

export function Header() {
  return (
    <div className="relative z-10 flex justify-center items-center text-center px-4">
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
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto flex flex-wrap items-center justify-center"
        >
          <Highlight className="text-black dark:text-white flex items-center">
            Hari Kemerdekaan Indonesia ke-
            <NumberTicker value={79} />
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: [10, -4, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className={`ml-2 mr-2 flutter`}
            >
              <Flag code="ID" style={{ width: 48, height: 32 }} alt="Indonesia Flag" />
            </motion.div>
          </Highlight>
        </motion.h1>
      </HeroHighlight>
    </div>
  );
}
