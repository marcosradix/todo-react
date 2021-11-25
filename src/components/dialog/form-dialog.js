import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box

 } from "@mui/material";

export default function FormDialog(props) {
  const { open, setOpen, onSubmit } = props;
  const [tarefa, setTarefa] = useState("");
  const [categoria, setCategoria] = useState("");

  const modificarTarefa = (event) => {
    setTarefa(event.target.value);
  };

  const modificaCategoria = (event) => {
    setCategoria(event.target.value);
  };

  return (
    <div>
      <Dialog open={open}
      maxWidth="md"
      onClose={setOpen}>
        <DialogTitle>Adicionar Tarefa</DialogTitle>
        <DialogContent>
          <DialogContentText>Adicione um item a sua lista de tarefas.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome da tarefa"
            type="text"
            fullWidth
            variant="standard"
            value={tarefa}
            onChange={modificarTarefa}
          />
          <Box pt={2}>
          <FormControl fullWidth>
          <Box pt={2}>
            <InputLabel>Categoria: </InputLabel>
            </Box>
            <Select value={categoria}
            onChange={e => modificaCategoria(e)}>
              <MenuItem value={""} >Selecione....</MenuItem>
              <MenuItem value={"PESSOAL"}>Pessoal</MenuItem>
              <MenuItem value={"TRABALHO"}>Trabalho</MenuItem>
              <MenuItem value={"ESTUDOS"}>Estudos</MenuItem>
              <MenuItem value={"OUTROS"}>Outros</MenuItem>
            </Select>
          </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen();
              setTarefa("");
              setCategoria("");
            }}
          >
            Cancelar
          </Button>
          <Button
            disabled={tarefa == "" || categoria == ""}
            onClick={() => {
              onSubmit(tarefa, categoria);
              setTarefa("");
              setCategoria("");
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
