import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import { motion } from "framer-motion";

export default function WelcomeScreen({ onStart, setDifficulty, difficulty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", maxWidth: 550 }}
    >
      <Card
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 4,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, #1e293b, #0f172a)"
              : "linear-gradient(145deg, #ffffff, #f8fafc)",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          {/* Título */}
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: "linear-gradient(90deg, #2563eb, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🎮 Quiz Interactivo
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 3, color: "text.secondary" }}>
            Desarrollado por <b>Jorge Patricio Santamaría Cherrez</b>
          </Typography>

          {/* Instrucciones */}
          <Stack
            spacing={2}
            sx={{
              textAlign: "left",
              p: 2,
              mb: 3,
              borderRadius: 3,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#f8fafc",
            }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <InfoIcon color="primary" /> Instrucciones
            </Typography>
            <Typography variant="body2">
              ✅ Responde <b>10 preguntas al azar</b>.
            </Typography>
            <Typography variant="body2">
              ⏱️ Tienes un límite de tiempo para cada pregunta.
            </Typography>
            <Typography variant="body2">
              🏆 Gana puntos por cada respuesta correcta.
            </Typography>
            <Typography variant="body2">
              📊 Elige la dificultad antes de comenzar.
            </Typography>
          </Stack>

          {/* Selección de dificultad */}
          <Stack mt={3} spacing={2} alignItems="center">
            <Typography variant="body2" fontWeight="500">
              Selecciona la dificultad:
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={difficulty}
              onChange={(e, val) => val && setDifficulty(val)}
            >
              <ToggleButton
                value="easy"
                sx={{
                  px: 3,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "#fff",
                  },
                }}
              >
                Fácil
              </ToggleButton>
              <ToggleButton
                value="medium"
                sx={{
                  px: 3,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  "&.Mui-selected": {
                    backgroundColor: "secondary.main",
                    color: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: "secondary.light",
                    color: "#fff",
                  },
                }}
              >
                Medio
              </ToggleButton>
              <ToggleButton
                value="hard"
                sx={{
                  px: 3,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  "&.Mui-selected": {
                    backgroundColor: "error.main",
                    color: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: "error.light",
                    color: "#fff",
                  },
                }}
              >
                Difícil
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Botón empezar */}
          <Box mt={4}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={onStart}
                sx={{
                  px: 6,
                  py: 1.8,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0 6px 20px rgba(37,99,235,0.4)",
                }}
              >
                Comenzar
              </Button>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
