import { useState, useEffect } from "react";
import { questions } from "./data";

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // ⏱️ 10 segundos por pregunta

  // Manejar respuestas
  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  // Pasar a la siguiente pregunta
  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setTimeLeft(10); // reiniciar tiempo
    } else {
      setFinished(true);
    }
  };

  // Efecto del cronómetro
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

  // Reiniciar juego
  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setTimeLeft(10);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!finished ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center">
          <h2 className="text-xl font-bold mb-4">
            {questions[current].question}
          </h2>

          {/* Opciones */}
          <div className="grid gap-3">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="mt-4 flex justify-between text-gray-600">
            <p>
              Pregunta {current + 1} de {questions.length}
            </p>
            <p>⏱️ {timeLeft}s</p>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center">
          <h2 className="text-2xl font-bold">Juego terminado 🎉</h2>
          <p className="mt-2">
            Tu puntaje: <span className="font-bold">{score}</span> /{" "}
            {questions.length}
          </p>
          <button
            onClick={restartGame}
            className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
                                            }
