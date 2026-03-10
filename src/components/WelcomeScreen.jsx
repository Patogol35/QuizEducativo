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
              ? "linear-gradient(145deg,#1e293b,#0f172a)"
              : "linear-gradient(145deg,#ffffff,#f8fafc)",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.15),0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>

          {/* TITULO + DARK MODE */}
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
                color: "#2563eb",
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
                  theme.palette.mode === "dark"
                    ? "#f1f5f9"
                    : "#1e293b",
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Stack>

          {/* DESARROLLADOR */}
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              fontWeight: 500,
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "#cbd5f5"
                  : "#334155",
            }}
          >
            Desarrollado por{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "#60a5fa"
                    : "#1d4ed8",
              }}
            >
              Jorge Patricio Santamaría Cherrez
            </Box>
          </Typography>

          {/* INSTRUCCIONES */}
          <Stack
            spacing={1}
            sx={{
              textAlign: "left",
              p: 3,
              mb: 3,
              borderRadius: 3,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(100,116,139,0.15)"
                  : "rgba(96,165,250,0.08)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 600,
              }}
            >
              <InfoIcon fontSize="small" />
              Instrucciones
            </Typography>

            <Typography
  variant="body2"
  sx={{ display: "flex", alignItems: "center", gap: 1 }}
>
  <CheckCircleIcon fontSize="small" color="success" />
  <span>
    Responde <b>un total de 20 preguntas, a 0.5 puntos cada una.</b>
  </span>
</Typography>

            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <TimerIcon fontSize="small" color="warning" />
              Tienes un límite de tiempo para cada pregunta.
            </Typography>

            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <EmojiEventsIcon fontSize="small" color="primary" />
              Gana puntos por cada respuesta correcta.
            </Typography>

            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <BarChartIcon fontSize="small" color="action" />
              Elige la dificultad antes de comenzar.
            </Typography>
          </Stack>

          {/* SELECCION DE DIFICULTAD */}
          <Stack spacing={2} alignItems="center">

            <Typography variant="body2" fontWeight={600}>
              Selecciona la dificultad:
            </Typography>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <ToggleButtonGroup
                exclusive
                value={difficulty}
                onChange={(e, val) => val && setDifficulty(val)}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  display: "flex",
                }}
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
                        flex: 1,
                        fontWeight: 600,
                        borderRadius: 2,
                        textAlign: "center",
                        color:
                          difficulty === level
                            ? "#fff"
                            : "inherit",
                        backgroundColor:
                          difficulty === level
                            ? colors[level].main
                            : "transparent",

                        "&.Mui-selected": {
                          backgroundColor:
                            colors[level].main,
                          color: "#fff",
                        },

                        "&.Mui-selected:hover": {
                          backgroundColor:
                            colors[level].hover,
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

          {/* BOTON COMENZAR */}
          <Box mt={4}>
            <Button
              variant="contained"
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
