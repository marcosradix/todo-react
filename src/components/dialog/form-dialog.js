import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography
} from '@mui/material';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1
                }}
            >

                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ mr: 1 }}
                >
                    Add Tarefa
                </Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Tarefa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Adicione um item a sua lista de tarefas.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome da tarefa"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
