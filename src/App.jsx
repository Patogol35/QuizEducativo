import { useState, useEffect } from "react";
import styled from "styled-components";
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
  width: 380px;
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
  margin-bottom: 1.5rem;
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

const Timer = styled.span`
  font-weight: bold;
  color: ${(props) => (props.timeLeft <= 3 ? "#dc2626" : "#2563eb")};
`;

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
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
          <Title>{questions[current].question}</Title>
          {questions[current].options.map((opt, idx) => (
            <Button key={idx} onClick={() => handleAnswer(opt)}>
              {opt}
            </Button>
          ))}
          <Info>
            <span>
              Pregunta {current + 1} de {questions.length}
            </span>
            <Timer timeLeft={timeLeft}>⏱ {timeLeft}s</Timer>
          </Info>
        </Card>
      ) : (
        <Card>
          <Title>Juego terminado 🎉</Title>
          <p>
            Tu puntaje: <b>{score}</b> / {questions.length}
          </p>
          <Button onClick={restartGame}>Jugar de nuevo</Button>
        </Card>
      )}
    </Container>
  );
  }
