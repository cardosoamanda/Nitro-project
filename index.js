//Declarando variáveis

var btn = document.querySelector('button')
let myRequest = new Request('./dados.json')

//Capturando informações do JSon
async function get(numeroPedido) {
    await fetch(myRequest)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let flag = false;
            let returnObj = {};
            data.encomendas.forEach(resp => {
                if (resp.numero === numeroPedido) {
                    flag = true;
                    returnObj = resp;
                }
            })
            flag ? encontrado(returnObj) : naoEncontrado()
        })
}

//Retornando dados JSon

function encontrado(obj) {
    let data = new Date(obj.data)
    document.getElementById('sucesso').style.display = 'block';
    document.getElementById('n-error-message').style.display = 'none';
    document.getElementById("nome").innerText = obj.cliente.nome;
    document.getElementById("valor").innerText = obj.valor;
    document.getElementById("data").innerText = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    obj.entregue ? document.getElementById("status").innerText = 'Entregue' :
        document.getElementById("status").innerText = "Entregar";
}

function naoEncontrado() {
    document.getElementById('sucesso').style.display = 'none';
    document.getElementById('n-error-message').style.display = 'block';
}


//Enviando o número do pedido
btn.addEventListener("click", function () {
    let numeroPedido = document.getElementById('search').value
    get(numeroPedido)
})
