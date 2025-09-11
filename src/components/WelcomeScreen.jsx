import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
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
          boxShadow: "0 8px 25px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          {/* Título + Toggle modo oscuro */}
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={3}>
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
                borderColor: (theme) => (theme.palette.mode === "dark" ? "#f1f5f9" : "#1e293b"),
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
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
                  "&.Mui-selected": { backgroundColor: "primary.main", color: "#fff" },
                  "&:hover": { backgroundColor: "primary.light", color: "#fff" },
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
                  "&.Mui-selected": { backgroundColor: "secondary.main", color: "#fff" },
                  "&:hover": { backgroundColor: "secondary.light", color: "#fff" },
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
                  "&.Mui-selected": { backgroundColor: "error.main", color: "#fff" },
                  "&:hover": { backgroundColor: "error.light", color: "#fff" },
                }}
              >
                Difícil
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Botón empezar */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={onStart}
            sx={{ mt: 4, px: 6, py: 1.8, fontSize: "1.1rem", borderRadius: 3, textTransform: "none" }}
          >
            Comenzar
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
