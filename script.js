let lista = localStorage.getItem("listaFilmes");

const formulario = document.getElementById("formulario");
const ulFilmes = document.getElementById("lista-ul");

if (lista) {
    lista = JSON.parse(lista);
} else {
    lista = [];
}

criarListaDeFilmes()

formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    let novoFilme = new Object();  //declarando objeto
    novoFilme.titulo = this.titulo.value;
    novoFilme.classificacao = this.classificacao.value;
    novoFilme.genero = this.genero.value;
    novoFilme.lancamento = this.lancamento.value;
    novoFilme.url = this.url.value;

    if(this.id.value != "" && this.id.value >= 0) { //verificação de edição ou inclusão de novo elemento
        lista[this.id.value] = novoFilme;          //se o id for diferente de "", ou maior que >0 
                                                    //pegar posição da novoFilme
    } else {
        lista.push(novoFilme)
    }

    this.reset();
    this.id.value = null; //<<<<conferir esse código // atualizando o value do id sempre que for atualizado, para evitar repetição de valor do índice

    salvarNoLocalStorage()

    criarListaDeFilmes()
})

function criarListaDeFilmes(filtro='') {
    ulFilmes.innerHTML = ""; //limpar campos após preenchimento
    lista.forEach((item,key) => {

        if(item.titulo.toUpperCase().indexOf(filtro.toUpperCase()) >= 0 || filtro == "") { //pesquisa a partir do titulo
            //comparação se o filtro for igual a 0 ou se for string vazia, continua mostrando todos os elementos da li \/

        linha = document.createElement('li');  // criando tags da lista dos filmes no HTML

        let botoesEditarExcluir = `<button onClick="excluir(${key})">[Excluir]</button>
                 <button onClick="editar(${key})">[Editar]</button>`
    
        linha.innerHTML = "<h2> " + item.titulo + "</h2>" + item.url + "<p>Classificação: " + item.classificacao + "<br>Gênero: " + item.genero + "<br>Lançamento: " + item.lancamento + "<br>" + botoesEditarExcluir + "</p>";
        ulFilmes.appendChild(linha);
}
});
}

function excluir(id) { //excluindo itens
    formulario.reset(); 
    lista.splice(id, 1); //atualizando id do objeto
    salvarNoLocalStorage(); //salvando no LS
    criarListaDeFilmes();  //Chamando a lista novamente
}

function editar(id) {
    formulario.id.value = id; // obtendo a posição de cada id do form
    formulario.titulo.value = lista[id].titulo;  
    formulario.classificacao.value = lista[id].classificacao;
    formulario.genero.value = lista[id].genero;
    formulario.lancamento.value = lista[id].lancamento;
}

function salvarNoLocalStorage(lista) {       // transformando em string e enviando para o localStorage
        localStorage.setItem("listaFilmes", JSON.stringify(lista));
}