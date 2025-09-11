import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

export default function WelcomeScreen({ onContinue, setDifficulty, difficulty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", maxWidth: 500 }}
    >
      <Card
        sx={{
          p: 4,
          textAlign: "center",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            🎮 Quiz Interactivo - Desarrollado por Jorge Patricio Santamaría
            Cherrez
          </Typography>
          <Typography variant="body1" gutterBottom>
            Responde preguntas al azar y mide tu conocimiento.
          </Typography>

          <Stack mt={3} spacing={2}>
            <Typography variant="body2">Selecciona la dificultad:</Typography>
            <ToggleButtonGroup
              exclusive
              value={difficulty}
              onChange={(e, val) => val && setDifficulty(val)}
              color="secondary"
            >
              <ToggleButton value="easy">🌱 Fácil</ToggleButton>
              <ToggleButton value="medium">⚡ Medio</ToggleButton>
              <ToggleButton value="hard">🔥 Difícil</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowForwardIcon />}
            onClick={onContinue}
            sx={{ mt: 4, px: 5, py: 1.5, borderRadius: 3 }}
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
