import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { questions } from "./data";

// 🎨 Estilos con styled-components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 420px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;

const Button = styled.button`
  padding: 0.8rem;
  margin: 0.4rem 0;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  background: #2563eb;
  color: #fff;
  width: 100%;

  &:hover {
    background: #1d4ed8;
    transform: scale(1.02);
  }
`;

const Info = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #555;
`;

const ProgressBarWrapper = styled.div`
  margin-top: 1rem;
  height: 10px;
  background: #e5e7eb;
  border-radius: 5px;
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
          <Info style={{ marginBottom: "1rem" }}>
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
          <Title>Juego terminado 🎉</Title>
          <p>
            Tu puntaje final: <b>{score}</b> / {questions.length}
          </p>
          <Button onClick={restartGame}>Jugar de nuevo</Button>
        </Card>
      )}
    </Container>
  );
          }
