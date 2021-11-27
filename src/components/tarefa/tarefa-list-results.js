import { useState } from "react";
import PropTypes from "prop-types";
import TimerIcon from '@mui/icons-material/Timer';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton

} from "@mui/material";


export const ListaTarefasResults = (props) => {

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.tarefas.map(tarefa => {
                  return(
                    <TableRow key={tarefa.id | ''}>
                    <TableCell>{tarefa.id}</TableCell>
                    <TableCell>{tarefa.descricao}</TableCell>
                    <TableCell>{tarefa.categoria}</TableCell>
                    <TableCell>{tarefa.done ? 'Feito' : 'Pendente'}</TableCell>
                    <TableCell>
                    <IconButton onClick={() => props.alterarStatus(tarefa)}>
                        {tarefa.done ? <DoneAllIcon color="secondary"/>:  <TimerIcon color="secondary"/> }
                       </IconButton >
                    </TableCell>
                    <TableCell>
                    <IconButton onClick={() => props.deletarTarefa(tarefa)}>
                      <DeleteIcon />
                       </IconButton >
                    </TableCell>
                  </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </Box>
      <TablePagination
        component="div"
        count={props.tarefas.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        labelRowsPerPage="Linhas por páginas"
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ListaTarefasResults.propTypes = {
  tarefas: PropTypes.array.isRequired,
};
