import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// 🎮 Styled-components

const GameContainer = styled.div`
  width: 800px;
  height: 400px;
  margin: 30px auto;
  background: linear-gradient(180deg, #1e1e2f, #121212);
  border: 3px solid #333;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.6);
`;

const Player = styled.div`
  position: absolute;
  bottom: 50px;
  left: ${({ position }) => position}px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle, red, darkred);
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
`;

const Obstacle = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: linear-gradient(to bottom, #0072ff, #004aad);
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.6);
`;

const GameButton = styled.button`
  padding: 14px 28px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  color: white;
  cursor: pointer;
  margin-top: 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
  }
`;

const ProgressBar = styled.div`
  width: 90%;
  height: 20px;
  background: #ccc;
  margin: 15px auto;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ speed }) => speed * 6}px;
  background: ${({ speed }) =>
    speed < 7 ? "green" : speed < 12 ? "orange" : "red"};
  transition: width 0.2s ease, background 0.3s ease;
`;

const CenterScreen = styled.div`
  text-align: center;
  color: white;
  padding-top: 100px;
`;

// 🎮 Componente principal

export default function Game() {
  const [screen, setScreen] = useState("start"); // start | play | end
  const [playerPos, setPlayerPos] = useState(100);
  const [obstacles, setObstacles] = useState([]);
  const [speed, setSpeed] = useState(5);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (screen !== "play") return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && playerPos > 0) {
        setPlayerPos((pos) => pos - 20);
      } else if (e.key === "ArrowRight" && playerPos < 750) {
        setPlayerPos((pos) => pos + 20);
      }
    };
    window.addEventListener("keydown", handleKey);

    const interval = setInterval(() => {
      setObstacles((obs) => {
        const newObs = obs.map((o) => ({ ...o, left: o.left - speed }));
        return [...newObs.filter((o) => o.left > -50), { left: 800 }];
      });
      setScore((s) => s + 1);
      setSpeed((sp) => sp + 0.01);
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKey);
      clearInterval(interval);
    };
  }, [screen, playerPos, speed]);

  // 🚨 Colisiones
  useEffect(() => {
    if (screen !== "play") return;
    obstacles.forEach((o) => {
      if (o.left < playerPos + 50 && o.left + 50 > playerPos) {
        setScreen("end");
      }
    });
  }, [obstacles, playerPos, screen]);

  return (
    <GameContainer>
      {screen === "start" && (
        <CenterScreen>
          <h1>🚀 Adaptive Runner</h1>
          <p>Mueve el jugador con ← → y esquiva los obstáculos</p>
          <GameButton onClick={() => setScreen("play")}>Iniciar Juego</GameButton>
        </CenterScreen>
      )}

      {screen === "play" && (
        <>
          <ProgressBar>
            <ProgressFill speed={speed} />
          </ProgressBar>
          <Player position={playerPos} />
          {obstacles.map((o, i) => (
            <Obstacle key={i} style={{ left: o.left }} />
          ))}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              color: "white",
              fontSize: "18px",
            }}
          >
            Puntuación: {score}
          </div>
        </>
      )}

      {screen === "end" && (
        <CenterScreen>
          <h1>💀 Fin del Juego</h1>
          <p>Tu puntuación: {score}</p>
          <GameButton
            onClick={() => {
              setPlayerPos(100);
              setObstacles([]);
              setSpeed(5);
              setScore(0);
              setScreen("start");
            }}
          >
            Reiniciar
          </GameButton>
        </CenterScreen>
      )}
    </GameContainer>
  );
}
