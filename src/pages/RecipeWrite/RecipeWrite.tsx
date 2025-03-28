import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface RecipeStep {
  id: number;
  content: string;
}

const RecipeWrite: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [sauces, setSauces] = useState<string[]>([]);
  const [newSauce, setNewSauce] = useState("");
  const [steps, setSteps] = useState<RecipeStep[]>([{ id: 1, content: "" }]);
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddSauce = () => {
    if (newSauce.trim()) {
      setSauces([...sauces, newSauce.trim()]);
      setNewSauce("");
    }
  };

  const handleRemoveSauce = (index: number) => {
    setSauces(sauces.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setSteps([...steps, { id: steps.length + 1, content: "" }]);
  };

  const handleRemoveStep = (id: number) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleStepChange = (id: number, content: string) => {
    setSteps(
      steps.map((step) => (step.id === id ? { ...step, content } : step))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      description,
      ingredients,
      sauces,
      steps,
      cookingTime,
      difficulty,
    });
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          새로운 레시피 작성
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <TextField
            fullWidth
            label="레시피 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="레시피 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              재료
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="재료 추가"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="예: 양파 1개, 당근 1개"
              />
              <IconButton onClick={handleAddIngredient} color="primary">
                <AddIcon />
              </IconButton>
            </Box>
            <List>
              {ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText primary={ingredient} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              양념장
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="양념장 추가"
                value={newSauce}
                onChange={(e) => setNewSauce(e.target.value)}
                placeholder="예: 간장 2큰술, 고춧가루 1큰술"
              />
              <IconButton onClick={handleAddSauce} color="primary">
                <AddIcon />
              </IconButton>
            </Box>
            <List>
              {sauces.map((sauce, index) => (
                <ListItem key={index}>
                  <ListItemText primary={sauce} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveSauce(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              조리 단계
            </Typography>
            {steps.map((step) => (
              <Box key={step.id} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label={`단계 ${step.id}`}
                  value={step.content}
                  onChange={(e) => handleStepChange(step.id, e.target.value)}
                  multiline
                  rows={2}
                />
                {steps.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveStep(step.id)}
                    color="error"
                    sx={{ mt: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddStep}
              sx={{ mt: 1 }}
            >
              단계 추가
            </Button>
          </Box>

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <TextField
              label="조리 시간 (분)"
              type="number"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              label="난이도"
              select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              sx={{ flex: 1 }}
            >
              <option value="easy">쉬움</option>
              <option value="medium">보통</option>
              <option value="hard">어려움</option>
            </TextField>
          </Box>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" color="secondary">
            취소
          </Button>
          <Button variant="contained" type="submit">
            레시피 저장
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RecipeWrite;
