import { Card, CardContent, Typography, Button, Stack, Box } from "@mui/material";
import { motion } from "framer-motion";
import ReplayIcon from "@mui/icons-material/Replay";

export default function ResultScreen({ score, total, onRestart }) {
  const percent = (score / total) * 100;
  let message = "Sigue intentándolo, cada vez serás mejor!";
  if (percent >= 80) message = "¡Excelente trabajo! 🌟";
  else if (percent >= 50) message = "¡Buen esfuerzo, sigue así! 💪";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", maxWidth: 600 }}
    >
      <Card
        sx={{
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30,41,59,0.6)"
              : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(90deg, #2563eb, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ¡Juego terminado!
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}
          >
            Puntaje: {score} / {total}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontWeight: 500,
              color: "text.secondary",
            }}
          >
            {message}
          </Typography>

          {/* Botón volver a jugar */}
          <Stack direction="row" justifyContent="center">
            <Box whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<ReplayIcon />}
                onClick={onRestart}
                sx={{
                  px: 6,
                  py: 1.8,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  color: "#fff",
                  boxShadow: "0 6px 20px rgba(37,99,235,0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2563eb, #0891b2)",
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 25px rgba(37,99,235,0.5)",
                  },
                }}
              >
                Volver a jugar
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
