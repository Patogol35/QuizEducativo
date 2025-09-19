import { useState, useEffect } from "react";

// Mezclar array (Fisher-Yates)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function useQuiz(allQuestions, difficulty) {
  const difficultyTimes = {
    easy: 15,
    medium: 10,
    hard: 5,
  };

  const getTime = () => difficultyTimes[difficulty] || 10;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useState(getTime());
  const [maxTime, setMaxTime] = useState(getTime());

  const [answered, setAnswered] = useState(false);

  // Actualiza tiempo al cambiar dificultad
  useEffect(() => {
    setTimeLeft(getTime());
    setMaxTime(getTime());
  }, [difficulty]);

  // Temporizador con setInterval (optimizado)
  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleAnswer(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finished]);

  const startQuiz = () => {
    const shuffled = shuffle(allQuestions)
      .slice(0, 20)
      .map((q) => ({
        ...q,
        options: shuffle(q.options),
      }));

    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setTimeLeft(getTime());
    setMaxTime(getTime());
    setAnswered(false);
  };

  const handleAnswer = (answer) => {
    if (answered) return;
    setAnswered(true);

    const correct = questions[current]?.answer;
    if (answer === correct) setScore((s) => s + 1);

    setSelected(answer);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setTimeLeft(getTime());
        setMaxTime(getTime());
        setAnswered(false);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setTimeLeft(getTime());
    setMaxTime(getTime());
    setAnswered(false);
  };

  return {
    questions,
    current,
    score,
    selected,
    finished,
    timeLeft,
    maxTime,
    startQuiz,
    answerQuestion: handleAnswer,
    restartQuiz,
  };
}
