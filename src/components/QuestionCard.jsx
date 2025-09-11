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
style={{ width: "90%", maxWidth: 700, margin: "0 auto" }}
>
<Card
sx={{
p: { xs: 3, sm: 4 },
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
{/* Contador y temporizador */}
<Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" mb={4} spacing={2}>
<Typography variant="h6" sx={{ fontWeight: 500 }}>
{current + 1} / {total}
</Typography>

<Box position="relative" display="inline-flex">  
          <CircularProgress  
            variant="determinate"  
            value={(time / maxTime) * 100}  
            size={60}  
            thickness={5}  
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
            <Typography variant="body1" fontWeight="bold" sx={{ color: "text.primary" }}>  
              {time}s  
            </Typography>  
          </Box>  
        </Box>  
      </Stack>  

      {/* Pregunta */}  
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, mb: 3 }}>  
        {question.question}  
      </Typography>  

      {/* Opciones */}  
      <Stack spacing={3} mt={2}>  
        {question.options.map((opt, i) => (  
          <motion.div  
            key={i}  
            whileHover={{ scale: 1.03 }}  
            whileTap={{ scale: 0.97 }}  
            onClick={() => onAnswer(opt)} // clic ahora en todo el recuadro  
            style={{ cursor: "pointer" }}  
          >  
            <Button  
              fullWidth  
              variant={selected === opt ? "contained" : "outlined"}  
              sx={{  
                textTransform: "none",  
                borderRadius: 2,  
                fontWeight: 500,  
                py: 1.5,  
                fontSize: "0.95rem",  
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
        variant="body2"  
        align="right"  
        sx={{ mt: 3, color: "text.secondary", fontWeight: 500 }}  
      >  
        Puntos: {score}  
      </Typography>  
    </CardContent>  
  </Card>  
</motion.div>

);
} 
