import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { motion } from "framer-motion";

export default function WelcomeScreen({ onStart, setDifficulty, difficulty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", maxWidth: 520 }}
    >
      <Card
        sx={{
          p: 4,
          textAlign: "center",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30, 41, 59, 0.6)"
              : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            🎮 Quiz Interactivo
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "text.secondary", mb: 3 }}
          >
            Desarrollado por <b>Jorge Patricio Santamaría Cherrez</b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Responde preguntas al azar y mide tu conocimiento.
          </Typography>

          {/* Selección de dificultad */}
          <Stack mt={4} spacing={2}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Selecciona la dificultad:
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={difficulty}
              onChange={(e, val) => val && setDifficulty(val)}
              color="primary"
              sx={{
                "& .MuiToggleButton-root": {
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: "0.3s",
                },
                "& .Mui-selected": {
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  color: "#fff",
                },
              }}
            >
              <ToggleButton value="easy">🌱 Fácil</ToggleButton>
              <ToggleButton value="medium">⚡ Medio</ToggleButton>
              <ToggleButton value="hard">🔥 Difícil</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Botón empezar */}
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={onStart}
            sx={{
              mt: 5,
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: "1.1rem",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              color: "#fff",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb, #0891b2)",
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              },
            }}
          >
            Comenzar
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
