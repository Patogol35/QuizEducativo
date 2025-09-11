import { useState, useEffect, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Box,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import WelcomeScreen from "./components/WelcomeScreen";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import { questions as allQuestions } from "./data";

export default function App() {
  const [welcome, setWelcome] = useState(true);
  const [difficulty, setDifficulty] = useState("medium");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selected, setSelected] = useState(null);

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
          primary: { main: "#3b82f6" },
          secondary: { main: "#06b6d4" },
          background: {
            default: darkMode ? "#0f172a" : "#f8fafc",
            paper: darkMode ? "#1e293b" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#f1f5f9" : "#0f172a",
            secondary: darkMode ? "#94a3b8" : "#475569",
          },
        },
        typography: {
          fontFamily: "Poppins, Roboto, sans-serif",
          h4: { fontWeight: 700 },
          body1: { lineHeight: 1.7 },
        },
        shape: { borderRadius: 16 },
      }),
    [darkMode]
  );

  const maxTime = difficulty === "easy" ? 15 : difficulty === "hard" ? 5 : 10;

  const handleStart = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setGameQuestions(shuffled.slice(0, 10));
    setWelcome(false);
    setTimeLeft(maxTime);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  const handleAnswerWithFeedback = (option) => {
    setSelected(option);
    if (option === gameQuestions[current].answer) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (current + 1 < gameQuestions.length) {
        setCurrent((prev) => prev + 1);
        setTimeLeft(maxTime);
        setSelected(null);
      } else setFinished(true);
    }, 700);
  };

  useEffect(() => {
    if (finished || welcome) return;
    if (timeLeft === 0) {
      handleAnswerWithFeedback("");
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished, welcome]);

  const restartGame = () => {
    setWelcome(true);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setTimeLeft(10);
    setGameQuestions([]);
    setSelected(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(135deg, #0f172a, #1e293b)"
            : "linear-gradient(135deg, #e0f2fe, #f8fafc)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          position: "relative",
        }}
      >
        {/* Botón Modo Oscuro */}
        <Box position="absolute" top={16} right={16}>
          <IconButton
            color="inherit"
            onClick={() => setDarkMode((prev) => !prev)}
            sx={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        {welcome ? (
          <WelcomeScreen
            onStart={handleStart}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
          />
        ) : !finished ? (
          <QuestionCard
            question={gameQuestions[current]}
            current={current}
            total={gameQuestions.length}
            score={score}
            onAnswer={handleAnswerWithFeedback}
            time={timeLeft}
            maxTime={maxTime}
            selected={selected}
          />
        ) : (
          <ResultScreen score={score} total={gameQuestions.length} onRestart={restartGame} />
        )}
      </Box>
    </ThemeProvider>
  );
}
