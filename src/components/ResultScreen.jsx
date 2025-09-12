import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import ReplayIcon from "@mui/icons-material/Replay";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

export default function ResultScreen({ score, total, onRestart }) {
  const maxScore = total * 0.5;
  const percent = (score / maxScore) * 100;

  // Mensajes
  let message = "Sigue intentándolo, cada vez serás mejor!";
  if (percent >= 80) message = "¡Excelente trabajo! 🌟";
  else if (percent >= 50) message = "¡Buen esfuerzo, sigue así! 💪";

  const [showConfetti, setShowConfetti] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (percent >= 80) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    } else if (percent >= 50) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 5000);
      return () => clearTimeout(timer);
    } else if (percent < 50) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [percent]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", maxWidth: 500, margin: "0 auto", position: "relative" }}
    >
      {/* Confeti para altos puntajes */}
      {showConfetti && percent >= 80 && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#4ade80','#facc15','#2563eb','#9333ea']}
        />
      )}

      {/* Partículas para medios y bajos */}
      {showParticles && percent >= 50 && percent < 80 && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight / 2}
          numberOfPieces={50}
          gravity={0.1}
          colors={['#60a5fa','#fbbf24','#34d399']}
        />
      )}

      {showParticles && percent < 50 && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight / 2}
          numberOfPieces={40}
          gravity={0.05}
          colors={['#f87171','#fb923c','#fbbf24']}
        />
      )}

      <Card
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          backdropFilter: "blur(12px)",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30,41,59,0.7)"
              : "rgba(255,255,255,0.85)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ¡Quiz Terminado!
          </Typography>

          <Typography variant="h6" gutterBottom>
            Puntaje: {score} / {maxScore}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: percent < 50 ? 'orange' : percent >= 50 && percent < 80 ? 'blue' : 'inherit',
              fontWeight: percent < 50 ? 'bold' : 'normal',
              animation: percent < 50 ? 'pulse 1s infinite' : percent >= 50 && percent < 80 ? 'glow 1.5s infinite' : 'none',
            }}
          >
            {message}
          </Typography>

          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              startIcon={<ReplayIcon />}
              onClick={onRestart}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #2563eb, #9333ea)",
                "&:hover": {
                  background: "linear-gradient(90deg, #1e40af, #7e22ce)",
                },
              }}
            >
              Volver a jugar
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes glow {
          0% { text-shadow: 0 0 5px #60a5fa; }
          50% { text-shadow: 0 0 15px #34d399; }
          100% { text-shadow: 0 0 5px #60a5fa; }
        }
      `}</style>
    </motion.div>
  );
                }
