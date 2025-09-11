import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// 🎮 Fullscreen GameContainer
const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #1e1e2f, #121212);
  border: none;
  position: relative;
  overflow: hidden;
  background-size: 200% 100%;
  animation: moveBg 8s linear infinite;

  @keyframes moveBg {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`;

const Player = styled(motion.div)`
  position: absolute;
  left: ${({ position }) => position}px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle, red, darkred);
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
`;

const Obstacle = styled.div`
  position: absolute;
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
  padding-top: 20vh;
`;

// 🎮 Componente principal
export default function Game() {
  const [screen, setScreen] = useState("start"); // start | play | end
  const [playerPos, setPlayerPos] = useState(100);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [speed, setSpeed] = useState(5);
  const [score, setScore] = useState(0);

  const lastTimeRef = useRef(null);
  const animRef = useRef(null);

  // 🚀 Controles teclado/táctil
  useEffect(() => {
    if (screen !== "play") return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && playerPos > 0) {
        setPlayerPos((pos) => pos - 40);
      } else if (e.key === "ArrowRight" && playerPos < window.innerWidth - 60) {
        setPlayerPos((pos) => pos + 40);
      } else if (e.key === " " && !isJumping) {
        jump();
      }
    };

    const handleTouch = (e) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      if (y < window.innerHeight / 2 && !isJumping) {
        jump(); // salto
      } else if (x < window.innerWidth / 2 && playerPos > 0) {
        setPlayerPos((pos) => pos - 40);
      } else if (x >= window.innerWidth / 2 && playerPos < window.innerWidth - 60) {
        setPlayerPos((pos) => pos + 40);
      }
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [screen, playerPos, isJumping]);

  // 🚀 Bucle de animación con requestAnimationFrame
  useEffect(() => {
    if (screen !== "play") return;

    const update = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 16; // normalizar a ~60fps
      lastTimeRef.current = time;

      setObstacles((obs) => {
        const moved = obs.map((o) => ({ ...o, left: o.left - speed * delta }));
        const filtered = moved.filter((o) => o.left > -60);
        if (Math.random() < 0.02) {
          // 2% probabilidad por frame
          filtered.push({
            left: window.innerWidth,
            bottom: Math.random() > 0.5 ? 50 : 120,
          });
        }
        return filtered;
      });

      setScore((s) => s + Math.floor(delta));
      setSpeed((sp) => sp + 0.0005 * delta);

      animRef.current = requestAnimationFrame(update);
    };

    animRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animRef.current);
  }, [screen, speed]);

  // 🚨 Colisiones
  useEffect(() => {
    if (screen !== "play") return;

    obstacles.forEach((o) => {
      const playerBottom = isJumping ? 150 : 50;
      if (
        o.left < playerPos + 50 &&
        o.left + 50 > playerPos &&
        o.bottom === playerBottom
      ) {
        setScreen("end");
      }
    });
  }, [obstacles, playerPos, screen, isJumping]);

  // 🚀 Salto fluido
  const jump = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 700);
  };

  return (
    <GameContainer>
      {screen === "start" && (
        <CenterScreen>
          <h1>🚀 Adaptive Runner</h1>
          <p>
            Mueve con ← →, salta con <b>Espacio</b> o toca arriba en la pantalla
          </p>
          <GameButton onClick={() => setScreen("play")}>Iniciar Juego</GameButton>
        </CenterScreen>
      )}

      {screen === "play" && (
        <>
          <ProgressBar>
            <ProgressFill speed={speed} />
          </ProgressBar>
          <Player
            position={playerPos}
            animate={{ bottom: isJumping ? 150 : 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
          {obstacles.map((o, i) => (
            <Obstacle key={i} style={{ left: o.left, bottom: o.bottom }} />
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
              setIsJumping(false);
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
