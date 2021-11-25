import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import FormDialog from "../../components/dialog/form-dialog";
import { useState } from "react";

export const TarefaListToolbar = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    let isOpened = !open;
    setOpen(isOpened);
};

const onSubmit = (tarefa, categoria) => {
  if(tarefa && categoria){
    console.log("submit", tarefa, categoria );
  }else{
    console.log("Não pode ser vazio");
  }

};

  return (
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
        <FormDialog
         open={open}
         onSubmit={onSubmit}
         setOpen={handleClickOpen}/>
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
  )
};
