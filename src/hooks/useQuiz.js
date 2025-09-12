import { useState, useEffect } from "react";

// Fisher-Yates shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function useQuiz(allQuestions, difficulty) {
  const difficultyTimes = { easy: 15, medium: 10, hard: 5 };

  const getTime = () => difficultyTimes[difficulty] || 10;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useState(getTime());
  const [maxTime, setMaxTime] = useState(getTime());

  // Actualiza tiempo si cambia la dificultad
  useEffect(() => {
    setTimeLeft(getTime());
    setMaxTime(getTime());
  }, [difficulty]);

  // Temporizador
  useEffect(() => {
    if (finished) return;
    if (timeLeft === 0) {
      handleTimeout();
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finished]);

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
  };

  // 👉 manejar cuando el tiempo llega a 0
  const handleTimeout = () => {
    if (selected !== null) return; // ya contestó
    setSelected(null); // marca que no hubo respuesta

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setTimeLeft(getTime());
        setMaxTime(getTime());
      } else {
        setFinished(true);
      }
    }, 1000); // espera 1 seg antes de avanzar
  };

  // 👉 manejar cuando el usuario selecciona
  const handleAnswer = (answer) => {
    if (selected !== null) return;

    const correct = questions[current]?.answer;
    if (answer === correct) setScore((s) => s + 0.5);

    setSelected(answer);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setTimeLeft(getTime());
        setMaxTime(getTime());
      } else {
        setFinished(true);
      }
    }, 1500); // espera 1.5 seg mostrando verde/rojo
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setTimeLeft(getTime());
    setMaxTime(getTime());
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
