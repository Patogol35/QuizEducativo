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
      style={{ width: "100%", maxWidth: 600 }}
    >
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30,41,59,0.7)"
              : "rgba(255,255,255,0.85)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">{current + 1} / {total}</Typography>
            <Box position="relative" display="inline-flex">
              <CircularProgress
                variant="determinate"
                value={(time / maxTime) * 100}
                size={60}
                thickness={5}
                color={time <= 3 ? "error" : "primary"}
              />
              <Box
                top={0} left={0} bottom={0} right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontWeight="bold">{time}s</Typography>
              </Box>
            </Box>
          </Stack>

          <Typography variant="h5" gutterBottom>{question.question}</Typography>

          <Stack spacing={2} mt={2}>
            {question.options.map((opt, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  fullWidth
                  variant={selected === opt ? "contained" : "outlined"}
                  onClick={() => onAnswer(opt)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: "500",
                    py: 1.5,
                    backgroundColor: selected === opt ? (opt === question.answer ? "success.main" : "error.main") : "transparent",
                    color: selected === opt ? "#fff" : "inherit",
                    "&:hover": {
                      backgroundColor: selected === opt
                        ? (opt === question.answer ? "success.dark" : "error.dark")
                        : "rgba(37,99,235,0.1)",
                    }
                  }}
                >
                  {opt}
                </Button>
              </motion.div>
            ))}
          </Stack>

          <Typography variant="body2" align="right" sx={{ mt: 2, color: "text.secondary" }}>
            Puntos: {score}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
