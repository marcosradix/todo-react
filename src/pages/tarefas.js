import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ListaTarefasResults } from '../components/tarefa/tarefa-list-results';
import { TarefaListToolbar } from '../components/tarefa/tarefa-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const tarefas = [];

const Tarefas = () => (
  <>
    <Head>
      <title>
        Tarefas
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <TarefaListToolbar />
        <Box sx={{ mt: 3 }}>
          <ListaTarefasResults tarefas={tarefas} />
        </Box>
      </Container>
    </Box>
  </>
);
Tarefas.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Tarefas;
