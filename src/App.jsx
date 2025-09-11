import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { questions } from "./data";

// 🎨 Estilos mejorados con styled-components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #60a5fa, #2563eb);
  font-family: "Poppins", sans-serif;
`;

const Card = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  width: 460px;
  text-align: center;
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
`;

const Button = styled.button`
  padding: 0.9rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  background: #2563eb;
  color: #fff;
  width: 100%;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 15px rgba(37, 99, 235, 0.4);
  }
`;

const Info = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #374151;
  font-weight: 500;
`;

const ProgressBarWrapper = styled.div`
  margin-top: 1.5rem;
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
`;

const fillAnimation = (duration) => keyframes`
  from { width: 100%; background: #2563eb; }
  to { width: 0%; background: #dc2626; }
`;

const ProgressBar = styled.div`
  height: 100%;
  animation: ${(props) => fillAnimation(props.duration)} linear forwards;
  animation-duration: ${(props) => props.duration}s;
`;

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setTimeLeft(10);
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished) return;
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished]);

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setTimeLeft(10);
  };

  return (
    <Container>
      {!finished ? (
        <Card>
          {/* Mostrar puntaje en la parte superior */}
          <Info>
            <span>Puntaje: {score}</span>
            <span>
              Pregunta {current + 1} / {questions.length}
            </span>
          </Info>

          <Title>{questions[current].question}</Title>

          {questions[current].options.map((opt, idx) => (
            <Button key={idx} onClick={() => handleAnswer(opt)}>
              {opt}
            </Button>
          ))}

          {/* Barra de progreso */}
          <ProgressBarWrapper>
            <ProgressBar key={current} duration={10} />
          </ProgressBarWrapper>
        </Card>
      ) : (
        <Card>
          <Title>🎉 ¡Juego terminado!</Title>
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            Tu puntaje final fue:
          </p>
          <h3 style={{ fontSize: "1.6rem", color: "#2563eb", marginBottom: "1rem" }}>
            {score} / {questions.length}
          </h3>

          {/* Mensajito motivador */}
          <p style={{ marginBottom: "1.5rem", color: "#374151" }}>
            {score === questions.length
              ? "🔥 Perfecto, lo lograste sin fallar!"
              : score > questions.length / 2
              ? "👏 Muy bien, casi perfecto!"
              : "💡 Sigue practicando, lo harás mejor la próxima!"}
          </p>

          <Button onClick={restartGame}>🔄 Jugar de nuevo</Button>
        </Card>
      )}
    </Container>
  );
}
