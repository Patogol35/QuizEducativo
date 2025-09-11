import { Card, CardContent, Typography, Button, Stack, CircularProgress, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function QuestionCard({ question, current, total, score, onAnswer, time, maxTime, selected }) {
  if (!question) return null;

  return (
    <motion.div
      key={current}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "90%", maxWidth: 700, margin: "0 auto" }} // responsive y centrado
    >
      <Card
        sx={{
          p: { xs: 3, sm: 5 }, // padding responsive
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30,41,59,0.95)"
              : "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <CardContent>
          {/* Contador y temporizador separados verticalmente */}
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" mb={5} spacing={3}>
            {/* Contador */}
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Pregunta {current + 1} / {total}
            </Typography>

            {/* Temporizador */}
            <Box position="relative" display="inline-flex">
              <CircularProgress
                variant="determinate"
                value={(time / maxTime) * 100}
                size={80}
                thickness={6}
                sx={{ color: time <= 3 ? "error.main" : "primary.main" }}
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                right={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ pointerEvents: "none" }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary" }}>
                  {time}s
                </Typography>
              </Box>
            </Box>
          </Stack>

          {/* Pregunta */}
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}>
            {question.question}
          </Typography>

          {/* Opciones */}
          <Stack spacing={4} mt={2}>
            {question.options.map((opt, i) => (
              <motion.div key={i} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  fullWidth
                  variant={selected === opt ? "contained" : "outlined"}
                  onClick={() => onAnswer(opt)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    fontWeight: 500,
                    py: 2.2,
                    fontSize: "1rem",
                    backgroundColor:
                      selected === opt
                        ? opt === question.answer
                          ? "success.main"
                          : "error.main"
                        : "transparent",
                    color: selected === opt ? "#fff" : "inherit",
                    "&:hover": {
                      backgroundColor:
                        selected === opt
                          ? opt === question.answer
                            ? "success.dark"
                            : "error.dark"
                          : "rgba(37,99,235,0.1)",
                    },
                  }}
                >
                  {opt}
                </Button>
              </motion.div>
            ))}
          </Stack>

          {/* Puntos */}
          <Typography
            variant="body1"
            align="right"
            sx={{ mt: 4, color: "text.secondary", fontWeight: 500 }}
          >
            Puntos: {score}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
