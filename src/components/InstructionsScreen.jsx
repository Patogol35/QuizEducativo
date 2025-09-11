import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function InstructionsScreen({ onStart, difficulty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", maxWidth: 550 }}
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
            📖 Instrucciones
          </Typography>
          <Typography variant="body1" gutterBottom>
            Antes de empezar, revisa cómo funciona el juego:
          </Typography>

          <List sx={{ textAlign: "left", mb: 3 }}>
            <ListItem>
              <ListItemText primary="🔹 Responde 10 preguntas al azar." />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`🔹 Tiempo por pregunta: ${
                  difficulty === "easy"
                    ? "15 segundos"
                    : difficulty === "medium"
                    ? "10 segundos"
                    : "5 segundos"
                }.`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="🔹 Cada respuesta correcta suma 1 punto." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🔹 Si se acaba el tiempo, la pregunta se marca como incorrecta." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🔹 Al final verás tu puntaje y tu récord personal." />
            </ListItem>
          </List>

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={onStart}
            sx={{ px: 5, py: 1.5, borderRadius: 3 }}
          >
            ¡Empezar!
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
