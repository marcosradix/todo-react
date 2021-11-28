import Head from 'next/head';
import { Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { ListaTarefasResults } from '../components/tarefa/tarefa-list-results';
import { TarefaListToolbar } from '../components/tarefa/tarefa-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useEffect } from 'react';
import { Tarefa } from "src/model/tarefa-model";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listarTarefas, salvarTarefa, apagarTarefa, atualizarStatusTarefa, filtrarTarefas } from '../store/tarefas-reducer';
import { styled } from '@mui/material/styles';
import { mensagemSucesso } from '../store/mensagens-reducer';

const Tarefas = (props) => {

  useEffect(() => {
    props.listarTarefas();
  }, []);

  const alterarStatus = (tarefa) => {
    props.atualizarStatusTarefa(tarefa.id);
  }

  const deletarTarefa = (tarefa) => {
      props.apagarTarefa(tarefa);
  }

  const onSubmit = (tarefa, categoria) => {
    if (tarefa && categoria) {
      console.log("submit", tarefa, categoria);
      props.salvarTarefa(new Tarefa(categoria, tarefa));
    } else {
      console.log("Não pode ser vazio");
    }
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  return (
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
          <TarefaListToolbar
            filtrarTarefas={props.filtrarTarefas}
            onSubmit={onSubmit}
          />
          <Box sx={{ mt: 3 }}>
            <ListaTarefasResults tarefas={props.tarefas}
              alterarStatus={alterarStatus}
              deletarTarefa={deletarTarefa} />
          </Box>
        </Container>
      </Box>
      <Dialog open={props.openDialog}
        onClose={() => props.mensagemSucesso('', false)} >
        <DialogTitle>
          <Div>Atenção</Div>
        </DialogTitle>
        <DialogContent>
          <Div>{props.mensagem}</Div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.mensagemSucesso('', false)}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
Tarefas.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas,
  mensagem: state.mensagens.mensagem,
  openDialog: state.mensagens.mostrarMensagem
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { listarTarefas, salvarTarefa, apagarTarefa, atualizarStatusTarefa, mensagemSucesso, filtrarTarefas }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tarefas);
