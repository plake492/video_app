import React from "react"
import { motion } from "framer-motion"

interface AnimatedChildProps {
  children: React.ReactNode
  variants?: any // Custom animation variants
}

interface StaggeredAnimationProps {
  children: React.ReactNode[]
  childVariants?: { [key: number]: any } // Map of child-specific variants
  stagger?: number // Stagger delay
}

// Wrapper for individual child animations
export const AnimatedChild = ({ children, variants }: AnimatedChildProps) => {
  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={variants || defaultVariants} // Use default or custom variants
    >
      {children}
    </motion.div>
  )
}

// Parent component with staggered animations
export const StaggeredAnimation = ({
  children,
  childVariants = {},
  stagger,
}: StaggeredAnimationProps) => {
  // Variants for the parent container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ?? 0.66, // Stagger delay
      },
    },
  }

  return (
    <motion.div
      className="animation-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, (child, index) => {
        // Automatically wrap child in `AnimatedChild` if it has a variant or needs default animation
        const variants = childVariants[index]
        if (React.isValidElement(child)) {
          return variants ? (
            <AnimatedChild variants={variants}>{child}</AnimatedChild>
          ) : (
            <AnimatedChild>{child}</AnimatedChild> // Use default animation
          )
        }
        return child // If not a valid React element, render as is
      })}
    </motion.div>
  )
}
