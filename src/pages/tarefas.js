import Head from 'next/head';
import { Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import  { ListaTarefasResults }  from '../components/tarefa/tarefa-list-results';
import { TarefaListToolbar } from '../components/tarefa/tarefa-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useState, useEffect } from 'react';
import { Tarefa } from "src/model/tarefa-model";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {listarTarefas} from '../store/tarefas-reducer';
import {AxiosClient} from '../utils/custom-axios-client';


const axiosClient = AxiosClient.getInstance();
const Tarefas = (props) => {

  const URL_API = 'https://minhastarefas-api.herokuapp.com';
  const [tarefas, setTarefas]  = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');


  useEffect(() => {
    props.listarTarefas();
  }, [] );

  const refresh = () => {
    console.log('Atualizando a lista..');
    props.listarTarefas();
  };

  const filtrarTarefas = (event) => {

    const tarefasFiltradas = tarefas.filter( (str) => str.descricao.toLowerCase().includes(event.target.value.toLowerCase()) );

    if(!event.target.value){
      console.log('reset tarefas');
      props.listarTarefas();
    }

    setTarefas(tarefasFiltradas);
  };

  const alterarStatus = (tarefa) =>{
    axiosClient.patch(`${URL_API}/tarefas/${tarefa.id}`).then(() => {
      props.listarTarefas();
      setMensagem('Tarefa atualizada com sucesso.')
      setOpenDialog(true);
    }).catch(erro =>{
      setMensagem('Erro ao atualizar tarefa.')
      setOpenDialog(true);
      console.log(erro);
    });
  }

  const deletarTarefa = (tarefa) =>{
    axiosClient.delete(`${URL_API}/tarefas/${tarefa.id}`).then(() => {
      props.listarTarefas();
      setMensagem('Tarefa removida com sucesso.')
      setOpenDialog(true);
    }).catch(erro =>{
      setMensagem('Erro ao remover tarefa.')
      setOpenDialog(true);
      console.log(erro);
    });
  }

  const onSubmit = (tarefa, categoria) => {
    if (tarefa && categoria) {
      console.log("submit", tarefa, categoria);
      salvar(new Tarefa(categoria, tarefa));
    } else {
      console.log("Não pode ser vazio");
    }
  }

  const salvar = (tarefa) => {
    axiosClient
      .post(`${URL_API}/tarefas`, tarefa)
      .then((response) => {
        setMensagem('Tarefa salva com sucesso.')
        setOpenDialog(true);
        refresh();
      })
      .catch((error) => {
        setMensagem('Erro ao salvar tarefa.')
        setOpenDialog(true);
        console.log(error);
      });
  }

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
          filtrarTarefas={filtrarTarefas}
          onSubmit={onSubmit}
          />
          <Box sx={{ mt: 3 }}>
            <ListaTarefasResults tarefas={props.tarefas}
            alterarStatus={alterarStatus}
            deletarTarefa={deletarTarefa}/>
          </Box>
        </Container>
      </Box>
      <Dialog open={openDialog}
        onClose={e => setOpenDialog(false)} >
        <DialogTitle>
          <Typography variant="h4"
              component="h4">
               Atenção
          </Typography>
        </DialogTitle>
        <DialogContent>
        <Typography variant="p"
              component="h4">
              {mensagem}
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={e => setOpenDialog(false)}>
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
  tarefas: state.tarefas.tarefas
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {listarTarefas}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tarefas);
