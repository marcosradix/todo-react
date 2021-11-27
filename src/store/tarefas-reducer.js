import {AxiosClient} from '../utils/custom-axios-client';
const axiosClient = AxiosClient.getInstance();


const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVER: 'TAREFAS_REMOVER',
    ATUALIZAR: 'TAREFAS_ATUALIZAR'
}

const ESTADO_INICIAL = {
    tarefas: []
};

const removeFromArray = (tarefas, tarefa) => {
    const index = tarefas.indexOf(tarefa);
    if (index > -1) {
        tarefas.splice(index, 1);
    }
    return tarefas;
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.LISTAR:
            return {...state, tarefas: action.tarefas };
        case ACTIONS.ADD:
            return {...state, tarefas: [...state.tarefas, action.tarefa] };
        case ACTIONS.ATUALIZAR:
            return {...state, tarefas: [...state.tarefas] };
        case ACTIONS.REMOVER:
                return {...state, tarefas: [...removeFromArray(state.tarefas, action.tarefa)] };      
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
            })
        });
    }
}

export function salvarTarefa(tarefa){
    return dispatch => {
        axiosClient.post('/tarefas', tarefa).then(response =>{
            dispatch({
                type: ACTIONS.ADD,
                tarefa: response.data
            })
        });
    }
}

export function apagarTarefa(tarefa){
    return dispatch => {
        axiosClient.delete(`/tarefas/${tarefa.id}`).then(() =>{
            dispatch({
                type: ACTIONS.REMOVER,
                tarefa: tarefa
            })
        });
    }
}

export function atualizarStatusTarefa(id){
    return dispatch => {
        axiosClient.patch(`/tarefas/${id}`).then(() =>{
            dispatch({
                type: ACTIONS.ATUALIZAR,
                tarefa: id
            })
        });
    }
}