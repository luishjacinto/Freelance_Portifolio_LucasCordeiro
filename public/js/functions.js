var keys = [];
var query = firebase.database().ref("projetos").orderByKey();
query.once("value")
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      keys.push(childSnapshot.key);
    });
  });
var c = keys.length - 1;

$(document).ready(function () {
  setTimeout(function () {
    var c = keys.length - 1;
    adicionar(c);
  }, 1500);

  $('.modal').modal();

  $("#navbarMenu").click(function () {
    if ($("#navbarMenu").prop("name") == "1") {
      $("#sidenaverson").addClass("sideeffect")
      $("body").addClass("overflow0")
      $(".navgrey").toggle()
      $("#navbarMenu").prop("name", 0)
    } else if ($("#navbarMenu").prop("name") == "0") {
      $("#sidenaverson").removeClass("sideeffect")
      $("body").removeClass("overflow0")
      $(".navgrey").toggle()
      $("#navbarMenu").prop("name", 1)
    }
  })
  $(".navgrey").click(function () {
    if ($("#navbarMenu").prop("name") == "1") {
      $("#sidenaverson").addClass("sideeffect")
      $("body").addClass("overflow0")
      $(".navgrey").toggle()
      $("#navbarMenu").prop("name", 0)
    } else if ($("#navbarMenu").prop("name") == "0") {
      $("#sidenaverson").removeClass("sideeffect")
      $("body").removeClass("overflow0")
      $(".navgrey").toggle()
      $("#navbarMenu").prop("name", 1)
    }
  })
  $(".teste").click(function () {
    if ($("#navbarMenu").prop("name") == "0") {
      $("#sidenaverson").removeClass("sideeffect")
      $("body").removeClass("overflow0")
      $(".navgrey").toggle()
      $("#navbarMenu").prop("name", 1)
    }
  })

  $(window).scroll(function () {
    for (var i = 0; i < 7; i++) {
      if (isElementInViewport('.loadjs' + i)) {
        $('.loadjs' + i).addClass("load");
        $('.loadTextjs' + i).addClass("loadText")
      }
    }
    for (var i = 0; i < 5; i++) {
      if (isElementInViewport('.expjs' + i)) {
        $('.expjs' + i).removeClass("op0")
        $('.expjs' + i).addClass("opacAnimation")
      }
    }
  })
});

document.getElementById('btnVoltar').addEventListener("click", function () {
  c = (c + 1) % (keys.length);
  adicionar(c);
});

document.getElementById('btnAvancar').addEventListener("click", function () {
  c = (c - 1) % (keys.length);
  if (c < 0) c = keys.length - 1;
  adicionar(c);
});

function adicionar(c) {
  firebase.database().ref("projetos/" + keys[c]).on('value', function (snapshot) {
    var nome = snapshot.child("nome").val();
    var status = snapshot.child("status").val();
    var descricao = snapshot.child("descricao").val();
    imagem = snapshot.child("imagem").val();

    var nomeportifolio = document.getElementById('nomeportifolio');
    var img = document.getElementById('img1');
    var img2 = document.getElementById('img2');
    var span = document.getElementById('imgCaption');
    if(status == "DESENVOLVIMENTO"){nomeportifolio.innerHTML = nome + "(<span style=' color: #BEC7D5'>" + status + "</span>)";}
    if(status == "TESTES"){nomeportifolio.innerHTML = nome + "(<span style=' color: #FFFFFF'>" + status + "</span>)";}
    if(status == "PRONTO"){nomeportifolio.innerHTML = nome + "(<span style=' color: #00D646'>" + status + "</span>)";}
    img.setAttribute('data-caption', descricao);
    img.setAttribute('src', imagem);
    img2.setAttribute('src', imagem);
    span.innerHTML = descricao;
  });
}

function isElementInViewport(el) {
  var rect = $(el)[0].getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight + ($(el).height()) || document.documentElement.clientHeigh) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}