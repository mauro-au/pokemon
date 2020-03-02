$(document).ready(function () {

  $("#idPokemon").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

})

var url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150';



function getPokemonId() {

  $('.main').html('');
  var id = $("#idPokemon")[0].value;
  console.log(id);

  if (id === "") {
    alert("buscar nombre o numero del pokemon");
  } else {
    obtenerPokemonPorIdApi(id);
  }
}

function obtenerPokemonPorIdApi(id) {
  $.get('https://pokeapi.co/api/v2/pokemon/' + id, data2 => {
    console.log(data2);
    let imgFront = data2.sprites.front_default
    let pokeId = data2.id.toString().padStart(3, '0');
    let stats = data2.stats;
    $('.main').append(
      '<div class="card col-sm-6 col-md-4 col-xl-3">' +
      '<img src=" ' + imgFront + ' " class="card-img-top" id="img" alt="...">' +
      '<div class="circle"></div>' +
      '<div class="card-body">' +
      '<h5 id="numero">#' + pokeId + '</h5>' +
      '<h1 class="card-title" id="name">' + data2.name + '</h1>' +
      '<button onclick="Graficar(' + stats[0].base_stat + ',' + stats[3].base_stat + ',' + stats[0].base_stat + ',' + stats[0].base_stat + ')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">' +
      'Ver Gráfica' +
      '</button>' +
      '</div>' +
      '</div>'
    )
  });
}


$.get('https://pokeapi.co/api/v2/type/', pokeTypes => {

  tipos = pokeTypes.results;
  let options = "<option>Tipo de Pokemon</option>";
  tipos.forEach(types => {
    options += '<option>' + types.name + '</option>';
  })
  $('#search_select').html(options);
})


function BuscarPokemonesLista() {

  $('.main').html('');

  let tipo = $('#search_select').val();
  let endPoint = 'https://pokeapi.co/api/v2/type/' + tipo;

  $.get(endPoint, data => {

    data.pokemon.forEach(pokemoness => {
      console.log(pokemoness);
      $('.main').append(
        '<div class="card col-sm-6 col-md-4 col-xl-3">' +
        // '<img src=" '+ imgFront +' " class="card-img-top" id="img" alt="...">'+
        '<div class="circle"></div>' +
        '<div class="card-body">' +
        '<h5 id="numero">#001</h5>' +
        '<h1 class="card-title" id="name">' + pokemoness.pokemon.name + '</h1>' +
        // '<a href="#" class="btn btn-primary">ver más</a>'+
        '</div>' +
        '</div>'
      )
    })
  })
}


BuscarPokemones();

function BuscarPokemones() {
  $.get(url, data => {
    data.results.forEach(pokemones => {
      $.get(pokemones.url, dataPokemon => {
        let imgFront = dataPokemon.sprites.front_default;
        let pokeId = dataPokemon.id.toString().padStart(3, '0');
        let stats = dataPokemon.stats;
        $('.main').append(
          '<div class="card col-sm-6 col-md-4 col-xl-3">' +
          '<img src=" ' + imgFront + ' " class="card-img-top" id="img" alt="...">' +
          '<div class="circle"></div>' +
          '<div class="card-body">' +
          '<h5 id="numero">#' + pokeId + '</h5>' +
          '<h1 class="card-title" id="name">' + pokemones.name + '</h1>' +
          '<button onclick="Graficar(' + stats[0].base_stat + ',' + stats[3].base_stat + ',' + stats[0].base_stat + ',' + stats[0].base_stat + ')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">' +
          'Ver Gráfica' +
          '</button>' +
          '</div>' +
          '</div>'
        )
      })
    })
  })
}



function Graficar(speed, defense, attack, hp) {
var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "habilidades"
	},
	axisY: {
		title: ""
	},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		// legendText: "MMbbl = one million barrels",
		dataPoints: [      
			{ y: speed, label: "Velocidad" },
			{ y: defense,  label: "Defensa" },
			{ y: attack,  label: "Ataque" },
			{ y: hp,  label: "Puntos de vida" }

		]
	}]
});
chart.render();
}