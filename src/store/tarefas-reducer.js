import {AxiosClient} from '../utils/custom-axios-client';
const axiosClient = AxiosClient.getInstance();


const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVER: 'TAREFAS_REMOVER'
}

const ESTADO_INICIAL = {
    tarefas: []
};

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    console.log('Chamando ação do redux: ', action.type)
    switch (action.type) {
        case ACTIONS.LISTAR:
            return { ...state, tarefas: action.tarefas };
        default:
            return state ;
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