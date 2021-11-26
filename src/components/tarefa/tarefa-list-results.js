import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import TimerIcon from '@mui/icons-material/Timer';
import DoneAllIcon from '@mui/icons-material/DoneAll';

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


export const ListaTarefasResults = ({ tarefas, ...rest }) => {

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const URL_API = 'https://minhastarefas-api.herokuapp.com';

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                tarefas.map(tarefa => {
                  return(
                    <TableRow key={tarefa.id | ''}>
                    <TableCell>{tarefa.id}</TableCell>
                    <TableCell>{tarefa.descricao}</TableCell>
                    <TableCell>{tarefa.categoria}</TableCell>
                    <TableCell>{tarefa.done ? 'Feito' : 'Pendente'}</TableCell>
                    <TableCell>
                    <IconButton>

                        {tarefa.done ? <DoneAllIcon color="secondary"/>:  <TimerIcon color="secondary"/> }
                       </IconButton >
                    </TableCell>
                  </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={tarefas.length}
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
