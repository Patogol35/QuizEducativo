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

  // Inicia el juego según dificultad
  const handleStart = () => {
    setWelcome(false);
    switch (difficulty) {
      case "easy": setTimeLeft(15); break;
      case "medium": setTimeLeft(10); break;
      case "hard": setTimeLeft(5); break;
      default: setTimeLeft(10);
    }
  };

  const handleAnswer = (option) => {
    if (option === questions[current].answer) setScore(prev => prev + 1);

    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
      // reinicia tiempo según dificultad
      switch (difficulty) {
        case "easy": setTimeLeft(15); break;
        case "medium": setTimeLeft(10); break;
        case "hard": setTimeLeft(5); break;
      }
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished || welcome) return;

    if (timeLeft === 0) { handleAnswer(""); return; }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished, welcome, difficulty]);

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setWelcome(true);
    setTimeLeft(10);
  };

  return (
    <>
      {welcome ? (
        <WelcomeScreen onStart={handleStart} setDifficulty={setDifficulty} />
      ) : !finished ? (
        <QuestionCard
          question={questions[current]}
          current={current}
          total={questions.length}
          score={score}
          onAnswer={handleAnswer}
          time={timeLeft}
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
