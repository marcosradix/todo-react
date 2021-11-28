import {AxiosClient} from '../utils/custom-axios-client';
import { mensagemSucesso } from '../store/mensagens-reducer';

const axiosClient = AxiosClient.getInstance();

const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVER: 'TAREFAS_REMOVER',
    ATUALIZAR: 'TAREFAS_ATUALIZAR',
    FILTRAR: 'TAREFAS_FILTRAR',
    ZERAR_NOTIFICACOES: 'ZERAR_NOTIFICACOES',
    REFRESH_LISTA: 'REFRESH_LISTA'
}

const ESTADO_INICIAL = {
    tarefas: [],
    quantidade: 0
};

const removeFromArray = (tarefas, tarefa) => {
    const index = tarefas.indexOf(tarefa);
    if (index > -1) {
        tarefas.splice(index, 1);
    }
    return tarefas;
}

const filtrarLista = (tarefas, inputValue) => {
    const tarefasFiltradas = tarefas.filter((str) => str.descricao.toLowerCase().includes(inputValue.toLowerCase()));
    return tarefasFiltradas;
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.LISTAR:
            return {...state, tarefas: action.tarefas, quantidade: action.tarefas.length | 0 };
        case ACTIONS.ADD:
            return {...state, tarefas: [...state.tarefas], quantidade: state.tarefas.length | 0 };
        case ACTIONS.ATUALIZAR:
            return state;
        case ACTIONS.REMOVER:
                return {...state, tarefas: [...removeFromArray(state.tarefas, action.tarefa)], quantidade: state.tarefas.length | 0 };
        case ACTIONS.FILTRAR:
                    return {...state, tarefas: [...filtrarLista(state.tarefas, action.inputValue)] };
        case ACTIONS.ZERAR_NOTIFICACOES:
                        return {...state, quantidade: 0 };            
        default:
            return state;
    }
}

export function listarTarefas(){
    return dispatch => {
        axiosClient.get('/tarefas').then(response =>{
            dispatch({
                type: ACTIONS.LISTAR,
                tarefas: response.data
            });
        });
    }
}

export function salvarTarefa(tarefa){
    return dispatch => {
        axiosClient.post('/tarefas', tarefa).then(response =>{
            dispatch([{
                type: ACTIONS.ADD,
                tarefa: response.data
            },  mensagemSucesso('Tarefa salva com sucesso.', true),
            listarTarefas()
        ]);
        });
    }
}

export function apagarTarefa(tarefa){
    return dispatch => {
        axiosClient.delete(`/tarefas/${tarefa.id}`).then(() =>{
            dispatch([{
                type: ACTIONS.REMOVER,
                tarefa: tarefa
            }, mensagemSucesso('Tarefa removida com sucesso.', true)]);
        });
    }
}

export function atualizarStatusTarefa(id){
    return dispatch => {
        axiosClient.patch(`/tarefas/${id}`).then(() =>{
            dispatch([{
                type: ACTIONS.ATUALIZAR,
                tarefa: id
            }, listarTarefas(), mensagemSucesso('Tarefa atualizada com sucesso.', true)])
        });
    }
}

export function filtrarTarefas(event){
    if(!event.target.value){
        return dispatch => {
                dispatch([{type: ACTIONS.REFRESH_LISTA}, listarTarefas()]);
        }
    }
    return  {
        type: ACTIONS.FILTRAR,
        inputValue: event.target.value.toLowerCase()
    }
}

export function zerarNotificacoes(){
    return  {
            type: ACTIONS.ZERAR_NOTIFICACOES
    }
}