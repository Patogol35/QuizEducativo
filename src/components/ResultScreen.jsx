import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import ReplayIcon from "@mui/icons-material/Replay";

export default function ResultScreen({ score, total, onRestart }) {
  // Calcular porcentaje según puntaje real (0.5 por pregunta)
  const maxScore = total * 0.5;
  const percent = (score / maxScore) * 100;

  // Mensajes de motivación
  let message = "Sigue intentándolo, cada vez serás mejor!";
  if (percent >= 80) message = "¡Excelente trabajo! 🌟";
  else if (percent >= 50) message = "¡Buen esfuerzo, sigue así! 💪";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}
    >
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

          <Typography variant="body1" sx={{ mb: 3 }}>
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
    </motion.div>
  );
}
