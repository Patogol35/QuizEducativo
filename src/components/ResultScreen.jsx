import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import ReplayIcon from "@mui/icons-material/Replay";

export default function ResultScreen({ score, total, onRestart, bestScore }) {
  const percent = (score / total) * 100;
  let message = "Sigue intentándolo, cada vez serás mejor!";
  if (percent >= 80) message = "¡Excelente trabajo! 🌟";
  else if (percent >= 50) message = "¡Buen esfuerzo, sigue así! 💪";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", maxWidth: 500 }}
    >
      <Card
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ¡Juego terminado!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Puntaje: {score} / {total}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {message}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            🎯 Récord personal: {bestScore}
          </Typography>

          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              startIcon={<ReplayIcon />}
              onClick={onRestart}
              sx={{ px: 5, py: 1.5, borderRadius: 2, textTransform: "none" }}
            >
              Volver a jugar
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
