const form = document.getElementById("form-transacao");
const lista = document.getElementById("lista");

const entradas = document.querySelector(".entradas p");
const saidas = document.querySelector(".saidas p");
const saldo = document.querySelector(".saldo p");

let transacoes = [];

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = form.nome.value;
  const valor = Number(form.valor.value);
  const tipo = form.tipo.value;
  const categoria = form.categoria.value;

  const transacao = {
    id: Date.now(),
    nome,
    valor,
    tipo,
    categoria
  };

  transacoes.push(transacao);

  atualizarTela();

  form.reset();
});

function atualizarTela() {
  lista.innerHTML = "";

  let totalEntradas = 0;
  let totalSaidas = 0;

  transacoes.forEach((t) => {
    const item = document.createElement("div");

    item.innerHTML = `
      <span>
        <strong>${t.nome}</strong> - R$ ${t.valor} (${t.tipo})
      </span>

      <button onclick="excluirTransacao(${t.id})">🗑️</button>
    `;

    lista.appendChild(item);

    // soma valores aqui dentro do loop
    if (t.tipo === "entrada") {
      totalEntradas += t.valor;
    } else {
      totalSaidas += t.valor;
    }
  });

  entradas.textContent = `R$ ${totalEntradas}`;
  saidas.textContent = `R$ ${totalSaidas}`;
  saldo.textContent = `R$ ${totalEntradas - totalSaidas}`;
}

function excluirTransacao(id) {
  transacoes = transacoes.filter(t => t.id !== id);
  atualizarTela();
}