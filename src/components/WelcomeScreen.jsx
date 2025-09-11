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
  font-weight: bold;
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
  &:hover { background: #1d4ed8; transform: translateY(-2px) scale(1.02); }
`;

export default function WelcomeScreen({ onStart, setDifficulty }) {
  return (
    <Card>
      <Title>👋 ¡Bienvenido a la Trivia!</Title>
      <p>Selecciona la dificultad y pon a prueba tus conocimientos:</p>

      <select
        style={{ width: "100%", padding: "0.8rem", marginTop: "1rem", borderRadius: "8px", fontSize: "1rem" }}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Fácil (15s)</option>
        <option value="medium">Medio (10s)</option>
        <option value="hard">Difícil (5s)</option>
      </select>

      <Button onClick={onStart}>🚀 Comenzar</Button>
    </Card>
  );
}
