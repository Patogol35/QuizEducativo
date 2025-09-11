import { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import { questions } from "./data";

export default function App() {
  const [welcome, setWelcome] = useState(true);
  const [difficulty, setDifficulty] = useState("medium");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  // Inicia el juego con la dificultad seleccionada
  const handleStart = () => {
    setWelcome(false);
    switch (difficulty) {
      case "easy":
        setTimeLeft(15);
        break;
      case "medium":
        setTimeLeft(10);
        break;
      case "hard":
        setTimeLeft(5);
        break;
      default:
        setTimeLeft(10);
    }
  };

  const handleAnswer = (option) => {
    if (option === questions[current].answer) setScore((prev) => prev + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      // Reinicia el tiempo según la dificultad
      switch (difficulty) {
        case "easy":
          setTimeLeft(15);
          break;
        case "medium":
          setTimeLeft(10);
          break;
        case "hard":
          setTimeLeft(5);
          break;
      }
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished || welcome) return;

    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished, welcome, difficulty]);

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setWelcome(true);
  };

  return (
    <>
      {welcome ? (
        <WelcomeScreen
          onStart={handleStart}
          setDifficulty={setDifficulty}
        />
      ) : !finished ? (
        <QuestionCard
          question={questions[current]}
          current={current}
          total={questions.length}
          score={score}
          time={timeLeft}
          onAnswer={handleAnswer}
        />
      ) : (
        <ResultScreen
          score={score}
          total={questions.length}
          onRestart={restartGame}
        />
      )}
    </>
  );
}
