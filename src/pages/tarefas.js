import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ListaTarefasResults } from '../components/tarefa/tarefa-list-results';
import { TarefaListToolbar } from '../components/tarefa/tarefa-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Tarefas = () => {

  const URL_API = 'https://minhastarefas-api.herokuapp.com';
  const [tarefas, setTarefas]  = useState([]);

  const listarTarefas = () => {
    axios.get(`${URL_API}/tarefas`).then(response => {
      const listaDeTarefas = response.data;
      console.log(listaDeTarefas);
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

    const tarefasFiltradas = tarefas.filter(function (str) {
       return str.descricao.toLowerCase().includes(event.target.value.toLowerCase());
      });

    if(!event.target.value){
      console.log('reset tarefas');
      listarTarefas();
    }

    setTarefas(tarefasFiltradas);
  };


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
          <TarefaListToolbar refresh={refresh}
          filtrarTarefas={filtrarTarefas} />
          <Box sx={{ mt: 3 }}>
            <ListaTarefasResults tarefas={tarefas} />
          </Box>
        </Container>
      </Box>
    </>
  )
}
Tarefas.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Tarefas;
