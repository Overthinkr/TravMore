import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const Card = ({ title, distance, location, image }) => {
  const x = useMotionValue(0)
  const opacity = useTransform(
    x,
    [-100,0,100],
    [0.2,1,0.4]
  )

  return(
    <motion.div style={opacity}>
      <motion.div
      drag='x'
      dragConstraints={{left:0, right:0}}
      style={{x}}>
        content
      </motion.div>
    </motion.div>
  )