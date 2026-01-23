import { motion } from 'framer-motion'

export function FloatingElement({ delay = 0, children, className = '' }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        rotateZ: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

