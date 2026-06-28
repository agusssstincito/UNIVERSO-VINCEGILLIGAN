const series = {
  bb: {
    nombre: "Breaking Bad",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Breaking_Bad_logo.svg/1280px-Breaking_Bad_logo.svg.png",
    temporadas: [
      { numero: 1, episodios: 7 },
      { numero: 2, episodios: 13 },
      { numero: 3, episodios: 13 },
      { numero: 4, episodios: 13 },
      { numero: "5A", episodios: 8 },
      { numero: "5B", episodios: 8 }
    ]
  },
  bcs: {
    nombre: "Better Call Saul",
    imagen: "https://www.freelogovectors.net/wp-content/uploads/2023/09/better-call-saul-logo-freelogovectors.net_.png",
    temporadas: [
      { numero: 1, episodios: 10 },
      { numero: 2, episodios: 10 },
      { numero: 3, episodios: 10 },
      { numero: 4, episodios: 10 },
      { numero: 5, episodios: 10 },
      { numero: 6, episodios: 13 }
    ]
  },
  ec: {
    nombre: "El Camino",
    imagen: "https://image.tmdb.org/t/p/original/qfAuSn7X34Ut09UqbxxXIEUAgaK.png",
    temporadas: [] // es película, no tiene temporadas
  }
};
const cards = document.querySelectorAll(".serie-card");

cards.forEach(function (card) {
  card.addEventListener("click", function () {
    const claveSerie = card.dataset.serie; // lee data-serie="bb" → "bb"
    mostrarDetalle(claveSerie);
  });
});
function mostrarDetalle(clave) {
  const datos = series[clave];
  const contenedor = document.querySelector("#detalle-serie");

  contenedor.innerHTML = `
    <h2>${datos.nombre}</h2>
    <img src="${datos.imagen}" alt="${datos.nombre}">

    <div id="checklist-temporadas">
      ${generarChecklistHTML(datos.temporadas)}
    </div>

    <p>¿Cuántos episodios por día podés ver?</p>
    <input type="number" id="episodiosPorDia" min="1" value="1">
    <button id="btnCalcular">Calcular</button>
    <p id="resultadoCalculo"></p>
  `;
  document.querySelector("#btnCalcular").addEventListener("click", function () {
    calcularTiempo(clave);
  });
}

function generarChecklistHTML(temporadas) {
  return temporadas.map(function (temp) {
    return `
      <label>
        <input type="checkbox" class="check-temporada" data-episodios="${temp.episodios}">
        Temporada ${temp.numero} (${temp.episodios} episodios)
      </label>
    `;
  }).join("");
}
function calcularTiempo(clave) {
  const datos = series[clave];

  // sumo TODOS los episodios de la serie
  const totalEpisodios = datos.temporadas.reduce(function (acumulado, temp) {
    return acumulado + temp.episodios;
  }, 0);

  // agarro los checkboxes tildados
  const checkboxesTildados = document.querySelectorAll(".check-temporada:checked");

  // sumo los episodios de las temporadas YA VISTAS
  let episodiosVistos = 0;
  checkboxesTildados.forEach(function (check) {
    episodiosVistos += Number(check.dataset.episodios);
  });

  const episodiosRestantes = totalEpisodios - episodiosVistos;
  const porDia = Number(document.querySelector("#episodiosPorDia").value);

  const diasRestantes = Math.ceil(episodiosRestantes / porDia);

  document.querySelector("#resultadoCalculo").textContent =
    `Te faltan ${episodiosRestantes} episodios. A ese ritmo, terminás en ${diasRestantes} días.`;
}