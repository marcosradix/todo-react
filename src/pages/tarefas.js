import Head from 'next/head';
import { Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { ListaTarefasResults } from '../components/tarefa/tarefa-list-results';
import { TarefaListToolbar } from '../components/tarefa/tarefa-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Tarefa } from "src/model/tarefa-model";

const Tarefas = () => {

  const URL_API = 'https://minhastarefas-api.herokuapp.com';
  const [tarefas, setTarefas]  = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const listarTarefas = () => {
    axios.get(`${URL_API}/tarefas`).then(response => {
      const listaDeTarefas = response.data;
      setTarefas(listaDeTarefas);
    }).catch(erro =>{
      console.log(erro);
    });
  }
  useEffect(() => {
    listarTarefas();
  }, [] );

  const refresh = () => {
    console.log('Atualizando a lista..');
    listarTarefas();
  };

  const filtrarTarefas = (event) => {

    const tarefasFiltradas = tarefas.filter( (str) => str.descricao.toLowerCase().includes(event.target.value.toLowerCase()) );

    if(!event.target.value){
      console.log('reset tarefas');
      listarTarefas();
    }

    setTarefas(tarefasFiltradas);
  };

  const alterarStatus = (tarefa) =>{
    axios.patch(`${URL_API}/tarefas/${tarefa.id}`).then(() => {
      listarTarefas();
      setMensagem('Tarefa atualizada com sucesso.')
      setOpenDialog(true);
    }).catch(erro =>{
      setMensagem('Erro ao atualizar tarefa.')
      setOpenDialog(true);
      console.log(erro);
    });
  }

  const deletarTarefa = (tarefa) =>{
    axios.delete(`${URL_API}/tarefas/${tarefa.id}`).then(() => {
      listarTarefas();
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
    axios
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
            <ListaTarefasResults tarefas={tarefas}
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

export default Tarefas;
