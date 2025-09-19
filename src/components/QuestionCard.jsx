import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function Quiz({ questions, maxTime = 15 }) {
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState(maxTime);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const total = questions.length;
  const circleSize = 70;

  // Temporizador
  useEffect(() => {
    if (selected !== null) return; // si ya respondió, se detiene
    if (time === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, selected]);

  const handleAnswer = (option) => {
    if (selected !== null) return; // 🔒 no permite cambiar respuesta
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    setTimeout(() => handleNext(), 1000); // pasa a la siguiente
  };

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent(current + 1);
      setTime(maxTime);
      setSelected(null);
    } else {
      alert(`Juego terminado 🎉 Tu puntaje es ${score}/${total}`);
    }
  };

  return (
    <Box textAlign="center" p={3}>
      {/* Encabezado: contador y temporizador */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        spacing={{ xs: 2, sm: 4 }}
      >
        {/* Contador */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, pl: { xs: 0, sm: 1 } }}
        >
          {current + 1} / {total}
        </Typography>

        {/* Temporizador */}
        <motion.div
          animate={time <= 3 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ flexShrink: 0 }}
        >
          <Box
            position="relative"
            sx={{
              width: circleSize,
              height: circleSize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={(time / maxTime) * 100}
              size={circleSize}
              thickness={5}
              sx={{
                color:
                  time > maxTime * 0.5
                    ? "success.main"
                    : time > 3
                    ? "warning.main"
                    : "error.main",
                transition: "color 0.3s ease",
              }}
            />
            <Typography
              fontWeight="bold"
              sx={{
                color: "text.primary",
                fontSize: `${circleSize * 0.3}px`,
                lineHeight: 1,
                position: "absolute",
              }}
            >
              {time}s
            </Typography>
          </Box>
        </motion.div>
      </Stack>

      {/* Pregunta */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {questions[current].question}
      </Typography>

      {/* Opciones */}
      <Stack spacing={2}>
        {questions[current].options.map((option, index) => (
          <Button
            key={index}
            variant="contained"
            fullWidth
            onClick={() => handleAnswer(option)}
            disabled={selected !== null} // 🔒 no permite cambiar respuesta
            sx={{
              py: 1.5,
              bgcolor:
                selected === null
                  ? "primary.main"
                  : option === questions[current].answer
                  ? "success.main"
                  : selected === option
                  ? "error.main"
                  : "primary.main",
              "&:hover": {
                bgcolor:
                  selected === null
                    ? "primary.dark"
                    : option === questions[current].answer
                    ? "success.dark"
                    : selected === option
                    ? "error.dark"
                    : "primary.dark",
              },
              transition: "all 0.3s ease",
            }}
          >
            {option}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
