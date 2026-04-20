// ===== DADOS =====

const menuItems = [
  { nome: "Sobre", id: "sobre" },
  { nome: "Datas", id: "datas" },
  { nome: "Modalidades", id: "modalidades" },
  { nome: "Área do Atleta", id: "inscricoes" }
];

const datasEvento = [
  "Período: 24/04 a 06/06/2026",
  "Abertura: 24/04 (17h às 20h)",
  "Competições: Sábados letivos"
];

const modalidades = [
  {
    titulo: "Esportes Coletivos",
    conteudo: "Futebol, Futsal (Masculino e Feminino), Vôlei de Quadra (Masculino e Feminino), Vôlei  de Praia (Misto 4x4), Handebol (Masculino e Feminino)"
  },
  {
    titulo: "Esportes Individuais",
    conteudo: "Atletismo(100m, 400m, Salto a Distância), Judô (Masculino e Feminino), Jiu-jitsu (Masculino e Feminino), Tênis de Mesa (Misto)"
  },
  {
    titulo: "Jogos e E-sports",
    conteudo: "Xadrez (Misto), Dominó (Misto), FIFA (Misto), League of Legends (Misto)"
  }
];


function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

function Header() {
  return `
    <header>
      <h1></h1>
      <p></p>
      <button id="btnSobre">Saiba mais</button>
    </header>
  `;
}

function Nav() {
  return `
    <nav>
      <ul>
        ${menuItems.map(item => `
          <li data-id="${item.id}">${item.nome}</li>
        `).join("")}
      </ul>
    </nav>
  `;
}

function Sobre() {
  return `
    <section id="sobre" class="card">
      <h2>📌 Sobre o Evento</h2>
      <p>
        A SEMADEC integra esporte, cultura e ciência, promovendo a formação integral dos estudantes
        e a integração da comunidade acadêmica.
      </p>
    </section>
  `;
}

function Datas() {
  return `
    <section id="datas" class="card">
      <h2>📅 Datas Importantes</h2>
      <ul>
        ${datasEvento.map(d => `<li>${d}</li>`).join("")}
      </ul>
    </section>
  `;
}

function Modalidades() {
  return `
    <section id="modalidades" class="card">
      <h2>⚽ Modalidades</h2>

      <div class="accordion">
        ${modalidades.map(m => `
          <button class="accordion-btn">${m.titulo}</button>
          <div class="accordion-content">
            <p>${m.conteudo}</p>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function Inscricoes() {
  return `
    <section id="inscricoes" class="card">
      <h2>👤 Área do Atleta</h2>
      <p>Realizadas via sistema eletrônico oficial do IFPB.</p>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
        <button onclick="irParaInscricao()">Inscreva-se</button>

        <button onclick="irParaResultados()" class="btn-secundario">
          📊 Ver Resultado do JICS
        </button>
      </div>
    </section>
  `;
}

function Premiacao() {
  return `
    <section class="card destaque">
      <h2>🏆 Premiação</h2>
      <p>Troféus para campeões gerais e medalhas para os três primeiros colocados.</p>
    </section>
  `;
}

function Footer() {
  return `
    <footer>
      <p>© 2026 IFPB - Campus João Pessoa</p>
    </footer>
  `;
}

function irParaResultados() {
  window.location.href = "resmed.html";
}

function App() {
  return `
    ${Header()}
    ${Nav()}
    ${Sobre()}
    ${Datas()}
    ${Modalidades()}
    ${Inscricoes()}
    ${Premiacao()}
    ${Footer()}
  `;
}

document.body.innerHTML = App();

document.getElementById("btnSobre").addEventListener("click", () => {
  scrollToSection("sobre");
});

document.querySelectorAll("nav li").forEach(item => {
  item.addEventListener("click", () => {
    scrollToSection(item.dataset.id);
  });
});

function irParaInscricao() {
  window.location.href = "inscricao.html";
}

document.querySelectorAll(".accordion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.nextElementSibling.classList.toggle("active");
  });
});
