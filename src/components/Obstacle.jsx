import styled from "styled-components";
import { motion } from "framer-motion";

const ObstacleBox = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: linear-gradient(to bottom, #0072ff, #004aad);
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.6);
`;

export default function Obstacle({ pos }) {
  return <ObstacleBox style={{ left: pos }} animate={{ x: pos }} />;
}

