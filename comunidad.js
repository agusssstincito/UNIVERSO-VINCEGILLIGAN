
class Fan {
  constructor(nombre, personajeFavorito, seriesVistas, descripcion, instagram, discord, foto, edad) {
    this.nombre = nombre;
    this.personajeFavorito = personajeFavorito;
    this.seriesVistas = seriesVistas;
    this.descripcion = descripcion;
    this.instagram = instagram;
    this.discord = discord;
    this.foto = foto;
    this.edad = edad;
  }
}


const fans = [
  new Fan("María García", "Walter White", ["bb", "bcs"], "Fanática desde el primer episodio. Team Heisenberg forever.", "@maria.garcia", "maria#1234", "https://i.pravatar.cc/150?img=1", 24),
  new Fan("Lucas Rodríguez", "Jesse Pinkman", ["bb", "ec"], "El arco de Jesse me rompió el corazón. El Camino me lo cerró.", "@lucas.rod", "lucas#5678", "https://i.pravatar.cc/150?img=2", 19),
  new Fan("Valentina López", "Kim Wexler", ["bcs"], "BCS es superior a BB, lo dije y no me arrepiento.", "@vale.lopez", "", "https://i.pravatar.cc/150?img=3", 27),
  new Fan("Tomás Fernández", "Gustavo Fring", ["bb", "bcs"], "Gus es el mejor villano de la historia de la televisión.", "@tomi.f", "tomas#9999", "https://i.pravatar.cc/150?img=4", 31),
  new Fan("Sofía Martínez", "Saul Goodman", ["bb", "bcs", "ec"], "Vi el universo completo 3 veces. Sin arrepentimientos.", "@sofi.mtz", "sofi#0001", "https://i.pravatar.cc/150?img=5", 22),
  new Fan("Mateo Sánchez", "Mike Ehrmantraut", ["bb", "bcs"], "Mike merecía su propia serie.", "@mateo.s", "", "https://i.pravatar.cc/150?img=6", 35),
  new Fan("Camila Torres", "Jesse Pinkman", ["bb", "ec"], "El Camino me hizo llorar. Aaron Paul es un genio.", "@cami.torres", "cami#4321", "https://i.pravatar.cc/150?img=7", 21),
  new Fan("Nicolás Pérez", "Walter White", ["bb"], "Solo BB por ahora, pero estoy enganchado.", "@nico.pz", "", "https://i.pravatar.cc/150?img=8", 18),
  new Fan("Juliana Gómez", "Lalo Salamanca", ["bcs"], "Lalo es el personaje más carismático que existió.", "@juli.gomez", "juli#7777", "https://i.pravatar.cc/150?img=9", 26),
  new Fan("Agustín Díaz", "Hank Schrader", ["bb", "bcs"], "Hank es el héroe no reconocido del universo Gilligan.", "@agus.diaz", "agus#2222", "https://i.pravatar.cc/150?img=10", 29)
];


let fansCompatibles = [];  
let indiceActual = 0;      
let matches = [];          


function calcularPuntaje(seriesUsuario, fan) {
  const coincidencias = fan.seriesVistas.filter(function(serie) {
    return seriesUsuario.includes(serie);
  });
  return coincidencias.length;
}


function mostrarCardActual() {
  const cardTinder = document.querySelector("#card-tinder");
  const contador = document.querySelector("#contador-fans");


  if (indiceActual >= fansCompatibles.length) {
    cardTinder.innerHTML = `<p>¡No quedan más fans compatibles!</p>`;
    document.querySelector("#btn-skip").style.display = "none";
    document.querySelector("#btn-like").style.display = "none";
    mostrarMatches();
    return;
  }

  const fan = fansCompatibles[indiceActual];


  contador.textContent = `${indiceActual + 1} de ${fansCompatibles.length} fans compatibles`;

  // armar la card
  cardTinder.innerHTML = `
    <div class="tinder-card">
      <img src="${fan.foto || 'https://i.pravatar.cc/150?img=0'}" alt="${fan.nombre}" class="tinder-foto">
      <h2 class="tinder-nombre">${fan.nombre}, ${fan.edad}</h2>
      <p class="tinder-personaje">⭐ ${fan.personajeFavorito}</p>
      <p class="tinder-series">${fan.seriesVistas.join(" · ").toUpperCase()}</p>
      <p class="tinder-descripcion">${fan.descripcion}</p>
      ${fan.instagram ? `<p class="tinder-contacto">📸 ${fan.instagram}</p>` : ""}
      ${fan.discord ? `<p class="tinder-contacto">🎮 ${fan.discord}</p>` : ""}
    </div>
  `;
}


