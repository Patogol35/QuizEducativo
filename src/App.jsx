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

  const handleStart = () => {
    setWelcome(false);
    switch (difficulty) {
      case "easy": setTimeLeft(15); break;
      case "medium": setTimeLeft(10); break;
      case "hard": setTimeLeft(5); break;
    }
  };

  const handleAnswer = (option) => {
    if (option === questions[current].answer) setScore(prev => prev + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
      handleStart();
    } else setFinished(true);
  };

  useEffect(() => {
    if (finished || welcome) return;
    if (timeLeft === 0) { nextQuestion(); return; }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished
