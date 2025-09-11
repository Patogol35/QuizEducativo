import styled, { keyframes } from "styled-components";

const Card = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  width: 460px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.9rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  font-size: 1rem;
  background: #2563eb;
  color: #fff;
  transition: 0.3s;
  &:hover { background: #1d4ed8; transform: scale(1.02); }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
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

export default function QuestionCard({ question, current, total, score, time, onAnswer }) {
  return (
    <Card>
      <Info>
        <span>Puntaje: {score}</span>
        <span>Pregunta {current + 1} / {total}</span>
      </Info>

      <Title>{question.question}</Title>

      {question.options.map((opt, idx) => (
        <Button key={idx} onClick={() => onAnswer(opt)}>
          {opt}
        </Button>
      ))}

      <ProgressBarWrapper>
        <ProgressBar key={current} duration={time} />
      </ProgressBarWrapper>
    </Card>
  );
          }
