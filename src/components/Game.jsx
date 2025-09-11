import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Contenedor del juego
const GameContainer = styled.div`
  width: 800px;
  max-width: 100%;
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
  bottom: ${({ bottom }) => bottom}px;
  left: ${({ left }) => left}px;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, red, darkred);
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
`;

const Obstacle = styled.div`
  position: absolute;
  bottom: 50px;
  left: ${({ left }) => left}px;
  width: 50px;
  height: 50px;
  background: linear-gradient(to bottom, #0072ff, #004aad);
  border-radius: 8px;
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

const CenterScreen = styled.div`
  text-align: center;
  color: white;
  padding-top: 100px;
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 18px;
  color: white;
`;

// Componente principal
export default function Game() {
  const [screen, setScreen] = useState("start"); // start | play | end
  const [playerLeft, setPlayerLeft] = useState(100);
  const [playerBottom, setPlayerBottom] = useState(50);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);

  const playerRef = useRef({ left: playerLeft, bottom: playerBottom });
  playerRef.current.left = playerLeft;
  playerRef.current.bottom = playerBottom;

  const animRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Controles PC y móvil
  useEffect(() => {
    if (screen !== "play") return;

    let jumping = false;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && playerRef.current.left > 0) {
        setPlayerLeft((pos) => Math.max(pos - 20, 0));
      } else if (e.key === "ArrowRight" && playerRef.current.left < 750) {
        setPlayerLeft((pos) => Math.min(pos + 20, 750));
      } else if ((e.key === "ArrowUp" || e.key === " ") && !jumping) {
        jumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
          if (jumpHeight < 150) {
            setPlayerBottom((b) => b + 15);
            jumpHeight += 15;
          } else {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
              if (jumpHeight > 0) {
                setPlayerBottom((b) => b - 15);
                jumpHeight -= 15;
              } else {
                clearInterval(fallInterval);
                jumping = false;
              }
            }, 20);
          }
        }, 20);
      }
    };

    const handleTouch = (e) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      // izquierda/derecha
      if (x < window.innerWidth / 2 && playerRef.current.left > 0) {
        setPlayerLeft((pos) => Math.max(pos - 20, 0));
      } else if (x >= window.innerWidth / 2 && playerRef.current.left < 750) {
        setPlayerLeft((pos) => Math.min(pos + 20, 750));
      }
      // arriba = salto
      if (y < window.innerHeight / 2 && !jumping) {
        jumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
          if (jumpHeight < 150) {
            setPlayerBottom((b) => b + 15);
            jumpHeight += 15;
          } else {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
              if (jumpHeight > 0) {
                setPlayerBottom((b) => b - 15);
                jumpHeight -= 15;
              } else {
                clearInterval(fallInterval);
                jumping = false;
              }
            }, 20);
          }
        }, 20);
      }
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [screen]);

  // Bucle de animación
  useEffect(() => {
    if (screen !== "play") return;

    const update = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 16;
      lastTimeRef.current = time;

      // Mover obstáculos
      setObstacles((obs) => {
        const moved = obs.map((o) => ({ ...o, left: o.left - 10 * delta }));
        const filtered = moved.filter((o) => o.left > -60);
        if (Math.random() < 0.03) filtered.push({ left: 800 });
        return filtered;
      });

      setScore((s) => s + Math.floor(delta));

      animRef.current = requestAnimationFrame(update);
    };

    animRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animRef.current);
  }, [screen]);

  // Colisiones
  useEffect(() => {
    if (screen !== "play") return;
    obstacles.forEach((o) => {
      // colisión solo si toca en el mismo nivel
      if (
        o.left < playerLeft + 50 &&
        o.left + 50 > playerLeft &&
        playerBottom < 100
      ) {
        setScreen("end");
      }
    });
  }, [obstacles, playerLeft, playerBottom, screen]);

  return (
    <GameContainer>
      {screen === "start" && (
        <CenterScreen>
          <h1>🚀 Runner Nuevo</h1>
          <p>Mueve ← → y salta con ↑ o toca arriba en móvil</p>
          <GameButton onClick={() => setScreen("play")}>Iniciar Juego</GameButton>
        </CenterScreen>
      )}

      {screen === "play" && (
        <>
          <ScoreDisplay>Puntuación: {score}</ScoreDisplay>
          <Player left={playerLeft} bottom={playerBottom} />
          {obstacles.map((o, i) => (
            <Obstacle key={i} left={o.left} />
          ))}
        </>
      )}

      {screen === "end" && (
        <CenterScreen>
          <h1>💀 Fin del Juego</h1>
          <p>Tu puntuación: {score}</p>
          <GameButton
            onClick={() => {
              setPlayerLeft(100);
              setPlayerBottom(50);
              setObstacles([]);
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
