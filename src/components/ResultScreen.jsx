
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  width: 460px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  background: #2563eb;
  color: #fff;
  width: 100%;
  margin-top: 1rem;
  transition: 0.3s;
  &:hover { background: #1d4ed8; transform: scale(1.02); }
`;

export default function ResultScreen({ score, total, onRestart }) {
  const message =
    score === total
      ? "🔥 Perfecto, lo lograste sin fallar!"
      : score > total / 2
      ? "👏 Muy bien, casi perfecto!"
      : "💡 Sigue practicando, lo harás mejor la próxima!";

  return (
    <Card>
      <Title>🎉 ¡Juego terminado!</Title>
      <p>Tu puntaje final:</p>
      <h3 style={{ color: "#2563eb", fontSize: "1.6rem" }}>{score} / {total}</h3>
      <p style={{ marginTop: "1rem" }}>{message}</p>
      <Button onClick={onRestart}>🔄 Jugar de nuevo</Button>
    </Card>
  );
}
