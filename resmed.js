const modalidades = [
  "Futebol",
  "Futsal Masculino",
  "Futsal Feminino",
  "Vôlei de Quadra Masculino",
  "Vôlei de Quadra Feminino",
  "Vôlei de Praia (Misto 4x4)",
  "Handebol Masculino",
  "Handebol Feminino",
  "Atletismo (100m, 400m, Salto a Distância)",
  "Judô Masculino",
  "Judô Feminino",
  "Jiu-jitsu Masculino",
  "Jiu-jitsu Feminino",
  "Tênis de Mesa (Misto)",
  "Xadrez (Misto)",
  "Dominó (Misto)",
  "FIFA (Misto)",
  "League of Legends (Misto)"
];

function getJogos() {
  return JSON.parse(localStorage.getItem("jogos")) || [];
}

function salvarJogos(jogos) {
  localStorage.setItem("jogos", JSON.stringify(jogos));
}

function getAdmin() {
  return localStorage.getItem("adminLogado") === "true";
}

function setAdmin(v) {
  localStorage.setItem("adminLogado", v);
}

function loginAdmin() {
  const u = prompt("Usuário:");
  const s = prompt("Senha:");

  if (u === "admin" && s === "admin123") {
    setAdmin(true);
    render();
  } else alert("Erro!");
}

function logout() {
  setAdmin(false);
  render();
}

function calcularRanking(jogos, modalidade) {
  const tabela = {};

  jogos
    .filter(j => j.modalidade === modalidade)
    .forEach(j => {

      if (!tabela[j.timeA]) tabela[j.timeA] = { pts: 0, gp: 0, gc: 0 };
      if (!tabela[j.timeB]) tabela[j.timeB] = { pts: 0, gp: 0, gc: 0 };

      tabela[j.timeA].gp += j.golsA;
      tabela[j.timeA].gc += j.golsB;

      tabela[j.timeB].gp += j.golsB;
      tabela[j.timeB].gc += j.golsA;

      if (j.golsA > j.golsB) tabela[j.timeA].pts += 3;
      else if (j.golsB > j.golsA) tabela[j.timeB].pts += 3;
      else {
        tabela[j.timeA].pts += 1;
        tabela[j.timeB].pts += 1;
      }
    });

  return Object.entries(tabela)
    .map(([time, d]) => ({
      time,
      ...d,
      sg: d.gp - d.gc
    }))
    .sort((a, b) =>
      b.pts - a.pts ||
      b.sg - a.sg ||
      b.gp - a.gp
    );
}

function App() {
  const jogos = getJogos();
  const admin = getAdmin();

  return `
    <header>
      <h1>🏆 Classificação Geral</h1>
    </header>

    <div style="text-align:center; margin:10px;">
      ${admin
        ? `<button class="btn" onclick="logout()">Logout</button>`
        : `<button class="btn" onclick="loginAdmin()">Login Admin</button>`
      }
    </div>

    ${modalidades.map(m => renderTabela(jogos, m)).join("")}

    ${admin ? adminPanel() : ""}

    <footer style="text-align:center; padding:30px;">
      <button class="btn-voltar" onclick="voltar()">
        ⬅ Voltar
      </button>
    </footer>
  `;
}

function renderTabela(jogos, modalidade) {
  const ranking = calcularRanking(jogos, modalidade);

  return `
    <section class="card">
      <h2>⚽ ${modalidade}</h2>

      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Pts</th>
            <th>GP</th>
            <th>GC</th>
            <th>SG</th>
          </tr>
        </thead>
        <tbody>
          ${ranking.map((t, i) => `
            <tr>
              <td>${i+1}</td>
              <td>${t.time}</td>
              <td>${t.pts}</td>
              <td>${t.gp}</td>
              <td>${t.gc}</td>
              <td>${t.sg}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      ${grafico(ranking, modalidade)}
    </section>
  `;
}

function grafico(ranking, modalidade) {
  return `
    <canvas id="grafico-${modalidade}" height="100"></canvas>
    <script>
      setTimeout(() => {
        const ctx = document.getElementById("grafico-${modalidade}");

        if (!ctx) return;

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ${JSON.stringify(ranking.map(t => t.time))},
            datasets: [{
              label: "Pontos",
              data: ${JSON.stringify(ranking.map(t => t.pts))}
            }]
          }
        });
      }, 100);
    </script>
  `;
}

function adminPanel() {
  return `
    <section class="card">
      <h2>⚙️ Novo Jogo</h2>

      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <select id="modalidade">
          ${modalidades.map(m => `<option>${m}</option>`).join("")}
        </select>

        <input id="timeA" placeholder="Time A">
        <input id="golsA" type="number" placeholder="Gols A">
        <input id="timeB" placeholder="Time B">
        <input id="golsB" type="number" placeholder="Gols B">

        <button class="btn" onclick="addJogo()">Salvar</button>
      </div>
    </section>
  `;
}

function addJogo() {
  const jogos = getJogos();

  const novo = {
    modalidade: document.getElementById("modalidade").value,
    timeA: document.getElementById("timeA").value,
    golsA: parseInt(document.getElementById("golsA").value),
    timeB: document.getElementById("timeB").value,
    golsB: parseInt(document.getElementById("golsB").value)
  };

  jogos.push(novo);
  salvarJogos(jogos);
  render();
}

function render() {
  document.body.innerHTML = App();
}

function voltar() {
  window.location.href = "pagin.html";
}

render();
