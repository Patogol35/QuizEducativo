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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimerIcon from "@mui/icons-material/Timer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BarChartIcon from "@mui/icons-material/BarChart";

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

          {/* Título + modo oscuro */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            mb={2}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#60a5fa" : "#2563eb",
              }}
            >
              Quiz Interactivo
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

          {/* Autor */}
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              fontWeight: 500,
              color: (theme) =>
                theme.palette.mode === "dark" ? "#cbd5f5" : "#334155",
            }}
          >
            Desarrollado por{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#60a5fa" : "#1d4ed8",
              }}
            >
              Jorge Patricio Santamaría Cherrez
            </Box>
          </Typography>

          {/* Instrucciones */}
          <Stack
            spacing={1.5}
            sx={{
              textAlign: "left",
              p: 3,
              mb: 3,
              borderRadius: 3,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(100,116,139,0.2), rgba(30,41,59,0.4))"
                  : "linear-gradient(135deg, rgba(96,165,250,0.1), rgba(237,242,247,0.6))",
              border: (theme) =>
                `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)"
                }`,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 500 }}
            >
              <InfoIcon fontSize="small" /> Instrucciones
            </Typography>

            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }} variant="body2">
              <CheckCircleIcon fontSize="small" color="success" />
              <Box component="span" sx={{ fontWeight: "bold" }}>
                Responde un total de 20 preguntas, a 0.5 puntos cada una
              </Box>
            </Typography>

            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }} variant="body2">
              <TimerIcon fontSize="small" color="warning" />
              Tienes un límite de tiempo para cada pregunta.
            </Typography>

            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }} variant="body2">
              <EmojiEventsIcon fontSize="small" color="primary" />
              Gana puntos por cada respuesta correcta.
            </Typography>

            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }} variant="body2">
              <BarChartIcon fontSize="small" color="secondary" />
              Elige la dificultad antes de comenzar.
            </Typography>
          </Stack>

          {/* Dificultad */}
          <Stack mt={1} spacing={2} alignItems="center">
            <Typography variant="body2" fontWeight="500">
              Selecciona la dificultad:
            </Typography>

            {/* CENTRADO HORIZONTAL */}
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <ToggleButtonGroup
                exclusive
                value={difficulty}
                onChange={(e, val) => val && setDifficulty(val)}
              >
                {["easy", "medium", "hard"].map((level) => {
                  const colors = {
                    easy: { main: "#16a34a", hover: "#15803d" },
                    medium: { main: "#2563eb", hover: "#1d4ed8" },
                    hard: { main: "#dc2626", hover: "#b91c1c" },
                  };

                  const label =
                    level === "easy"
                      ? "Fácil"
                      : level === "medium"
                      ? "Medio"
                      : "Difícil";

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
                        color: difficulty === level ? "#fff" : "inherit",
                        backgroundColor:
                          difficulty === level
                            ? colors[level].main
                            : "transparent",
                        "&.Mui-selected": {
                          backgroundColor: colors[level].main,
                          color: "#fff",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: colors[level].hover,
                        },
                      }}
                    >
                      {label}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            </Box>
          </Stack>

          {/* Botón */}
          <Box mt={4}>
            <Button
              variant="contained"
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
