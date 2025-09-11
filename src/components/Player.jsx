import styled from "styled-components";

const PlayerBox = styled.div`
  position: absolute;
  bottom: 50px;
  left: ${({ position }) => position}px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle, red, darkred);
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
`;

export default function Player({ position }) {
  return <PlayerBox position={position} />;
}
