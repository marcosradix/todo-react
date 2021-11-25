import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

export default function FormDialog(props) {
  const { open, setOpen, onSubmit } = props;
  const [tarefa, setTarefa] = useState("");

  const modificarNome = (event) => {
    setTarefa(event.target.value);
  };

  return (
    <div>
      <Dialog open={open}
      onClose={setOpen}>
        <DialogTitle>Adicionar Tarefa</DialogTitle>
        <DialogContent>
          <DialogContentText>Adicione um item a sua lista de tarefas.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome da tarefa"
            type="email"
            fullWidth
            variant="standard"
            value={tarefa}
            onChange={modificarNome}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen();
              setTarefa("");
            }}
          >
            Cancelar
          </Button>
          <Button
            disabled={tarefa == ""}
            onClick={() => {
              onSubmit(tarefa);
              setTarefa("");
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
