// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

// Codigo antigo acima
// Codigo atualizado em baixo
let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroScreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate: 1.2});
}

function mensagemIncial() {

    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 50');
}

mensagemIncial()


function verificarChute() {
    let chute = document.querySelector('input').value
    
    if(chute == numeroScreto){
        exibirTextoNaTela('h1', 'Acertou');   
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemtentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemtentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroScreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'o número secreto é maior');
        }
        tentativas++
        limparCampo();

    }
}

function gerarNumeroAleatorio() {
     let numeroEscolhido = parseInt(Math.random() * 10 + 1);
     let quantidadedeElementosNalista = listaDeNumerosSorteados.length;

     if (quantidadedeElementosNalista == numeroLimite) {
        listaDeNumerosSorteados = [];
     }

     if (listaDeNumerosSorteados .includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
     } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
     }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroScreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}