function mostrarMatches() {
  const seccionMatches = document.querySelector("#seccion-matches");
  const grillaMatches = document.querySelector("#grilla-matches");

  seccionMatches.style.display = "block";
  seccionMatches.scrollIntoView({ behavior: "smooth" });

  if (matches.length === 0) {
    grillaMatches.innerHTML = `<p>No diste like a ningún fan todavía.</p>`;
    return;
  }

  grillaMatches.innerHTML = matches.map(function(fan) {
    return `
      <div class="match-card">
        <img src="${fan.foto || 'https://i.pravatar.cc/150?img=0'}" alt="${fan.nombre}" class="match-foto">
        <h3 class="match-nombre">${fan.nombre}, ${fan.edad}</h3>
        <p class="match-personaje">⭐ ${fan.personajeFavorito}</p>
        <p class="match-series">${fan.seriesVistas.join(" · ").toUpperCase()}</p>
        <p class="match-descripcion">${fan.descripcion}</p>
        ${fan.instagram ? `<p class="match-contacto">📸 ${fan.instagram}</p>` : ""}
        ${fan.discord ? `<p class="match-contacto">🎮 ${fan.discord}</p>` : ""}
      </div>
    `;
  }).join("");
}


document.querySelector("#btn-unirse").addEventListener("click", function() {


  const checkboxesTildados = document.querySelectorAll(".check-serie:checked");
  const seriesUsuario = [];
  checkboxesTildados.forEach(function(check) {
    seriesUsuario.push(check.dataset.serie);
  });
  const edadMin = Number(document.querySelector("#edad-min").value) || 0;
    const edadMax = Number(document.querySelector("#edad-max").value) || 99;


  if (seriesUsuario.length === 0) {
    alert("Tildá al menos una serie para encontrar fans compatibles.");
    return;
  }


    fansCompatibles = fans
  .filter(function(fan) {
    const tieneSeriesEnComun = calcularPuntaje(seriesUsuario, fan) > 0;
    const cumpleEdad = fan.edad >= edadMin && fan.edad <= edadMax;
    return tieneSeriesEnComun && cumpleEdad;
  })
  .sort(function(a, b) {
    return calcularPuntaje(seriesUsuario, b) - calcularPuntaje(seriesUsuario, a);
  });


  indiceActual = 0;
  matches = [];


  document.querySelector("#seccion-tinder").style.display = "block";
  document.querySelector("#btn-skip").style.display = "inline-block";
  document.querySelector("#btn-like").style.display = "inline-block";
  document.querySelector("#seccion-tinder").scrollIntoView({ behavior: "smooth" });

  mostrarCardActual();
});


document.querySelector("#btn-skip").addEventListener("click", function() {
  indiceActual++;
  mostrarCardActual();
});


document.querySelector("#btn-like").addEventListener("click", function() {
  const fanActual = fansCompatibles[indiceActual];
  matches.push(fanActual);  //Prox. DB
  indiceActual++;
  mostrarCardActual();
});

//La idea de escalabilidad de este proyecto es poder implementar un backend, con DB para guardar los usuarios, sus matches, etc. 
// Y en un futuro poder implementar unchat en tiempo real para que toda la comunidad pudiera manejarse en los chats. Seria como una "Pagina oficial de la serie" (??) Todavia falta pulir la idea, pero eso es lo que tengo por ahora profe