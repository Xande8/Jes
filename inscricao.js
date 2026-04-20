const modalidades = [
  {
    categoria: "Esportes Coletivos",
    itens: [
      "Futsal (Masculino)",
      "Futsal (Feminino)",
      "Vôlei de Quadra (Masculino)",
      "Vôlei de Quadra (Feminino)",
      "Handebol (Masculino)",
      "Handebol (Feminino)",
      "Basquete 3x3 (Masculino)",
      "Basquete 3x3 (Feminino)",
      "Futebol de campo (Masculino)",
      "Vôlei de Praia (Misto)",
      "Futmesa (Misto)"
    ]
  },
  {
    categoria: "Esportes Individuais",
    itens: [
      "Atletismo (400m rasos)",
      "Atletismo (100m rasos)",
      "Atletismo (Salto a distância)",
      "Tênis de Mesa (Misto)",
      "Judô (Masculino)",
      "Judô (Feminino)",
      "Jiu-Jitsu (Masculino)",
      "Jiu-Jitsu (Feminino)"
    ]
  },
  {
    categoria: "Jogos e E-sports",
    itens: [
      "Xadrez (Misto)",
      "FIFA (Misto)",
      "LoL (Misto)",
      "Dominó (Misto)"
    ]
  }
];

const cursos = [
  "Contabilidade", "Controle Ambiental", "Edificações", "Eletrônica",
  "Eletrotecnica", "Informática", "Instrumento Musical", "Mecânica",
  "Leonina", "Indomáveis", "Demolidores", "Mafia Azul",
  "Pytaon", "Turbulenta", "RPM", "Cartel Net"
];


function Toast(msg) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => toast.remove(), 3000);
}


function App() {
  return `
    <header>
      <h1>Inscrição SEMADEC 2026</h1>
    </header>

    <section class="card">
      <form id="form" class="form-grid">

        ${input("nome", "Nome completo")}
        ${input("matricula", "Matrícula")}
        ${selectCurso()}
        ${input("email", "Email", "email")}

        ${renderModalidades()}

        <button class="btn" id="submitBtn" disabled>
          Confirmar Inscrição
        </button>
      </form>
    </section>

    ${adminPanel()}

    <footer style="text-align:center; padding:30px;">
      <button class="btn" onclick="voltarInicio()">
        ⬅ Voltar à página inicial
      </button>
    </footer>
  `;
}

function input(id, label, type = "text") {
  return `
    <div class="input-group">
      <input type="${type}" id="${id}" required placeholder=" ">
      <label>${label}</label>
      <div class="error-msg" id="erro-${id}"></div>
    </div>
  `;
}

function selectCurso() {
  return `
    <div class="input-group">
      <select id="atletica" required>
        <option value="" disabled selected></option>
        ${cursos.map(c => `<option>${c}</option>`).join("")}
      </select>
      <label>Atlética</label>
      <div class="error-msg" id="erro-atletica"></div>
    </div>
  `;
}

