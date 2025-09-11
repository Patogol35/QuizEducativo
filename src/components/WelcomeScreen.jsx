import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Box,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import InfoIcon from "@mui/icons-material/Info";
import { motion } from "framer-motion";

export default function WelcomeScreen({
  onStart,
  setDifficulty,
  difficulty,
  darkMode,
  toggleDarkMode,
}) {
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
          {/* Título + Toggle modo oscuro */}
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={2}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(90deg, #2563eb, #9333ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🎮 Quiz Interactivo
            </Typography>
            <IconButton
              onClick={toggleDarkMode}
              color="inherit"
              sx={{
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "#f1f5f9" : "#1e293b",
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Stack>

          {/* Desarrollado por */}
          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Desarrollado por <b>Jorge Patricio Santamaría Cherrez</b>
          </Typography>

          {/* Instrucciones */}
          <Stack
            spacing={1}
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
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: "500" }}
            >
              <InfoIcon fontSize="small" /> Instrucciones
            </Typography>
            <Typography variant="body2">✅ Responde <b>10 preguntas al azar</b>.</Typography>
            <Typography variant="body2">⏱️ Tienes un límite de tiempo para cada pregunta.</Typography>
            <Typography variant="body2">🏆 Gana puntos por cada respuesta correcta.</Typography>
            <Typography variant="body2">📊 Elige la dificultad antes de comenzar.</Typography>
          </Stack>

          {/* Selección de dificultad */}
          <Stack mt={1} spacing={2} alignItems="center">
            <Typography variant="body2" fontWeight="500">
              Selecciona la dificultad:
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={difficulty}
              onChange={(e, val) => val && setDifficulty(val)}
            >
              {["easy", "medium", "hard"].map((level) => {
                const colors = {
                  easy: { main: "success.main", light: "success.light" },
                  medium: { main: "primary.main", light: "primary.light" },
                  hard: { main: "error.main", light: "error.light" },
                };
                const label = level === "easy" ? "Fácil" : level === "medium" ? "Medio" : "Difícil";

                return (
                  <ToggleButton
                    key={level}
                    value={level}
                    sx={{
                      px: 3,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      fontWeight: 600,
                      "&.Mui-selected": {
                        backgroundColor: colors[level].main,
                        color: "#fff",
                      },
                      "&:hover": {
                        backgroundColor: colors[level].light,
                        color: "#fff",
                      },
                    }}
                  >
                    {label}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Stack>

          {/* Botón empezar */}
          <Box mt={4}>
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
              }}
            >
              Comenzar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
