import React, { useState } from "react";
import { motion } from "framer-motion";
import '../App.css' 

const Description = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div>
      <div id="div3">
        <motion.button
          className="btn btn-primary"
          whileHover={{
            scale: 1.2,
          }}
          onClick={() => setIsAnimating(!isAnimating)}
        >
          Нажми
        </motion.button>
        <motion.p
          animate={{
            x: isAnimating ? -1080 : 500,
            opacity: isAnimating ? 0 : 1,
          }}
        >
          Текс который появляется
        </motion.p>
      </div>
      <div id="div1">
        <motion.img
          src="img/four.jpg"
          width={600}
          whileHover={{
            scale: 2,
          }}
        ></motion.img>
      </div>

      <div id="div2">
        <motion.img
          src="logo512.png"
          width={400}
          whileTap={{
            x: 1000,
            opacity: 1,
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
          }}
        ></motion.img>
      </div>
    </div>
  );
};

export default Description;