function renderModalidades() {
  return `
    <div>
      <h3>Modalidades</h3>
      ${modalidades.map(cat => `
        <div>
          <strong>${cat.categoria}</strong>
          <div class="checkbox-group">
            ${cat.itens.map(i => `
              <label>
                <input type="checkbox" value="${i}">
                <span>${i}</span>
              </label>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function adminPanel() {
  return `
    <section class="card admin-panel">
      <h2>⚙️ Painel Admin</h2>

      <div class="admin-divider"></div>

      <!-- FORM DE PARTIDAS -->
      <div class="admin-form">
        <select id="modalidade">
          ${modalidades.map(m => `<option>${m}</option>`).join("")}
        </select>

        <input id="timeA" placeholder="Time A">
        <input id="golsA" type="number" placeholder="Gols A">

        <input id="timeB" placeholder="Time B">
        <input id="golsB" type="number" placeholder="Gols B">

        <button class="btn-add" onclick="addJogo()">
          ➕ Adicionar Partida
        </button>
      </div>

      <div class="admin-divider"></div>

      <!-- CONTROLES -->
      <div class="admin-controls">
        <input type="text" id="filtro" placeholder="🔍 Buscar atleta...">
        <button class="btn" onclick="exportarCSV()">Exportar CSV</button>
      </div>

      <!-- TABELA -->
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Atlética</th>
            <th>Modalidades</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody id="tabela"></tbody>
      </table>
    </section>
  `;
}


document.body.innerHTML = App();


const checkboxes = document.querySelectorAll("input[type=checkbox]");
const btnSubmit = document.getElementById("submitBtn");

checkboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    const selecionados = [...checkboxes].filter(c => c.checked).length;
    btnSubmit.disabled = selecionados === 0;
  });
});

function validar() {
  let valido = true;

  const nome = document.getElementById("nome");
  const matricula = document.getElementById("matricula");
  const email = document.getElementById("email");
  const atletica = document.getElementById("atletica");

  const selecionados = [...document.querySelectorAll("input[type=checkbox]:checked")];

  if (nome.value.length < 3) {
    erro("nome", "Nome muito curto");
    valido = false;
  } else limparErro("nome");

  if (matricula.value.length < 3) {
    erro("matricula", "Matrícula inválida");
    valido = false;
  } else limparErro("matricula");

  if (!email.value.includes("@")) {
    erro("email", "Email inválido");
    valido = false;
  } else limparErro("email");

  if (!atletica.value) {
    erro("atletica", "Selecione uma atlética");
    valido = false;
  } else limparErro("atletica");

  if (selecionados.length === 0) {
    Toast("Selecione ao menos uma modalidade");
    valido = false;
  }

  return valido;
}

function erro(id, msg) {
  document.getElementById(id).classList.add("input-error");
  document.getElementById("erro-" + id).textContent = msg;
}

function limparErro(id) {
  document.getElementById(id).classList.remove("input-error");
  document.getElementById("erro-" + id).textContent = "";
}


document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();

  if (!validar()) return;

  const nome = document.getElementById("nome");
  const atletica = document.getElementById("atletica");

  const dados = JSON.parse(localStorage.getItem("inscricoes")) || [];

  const existe = dados.some(d => d.nome === nome.value);
  if (existe) {
    Toast("Usuário já inscrito!");
    return;
  }

  const btn = document.getElementById("submitBtn");
  btn.classList.add("loading");
  btn.textContent = "Salvando...";

  const selecionados = [...document.querySelectorAll("input[type=checkbox]:checked")]
    .map(el => el.value);

  dados.push({
    nome: nome.value,
    atletica: atletica.value,
    modalidades: selecionados
  });

  localStorage.setItem("inscricoes", JSON.stringify(dados));

  setTimeout(() => {
    btn.classList.remove("loading");
    btn.textContent = "Confirmar Inscrição";

    Toast("Inscrição realizada com sucesso!");
    e.target.reset();
    btn.disabled = true;
    carregarTabela();
  }, 800);
});

function carregarTabela(filtro = "") {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  const dados = JSON.parse(localStorage.getItem("inscricoes")) || [];

  dados
    .filter(i => i.nome.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((i, index) => {
      tabela.innerHTML += `
        <tr>
          <td>${i.nome}</td>
          <td>${i.atletica}</td>
          <td>${i.modalidades.join(", ")}</td>
          <td>
            <button onclick="remover(${index})">Excluir</button>
          </td>
        </tr>
      `;
    });
}

function remover(index) {
  let dados = JSON.parse(localStorage.getItem("inscricoes"));
  dados.splice(index, 1);
  localStorage.setItem("inscricoes", JSON.stringify(dados));
  carregarTabela();
}

function voltarInicio() {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "pagin.html";
  }, 300);
}

document.getElementById("filtro").addEventListener("input", e => {
  carregarTabela(e.target.value);
});

function exportarCSV() {
  const dados = JSON.parse(localStorage.getItem("inscricoes")) || [];

  let csv = "Nome,Atletica,Modalidades\n";

  dados.forEach(i => {
    csv += `${i.nome},${i.atletica},"${i.modalidades.join("|")}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "inscricoes.csv";
  a.click();
}

carregarTabela();
