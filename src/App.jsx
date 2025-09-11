import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";

import WelcomeScreen from "./components/WelcomeScreen";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import { questions as allQuestions } from "./data";
import useQuiz from "./hooks/useQuiz";

export default function App() {
  const [welcome, setWelcome] = useState(true);
  const [difficulty, setDifficulty] = useState("medium");
  const [darkMode, setDarkMode] = useState(false);

  // Hook centralizado
  const {
    questions,
    current,
    score,
    selected,
    finished,
    timeLeft,
    maxTime,
    startQuiz,
    answerQuestion,
    restartQuiz,
  } = useQuiz(allQuestions, difficulty);

  // Cargar preferencias desde localStorage
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    const savedDiff = localStorage.getItem("difficulty");
    if (savedDark) setDarkMode(JSON.parse(savedDark));
    if (savedDiff) setDifficulty(savedDiff);
  }, []);

  useEffect(() => localStorage.setItem("darkMode", darkMode), [darkMode]);
  useEffect(() => localStorage.setItem("difficulty", difficulty), [difficulty]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#2563eb" },
          secondary: { main: "#64748b" },
          success: { main: "#16a34a" },
          error: { main: "#dc2626" },
          background: {
            default: darkMode ? "#0f172a" : "#f1f5f9",
            paper: darkMode ? "#1e293b" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#f1f5f9" : "#1e293b",
            secondary: darkMode ? "#94a3b8" : "#64748b",
          },
        },
        typography: { fontFamily: "Roboto, sans-serif" },
        shape: { borderRadius: 12 },
      }),
    [darkMode]
  );

  const handleStart = () => {
    startQuiz();
    setWelcome(false);
  };

  const handleRestart = () => {
    restartQuiz();
    setWelcome(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(135deg, #0f172a, #1e293b)"
            : "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          flexDirection: "column",
          gap: 3,
        }}
      >
        {welcome ? (
          <WelcomeScreen
            onStart={handleStart}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode((prev) => !prev)}
          />
        ) : !finished ? (
          <QuestionCard
            question={questions[current]}
            current={current}
            total={questions.length}
            score={score}
            onAnswer={answerQuestion}
            time={timeLeft}
            maxTime={maxTime}
            selected={selected}
          />
        ) : (
          <ResultScreen
            score={score}
            total={questions.length}
            onRestart={handleRestart}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
