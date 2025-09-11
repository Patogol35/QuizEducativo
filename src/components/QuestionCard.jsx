import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

export default function QuestionCard({
  question,
  current,
  total,
  score,
  onAnswer,
  time,
  maxTime,
  selected,
}) {
  return (
    <motion.div
      key={current}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%", maxWidth: 650 }}
    >
      <Card
        sx={{
          p: 4,
          borderRadius: 4,
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
          {/* Contador + Tiempo */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight={600}>
              Pregunta {current + 1} / {total}
            </Typography>
            <Box position="relative" display="inline-flex">
              <CircularProgress
                variant="determinate"
                value={(time / maxTime) * 100}
                size={70}
                thickness={5}
                color={time <= 3 ? "error" : "primary"}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontWeight="bold">{time}s</Typography>
              </Box>
            </Box>
          </Stack>

          {/* Pregunta */}
          <Typography variant="h5" gutterBottom fontWeight={600}>
            {question.question}
          </Typography>

          {/* Opciones */}
          <Stack spacing={2} mt={3}>
            {question.options.map((opt, i) => {
              const isSelected = selected === opt;
              const isCorrect = opt === question.answer;

              let bgColor = "transparent";
              let textColor = "inherit";

              if (isSelected) {
                bgColor = isCorrect ? "success.main" : "error.main";
                textColor = "#fff";
              }

              return (
                <motion.div key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => !selected && onAnswer(opt)}
                    sx={{
                      textTransform: "none",
                      borderRadius: 3,
                      fontWeight: 600,
                      py: 1.5,
                      fontSize: "1rem",
                      border: "1px solid",
                      borderColor: "divider",
                      backgroundColor: bgColor,
                      color: textColor,
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: isSelected
                          ? bgColor
                          : "rgba(59,130,246,0.1)",
                      },
                    }}
                  >
                    {opt}
                  </Button>
                </motion.div>
              );
            })}
          </Stack>

          {/* Puntaje */}
          <Typography
            variant="body2"
            align="right"
            sx={{ mt: 3, fontWeight: 600, color: "text.secondary" }}
          >
            Puntos: {score}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
