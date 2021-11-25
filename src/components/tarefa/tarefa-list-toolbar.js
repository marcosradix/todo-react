import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  MuiAlert,
  Snackbar
} from "@mui/material";
import * as React from 'react';
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import FormDialog from "../../components/dialog/form-dialog";
import { useState } from "react";
import axios from "axios";
import { Tarefa } from "src/model/tarefa-model";

export const TarefaListToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState({
    openSnack: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, openSnack } = state;

  const handleClickSnack = (newState) => () => {
    setState({ openSnack: true, ...newState });
  };

  const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
  };


  const handleClickOpen = () => {
    let isOpened = !open;
    setOpen(isOpened);
  };

  const onSubmit = (tarefa, categoria) => {
    if (tarefa && categoria) {
      console.log("submit", tarefa, categoria);
      salvar(new Tarefa(categoria, tarefa));
    } else {
      console.log("Não pode ser vazio");
    }
  };

  const salvar = (tarefa) => {
    axios
      .post("https://minhastarefas-api.herokuapp.com/tarefas", tarefa)
      .then((response) => {
        console.log(response.data);
        {handleClickSnack({
          vertical: 'top',
          horizontal: 'right',
        })}
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnack}
        onClose={handleCloseSnack}
        message="Tarefa salva com sucesso"
        key={vertical + horizontal}
      />
      <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }}
        variant="h4">
          Tarefas
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />}
           onClick={handleClickSnack({
            vertical: 'top',
            horizontal: 'right',
          })}
           sx={{ mr: 1 }}>
            Importar
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />}
          sx={{ mr: 1 }}>
            Exportar
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleClickOpen()}
            sx={{ mr: 1 }}
          >
            Add Tarefa
          </Button>
          <FormDialog open={open}
          onSubmit={onSubmit}
          setOpen={handleClickOpen} />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action"
                      fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar tarefa"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
    </>

  );
};
