
const ACTIONS = {
    MENSAGEM_SUCESSO: 'MENSAGEM_SUCESSO',
    MENSAGEM_ERRO: 'MENSAGEM_ERRO'
}

const ESTADO_INICIAL = {
    mensagem: '',
    mostrarMensagem: false
};

export const mensagensReducer = (state = ESTADO_INICIAL, action) => {
    switch(action.type){
        case ACTIONS.MENSAGEM_SUCESSO:
            return {...state, mensagem: action.mensagem , mostrarMensagem: action.mostrarMensagem}
        case ACTIONS.MENSAGEM_ERRO:
                return {...state, mensagem: action.mensagem, mostrarMensagem: action.mostrarMensagem}    

        default:
            return state;    
    }
}

export function mensagemSucesso(texto, mostrarMensagem){
    return  {
            type: ACTIONS.MENSAGEM_SUCESSO,
            mensagem: texto,
            mostrarMensagem: mostrarMensagem
    }
}

export function mensagemErro(texto, mostrarMensagem){
    return  {
            type: ACTIONS.MENSAGEM_ERRO,
            mensagem: texto,
            mostrarMensagem: mostrarMensagem

    }
}