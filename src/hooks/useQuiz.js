import { useState, useEffect, useCallback } from "react";
import { questions } from "../data";
import { shuffle } from "../utils";

const difficultyTimes = {
  easy: 20,
  medium: 15,
  hard: 10,
};

export const useQuiz = (difficulty, onFinish) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(difficultyTimes[difficulty]);
  const [answered, setAnswered] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Inicializa preguntas barajadas al montar
  useEffect(() => {
    const prepared = shuffle(questions)
      .slice(0, 20)
      .map(q => ({ ...q, options: shuffle(q.options) }));
    setQuizQuestions(prepared);
  }, [difficulty]);

  // Temporizador con setInterval
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAnswer(null); // auto-pasar si se acaba el tiempo
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleAnswer = useCallback(
    (option) => {
      if (answered) return;
      setAnswered(true);

      const current = quizQuestions[currentQuestion];
      if (option === current?.answer) {
        setScore(prev => prev + 1);
      }

      setTimeout(() => {
        if (currentQuestion + 1 < quizQuestions.length) {
          setCurrentQuestion(prev => prev + 1);
          setTimeLeft(difficultyTimes[difficulty]);
          setAnswered(false);
        } else {
          onFinish(score + (option === current?.answer ? 1 : 0));
        }
      }, 1000);
    },
    [answered, currentQuestion, difficulty, onFinish, quizQuestions, score]
  );

  const resetQuiz = useCallback(() => {
    const prepared = shuffle(questions)
      .slice(0, 20)
      .map(q => ({ ...q, options: shuffle(q.options) }));
    setQuizQuestions(prepared);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(difficultyTimes[difficulty]);
    setAnswered(false);
  }, [difficulty]);

  return {
    quizQuestions,
    currentQuestion,
    score,
    timeLeft,
    answered,
    handleAnswer,
    resetQuiz,
  };
};
