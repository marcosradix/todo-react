import {combineReducers} from 'redux';
import {tarefaReducer} from '../store/tarefas-reducer';
import {mensagensReducer} from '../store/mensagens-reducer';

const mainReducer = combineReducers({
    tarefas: tarefaReducer,
    mensagens: mensagensReducer
});

export default mainReducer;