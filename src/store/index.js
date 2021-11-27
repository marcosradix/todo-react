import {combineReducers} from 'redux';
import {tarefaReducer} from '../store/tarefas-reducer';

const mainReducer = combineReducers({
    tarefas: tarefaReducer
});

export default mainReducer;