import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import ReplayIcon from "@mui/icons-material/Replay";

export default function ResultScreen({ score, total, onRestart }) {
  const percent = (score / total) * 100;
  let message = "Sigue intentándolo, cada vez serás mejor!";
  if (percent >= 80) message = "¡Excelente trabajo! 🌟";
  else if (percent >= 50) message = "¡Buen esfuerzo, sigue así! 💪";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", maxWidth: 520 }}
    >
      <Card
        sx={{
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30, 41, 59, 0.6)"
              : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🎉 ¡Juego terminado!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Puntaje: {score} / {total}
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
                borderRadius: 3,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(135deg, #2563eb, #0891b2)",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
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
