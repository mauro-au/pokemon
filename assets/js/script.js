const urlPokemones = "https://pokeapi.co/api/v2/pokemon/";
const urlTypePokemones = "https://pokeapi.co/api/v2/type/";

// Eventos

document.querySelector("#home").addEventListener("click", homePokemon);
document.querySelector("#boton_buscar_numero").addEventListener("click", buscarPokemonNumero);
document.querySelector("#boton_buscar_tipo").addEventListener("click", buscarPokemonTipo);

//Funciones

function card(cardPokemon) {
  let imgPokemon = cardPokemon.sprites.front_default;
  let idPokemon = cardPokemon.id;
  let namePokemon = cardPokemon.name;
  let stats = cardPokemon.stats;
  let colorType = cardPokemon.types;
  let typeBack = "";
  let typeIcon = "";


  if (colorType.length == 1) {
    typeBack += colorType[0].type.name;
  } else {
    typeBack += colorType[1].type.name;
  }

  if (colorType.length < 2) {
    typeIcon += `<div class="tiposPokemon"><img class="${colorType[0].type.name}" src="assets/img/icon/${colorType[0].type.name}.svg" alt=""></div>`;
  } else {
    typeIcon += `<div class="tiposPokemon"><img class="${colorType[1].type.name}" src="assets/img/icon/${colorType[1].type.name}.svg" alt=""></div>`;
    typeIcon += `<div class="tiposPokemon"><img class="${colorType[0].type.name}" src="assets/img/icon/${colorType[0].type.name}.svg" alt=""></div>`;
  }

  if (imgPokemon == null) {
    imgPokemon = "assets/img/nofound.png";
  }

  $(".main").append(
    `<div class="card col-sm-6 col-md-4 col-xl-3">
        <img src="${imgPokemon}" class="card-img-top" id="img" alt="...">
        <div class="circle"></div>
        <div class="card-body ${typeBack}">
            <h5 id="numero">#${idPokemon}</h5>
            <h1 class="card-title" id="name">${namePokemon}</h1>
            <div class="tipos">
                ${typeIcon}
            </div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter${idPokemon}"> Ver Gráfica </button>
        </div>
     </div>

     <!-- Modal -->
     <div class="modal fade" id="exampleModalCenter${idPokemon}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content ${typeBack}">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalCenterTitle">${namePokemon}</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body">
               <div class="row">
                   <div class="modal_info col-6">
                     <img src="${imgPokemon}" class="pokemonModal" alt="...">
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati repellendus ad ipsa nihil, magni rem, voluptas ducimus explicabo modi temporibus voluptates necessitatibus veniam cupiditate voluptatum minus quo, ipsum doloribus nesciunt?</p>
                   </div>
                   <div class="modal_grafico col-6">
                      <div id="chartContainer${idPokemon}"></div>
                   </div>
               </div>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
          </div>
      </div>
    </div>`
  );

  var chart = new CanvasJS.Chart("chartContainer" + idPokemon, {
    animationEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    backgroundColor: "transparent",
    title: {
      text: "habilidades",
    },
    axisY: {
      title: "",
    },
    data: [
      {
        type: "column",
        showInLegend: false,
        legendMarkerColor: "black",
        // legendText: "MMbbl = one million barrels",
        dataPoints: [
          { y: stats[0].base_stat, label: "Velocidad" },
          { y: stats[3].base_stat, label: "Defensa" },
          { y: stats[4].base_stat, label: "Ataque" },
          { y: stats[5].base_stat, label: "Puntos de vida" },
        ],
      },
    ],
  });
  chart.render();
}

homePokemon();
// + '?offset=0&limit=900'
function homePokemon() {
  $(".main").html("");
  $.get(urlPokemones, (data) => {
    data.results.forEach((resultPokemon) => {
      $.get(resultPokemon.url, (totalPokemon) => {
        card(totalPokemon);
      });
    });
  });
}

function buscarPokemonNumero() {
  let id = $("#idPokemon").val();

  if (id === "") {
    alert("Ingrese un mumero o nombre de pokemon valido");
    return false;
  }

  $(".main").html("");
  let idResult = urlPokemones + id.toLowerCase();

  $.get(idResult, (idPokemon) => {
    card(idPokemon);
  });
}

$.get(urlTypePokemones, (type) => {
  type.results.forEach((typePokemon) => {
    $("#search_select").append(`<option>${typePokemon.name}</option>`);
  });
});

function buscarPokemonTipo() {
  let valor = $("#search_select").val();

  if (valor === null) {
    alert("Seleccionar un tipo de pokemon");
    return false;
  }

  let valorFinal = urlTypePokemones + valor;
  $.get(valorFinal, (buscarPokemon1) => {
    if (buscarPokemon1.pokemon.length == 0) {
      alert("No hay pokemones por ahora");
      return false;
    }
    $(".main").html("");
    buscarPokemon1.pokemon.forEach((buscarPokemon2) => {
      $.get(buscarPokemon2.pokemon.url, (buscarPokemon3) => {
        card(buscarPokemon3);
      });
    });
  });
}
