var _TURNO_ = 0;
var _DADOS_ = 0;
var _BOARD_ = new Array();
var _VARIOSTURNOS_ = 0;

for(var i = 0; i < 40; i++) _BOARD_.push({});

var _PROPIEDADES_ = new Array();
_PROPIEDADES_.push(new Array());
_PROPIEDADES_.push(new Array());

function flipBit(bit){
  if(bit == 0) return 1;
  else if(bit == 1) return 0;
}

function cambiaTurno(){
  if(_TURNO_ == 0) _TURNO_ = 1;
  else _TURNO_ = 0;
}

function deshabilita(nom, val){
  document.getElementById(nom).disabled = val;
  if(val) document.getElementById(nom).setAttribute("class", "disabled");
  else document.getElementById(nom).setAttribute("class", "comando");
}

function deshabilitaTodo(){
  deshabilita("tirardados0", true);
  deshabilita("comprarpropiedad0", true);
  deshabilita("colocarcasa0", true);
  deshabilita("colocarhotel0", true);
  deshabilita("vendercasa0", true);
  deshabilita("venderhotel0", true);
  deshabilita("venderpropiedad0", true);
  deshabilita("pasar0", true);
  deshabilita("salircarcel0", true);
  deshabilita("tirardados1", true);
  deshabilita("comprarpropiedad1", true);
  deshabilita("colocarcasa1", true);
  deshabilita("colocarhotel1", true);
  deshabilita("vendercasa1", true);
  deshabilita("venderhotel1", true);
  deshabilita("venderpropiedad1", true);
  deshabilita("pasar1", true);
  deshabilita("salircarcel1", true);
}

function isCambioTurno(){
  if(document.getElementById("tirardados"+_TURNO_).disabled == true &&
    document.getElementById("comprarpropiedad"+_TURNO_).disabled == true)
    return true;
  else return false;
}

function habilitaBotones(){
  var Casilla = _BOARD_[parseInt(_JUGADORAS_[_TURNO_].casilla)];
  var Jugadora = _JUGADORAS_[_TURNO_];
  if(_TURNO_ == 0){
    if(_VARIOSTURNOS_ == 0){
      deshabilita("tirardados0", true);
    }
    else{
      deshabilita("tirardados0", false);
    }
    if((parseInt(Casilla.precio) > parseInt(Jugadora.dinero)) || (Casilla.id == "arca") || (Casilla.id == "esquina") || (Casilla.id == "impuestos") || (Casilla.id == "fortuna") || (Casilla.duenio != "-1")){
      deshabilita("comprarpropiedad0", true);
    }
    else{
      deshabilita("comprarpropiedad0", false);
    }
    if(document.getElementById("comprarpropiedad0").disabled == false && document.getElementById("tirardados0").disabled == true){
      deshabilita("pasar0", false);
    }
    else{
      deshabilita("pasar0", true);
    }
    if(parseInt(Jugadora.idSalir) > 0 && Jugadora.idCarcel == "1"){
      deshabilita("salircarcel0", false);
      document.getElementById("salircarcel0").value = "Salir de la carcel (-tarjeta)";
    }
    else if(Jugadora.idCarcel == "1"){
      deshabilita("salircarcel0", false);
      document.getElementById("salircarcel0").value = "Salir de la carcel (-60)";
    }
    else {
      deshabilita("salircarcel0", true);
      document.getElementById("salircarcel0").value = "Salir de la carcel";
    }
    deshabilita("tirardados1", true);
    deshabilita("comprarpropiedad1", true);
  }
  else{
    deshabilita("tirardados0", true);
    deshabilita("comprarpropiedad0", true);
    if(_VARIOSTURNOS_ == 0){
      deshabilita("tirardados1", true);
    }
    else{
      deshabilita("tirardados1", false);
    }
    if((parseInt(Casilla.precio) > parseInt(Jugadora.dinero)) || (Casilla.id == "arca") || (Casilla.id == "esquina") || (Casilla.id == "impuestos") || (Casilla.id == "fortuna") || (Casilla.duenio != "-1")){
      deshabilita("comprarpropiedad1", true);
    }
    else{
      deshabilita("comprarpropiedad1", false);
    }
    if(document.getElementById("comprarpropiedad1").disabled == false && document.getElementById("tirardados1").disabled == true){
      deshabilita("pasar1", false);
    }
    else{
      deshabilita("pasar1", true);
    }
    if(parseInt(Jugadora.idSalir) > 0 && Jugadora.idCarcel == "1"){
      deshabilita("salircarcel1", false);
      document.getElementById("salircarcel1").value = "Salir de la carcel (-tarjeta)";
    }
    else if(Jugadora.idCarcel == "1"){
      deshabilita("salircarcel1", false);
      document.getElementById("salircarcel1").value = "Salir de la carcel (-60)";
    }
    else {
      deshabilita("salircarcel1", true);
      document.getElementById("salircarcel1").value = "Salir de la carcel";
    }
  }
  /*if(_PROPIEDADES_[0].length > 0){
    var e = document.getElementById("selectcolocar0");
    var estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
    if(estado.id != "impuestos" && estado.id != "arca" && estado.id != "esquina" && estado.id != "servicio" && estado.precioCasa != "0"){
      if(parseInt(estado.noCasas) == 4){
        deshabilita("colocarhotel0", false);
        deshabilita("colocarcasa0", true);
      }
      else if(parseInt(estado.noCasas) == 5){
        deshabilita("colocarhotel0", true);
        deshabilita("colocarcasa0", true);
      }
      else{
        deshabilita("colocarcasa0", false);
        deshabilita("colocarhotel0", true);
      }
    }
    else{
      deshabilita("colocarcasa0", true);
      deshabilita("colocarhotel0", true);
    }

    e = document.getElementById("selectvendercasas0");
    estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
    if(parseInt(estado.noCasas) > 0){
      if(parseInt(estado.noCasas) == 5){
        deshabilita("venderhotel0", false);
        deshabilita("vendercasa0", true);
      }
      else if(parseInt(estado.noCasas) > 0 && parseInt(estado.noCasas) <= 4){
        deshabilita("venderhotel0", false);
        deshabilita("vendercasa0", true);
      }
      else{
        deshabilita("vendercasa0", true);
        deshabilita("venderhotel0", true);
      }
    }
    else{
      deshabilita("vendercasa0", true);
      deshabilita("venderhotel0", true);
    }

    e = document.getElementById("selectvender0");
    estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
    if(parseInt(estado.noCasas) == 0){
      deshabilita("venderpropiedad0", false);
    }
    else{
      deshabilita("venderpropiedad0", true);
    }
  }
  else{
    deshabilita("colocarcasa0", true);
    deshabilita("colocarhotel0", true);
    deshabilita("vendercasa0", true);
    deshabilita("venderhotel0", true);
    deshabilita("venderpropiedad0", true);
  }
  if(_PROPIEDADES_[1].length > 0){
    var e = document.getElementById("selectcolocar1");
    var estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
    if(estado.id != "impuestos" && estado.id != "arca" && estado.id != "esquina" && estado.id != "servicio" && estado.precioCasa != "0"){
      if(parseInt(estado.noCasas) == 4){
        deshabilita("colocarhotel1", false);
        deshabilita("colocarcasa1", true);
      }
      else if(parseInt(estado.noCasas) == 5){
        deshabilita("colocarhotel1", false);
        deshabilita("colocarcasa1", true);
      }
      else{
        deshabilita("colocarcasa1", false);
        deshabilita("colocarhotel1", true);
      }
    }
    else{
      deshabilita("colocarcasa1", true);
      deshabilita("colocarhotel1", true);
    }

    e = document.getElementById("selectvendercasas1");
    estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
    if(parseInt(estado.noCasas) > 0){
      if(parseInt(estado.noCasas) == 5){
        deshabilita("venderhotel1", false);
        deshabilita("vendercasa1", true);
      }
      else{
        deshabilita("vendercasa1", false);
        deshabilita("venderhotel1", true);
      }
    }
    else{
      deshabilita("vendercasa1", true);
      deshabilita("venderhotel1", true);
    }

    e = document.getElementById("selectvender1");
    estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
    if(parseInt(estado.noCasas) == 0){
      deshabilita("venderpropiedad1", false);
    }
    else{
      deshabilita("venderpropiedad1", true);
    }
  }
  else{
    deshabilita("colocarcasa1", true);
    deshabilita("colocarhotel1", true);
    deshabilita("vendercasa1", true);
    deshabilita("venderhotel1", true);
    deshabilita("venderpropiedad1", true);
  }*/
}

function pasar(){
  deshabilita("pasar"+_TURNO_, true);
  cambiaTurno();
  _VARIOSTURNOS_ = 1;
  habilitaBotones();
  actualizaPrints();
  if(_VSIAFLAG_ == 1 && _TURNO_ == 1){
    agenteJugadora();
  }
}

function buscarEstadoPropiedad(nom){
  for(var it = 0; it < 40; it++)
    if(_BOARD_[it].nombre == nom)
      return _BOARD_[it];
  return 0;
}

function buscarIndexEstado(nom){
  for(var it = 0; it < 40; it++)
    if(_BOARD_[it].nombre == nom)
      return it;
  return 0;
}

function refreshBotones(Turno){
  var Jugadora = _JUGADORAS_[Turno];
  var e = document.getElementById("selectcolocar"+Turno);
  var estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
  if(estado.id != "impuestos" && estado.id != "arca" && estado.id != "esquina" && estado.id != "servicio" && estado.precioCasa != "0"){
    if(parseInt(estado.noCasas) == 4 && parseInt(Jugadora.dinero) > parseInt(estado.precioCasa)){
      deshabilita("colocarhotel"+Turno, false);
      deshabilita("colocarcasa"+Turno, true);
      document.getElementById("colocarcasa"+Turno).value = "Colocar casa";
      document.getElementById("colocarhotel"+Turno).value = "Colocar hotel (-"+estado.precioCasa+")";
    }
    else if(parseInt(estado.noCasas) < 4 && parseInt(estado.noCasas) >= 0 && parseInt(Jugadora.dinero) > parseInt(estado.precioCasa)){
      deshabilita("colocarcasa"+Turno, false);
      deshabilita("colocarhotel"+Turno, true);
      document.getElementById("colocarcasa"+Turno).value = "Colocar casa (-"+estado.precioCasa+")";
      document.getElementById("colocarhotel"+Turno).value = "Colocar hotel";
    }
    else{
      deshabilita("colocarcasa"+Turno, true);
      deshabilita("colocarhotel"+Turno, true);
      document.getElementById("colocarcasa"+Turno).value = "Colocar casa";
      document.getElementById("colocarhotel"+Turno).value = "Colocar hotel";
    }
  }
  else{
    deshabilita("colocarcasa"+Turno, true);
    deshabilita("colocarhotel"+Turno, true);
    document.getElementById("colocarcasa"+Turno).value = "Colocar casa";
    document.getElementById("colocarhotel"+Turno).value = "Colocar hotel";
  }

  e = document.getElementById("selectvendercasas"+Turno);
  estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
  if(parseInt(estado.noCasas) > 0){
    if(parseInt(estado.noCasas) == 5){
      deshabilita("venderhotel"+Turno, false);
      deshabilita("vendercasa"+Turno, true);
      document.getElementById("vendercasa"+Turno).value = "Vender casa";
      document.getElementById("venderhotel"+Turno).value = "Vender hotel (+"+(parseInt(estado.precioCasa)*5)+")";
    }
    else if(parseInt(estado.noCasas) <= 4 && parseInt(estado.noCasas) > 0){
      deshabilita("vendercasa"+Turno, false);
      deshabilita("venderhotel"+Turno, true);
      document.getElementById("vendercasa"+Turno).value = "Vender casa (+"+estado.precioCasa+")";
      document.getElementById("venderhotel"+Turno).value = "Vender hotel";
    }
    else{
      deshabilita("vendercasa"+Turno, true);
      deshabilita("venderhotel"+Turno, true);
      document.getElementById("vendercasa"+Turno).value = "Vender casa";
      document.getElementById("venderhotel"+Turno).value = "Vender hotel";
    }
  }
  else{
    deshabilita("vendercasa"+Turno, true);
    deshabilita("venderhotel"+Turno, true);
    document.getElementById("vendercasa"+Turno).value = "Vender casa";
    document.getElementById("venderhotel"+Turno).value = "Vender hotel";
  }

  e = document.getElementById("selectvender"+Turno);
  estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
  if(estado.noCasas == "0"){
    deshabilita("venderpropiedad"+Turno, false);
    document.getElementById("venderpropiedad"+Turno).value = "Vender propiedad (+"+estado.precio+")";
  }
  else{
    deshabilita("venderpropiedad"+Turno, true);
    document.getElementById("venderpropiedad"+Turno).value = "Vender propiedad (+"+estado.precio+")";
  }
}

function refreshNoCasas(idSelect, idP, idIMG){
  var e = document.getElementById(idSelect);
  var estado = buscarEstadoPropiedad(e.options[e.selectedIndex].value);
  if(estado.id == "cafe") document.getElementById(idIMG).innerHTML = "<img src='imgs/p2.png' width='10' height='10'>";
  else if(estado.id == "cyan") document.getElementById(idIMG).innerHTML = "<img src='imgs/p3.png' width='10' height='10'>";
  else if(estado.id == "morado") document.getElementById(idIMG).innerHTML = "<img src='imgs/p4.png' width='10' height='10'>";
  else if(estado.id == "naranja") document.getElementById(idIMG).innerHTML = "<img src='imgs/p5.png' width='10' height='10'>";
  else if(estado.id == "rojo") document.getElementById(idIMG).innerHTML = "<img src='imgs/p6.png' width='10' height='10'>";
  else if(estado.id == "amarillo") document.getElementById(idIMG).innerHTML = "<img src='imgs/p7.png' width='10' height='10'>";
  else if(estado.id == "verde") document.getElementById(idIMG).innerHTML = "<img src='imgs/p8.png' width='10' height='10'>";
  else if(estado.id == "rey") document.getElementById(idIMG).innerHTML = "<img src='imgs/p9.png' width='10' height='10'>";
  else document.getElementById(idIMG).innerHTML = "<img src='imgs/p1.png' width='10' height='10'>";
  if(parseInt(estado.noCasas) < 5) document.getElementById(idP).innerHTML = "Casas: "+estado.noCasas;
  else document.getElementById(idP).innerHTML = "Hotel adquirido";
}

function refreshSelect(Turn){
  refreshNoCasas("selectcolocar"+Turn, "noCasas"+Turn+"-colocar", "imgcolocar"+Turn);
  refreshNoCasas("selectvendercasas"+Turn, "noCasas"+Turn+"-vender", "imgvender"+Turn);
  refreshNoCasas("selectvender"+Turn, "noCasas"+Turn+"-vender-p", "imgvender-p"+Turn);
  refreshBotones(Turn);
}

function retornoSelect(nom, turno){
  var retorno = "<select id='"+nom+"' onchange='refreshSelect("+turno+")'>";
  var estado, str="";
  for(var p = 0; p < _PROPIEDADES_[turno].length; p++){
    estado = buscarEstadoPropiedad(_PROPIEDADES_[turno][p]);
    if(estado.id == "cafe") str = "#a24501";
    else if(estado.id == "cyan") str = "#02c7b8";
    else if(estado.id == "morado") str = "#c7027f";
    else if(estado.id == "naranja") str = "#ff6c00";
    else if(estado.id == "rojo") str = "#ff0000";
    else if(estado.id == "amarillo") str = "#d6d600";
    else if(estado.id == "verde") str = "#03d600";
    else if(estado.id == "rey") str = "#0003d6";
    else str = "#000000";
    retorno += "<option style='color:"+str+";' value='"+_PROPIEDADES_[turno][p]+"'>"+_PROPIEDADES_[turno][p]+"</option>";
  }
  retorno += "</select>";
  return retorno;
}

function actualizaDinero(){
  document.getElementById("player1-money").innerHTML = "DINERO: "+_JUGADORAS_[0].dinero+" <span class='monopolymoney inline-block'>&#8361;</span>";
  document.getElementById("player2-money").innerHTML = "DINERO: "+_JUGADORAS_[1].dinero+" <span class='monopolymoney inline-block'>&#8361;</span>";
}

function actualizaPrints(){
  var objeto;
  actualizaDinero();
  var texto = "Turno: "+_JUGADORAS_[_TURNO_].nombre;
  _CTXGAME_.clearRect(100, 525, 450, 20);
  _CTXGAME_.fillText(texto, 100, 540);
  _CTXGAME_.stroke();
  document.getElementById("propiedadescolocar0").innerHTML = retornoSelect("selectcolocar0", 0);
  document.getElementById("propiedadesvender0").innerHTML = retornoSelect("selectvendercasas0", 0);
  document.getElementById("propiedadvender0").innerHTML = retornoSelect("selectvender0", 0);
  document.getElementById("propiedadescolocar1").innerHTML = retornoSelect("selectcolocar1", 1);
  document.getElementById("propiedadesvender1").innerHTML = retornoSelect("selectvendercasas1", 1);
  document.getElementById("propiedadvender1").innerHTML = retornoSelect("selectvender1", 1);
  /*
  refreshNoCasas("selectcolocar0", "noCasas0-colocar");
  refreshNoCasas("selectvendercasas0", "noCasas0-vender");
  refreshNoCasas("selectvender0", "noCasas0-vender-p");
  refreshNoCasas("selectcolocar1", "noCasas1-colocar");
  refreshNoCasas("selectvendercasas1", "noCasas1-vender");
  refreshNoCasas("selectvender1", "noCasas1-vender-p");*/
}

function startANewGame(){
  if(_AUDIOINICIO_.currentTime > 0 && !_AUDIOINICIO_.paused){var clon = _AUDIOINICIO_.cloneNode(); clon.play();}
  _AUDIOINICIO_.play();
  var Jugadora1 = _JUGADORAS_[0];
  var Jugadora2 = _JUGADORAS_[1];
  _CTXGAME_.clearRect(Jugadora1.x, Jugadora1.y, Jugadora1.w, Jugadora1.h);
  _CTXGAME_.stroke();
  _CTXGAME_.clearRect(Jugadora2.x, Jugadora2.y, Jugadora2.w, Jugadora2.h);
  _CTXGAME_.stroke();
  _TURNO_ = 0;

  _JUGADORAS_[0].nombre = document.getElementById("player1-name").innerHTML;
  _JUGADORAS_[0].x = "600";
  _JUGADORAS_[0].y = "580";
  _JUGADORAS_[0].casilla = "0";
  _JUGADORAS_[0].dinero = 1500;

  _JUGADORAS_[1].nombre = document.getElementById("player2-name").innerHTML;
  _JUGADORAS_[1].x = "600";
  _JUGADORAS_[1].y = "610";
  _JUGADORAS_[1].casilla = "0";
  _JUGADORAS_[1].dinero = 1500;

  //dueño-renta
  //n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0n0

  _BOARD_[0] = {id:"esquina", precio:"200", duenio:"-1", noCasas:"0", nombre:"inicio", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[1] = {id:"cafe", precio:"60", duenio:"-1", noCasas:"0", nombre:"MEDITERRANEAN AVENUE", precioCasa:"50", renta:["2","10","30","90","160","250"]};
  _BOARD_[2] = {id:"arca", precio:"0", duenio:"-1", noCasas:"0", nombre:"arca", precioCasa:"", renta:["0","0","0","0","0","0"]};
  _BOARD_[3] = {id:"cafe", precio:"60", duenio:"-1", noCasas:"0", nombre:"BALTIC AVENUE", precioCasa:"50", renta:["4","20","60","180","320","450"]};
  _BOARD_[4] = {id:"impuestos", precio:"200", duenio:"-1", noCasas:"0", nombre:"impuestos", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[5] = {id:"tren", precio:"200", duenio:"-1", noCasas:"0", nombre:"READING RAILROAD", precioCasa:"0", renta:["25","50","100","200","0","0"], noTrenes:"-1"};
  _BOARD_[6] = {id:"cyan", precio:"100", duenio:"-1", noCasas:"0", nombre:"ORIENTAL AVENUE", precioCasa:"50", renta:["6","30","90","270","400","550"]};
  _BOARD_[7] = {id:"fortuna", precio:"0", duenio:"-1", noCasas:"0", nombre:"fortuna", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[8] = {id:"cyan", precio:"100", duenio:"-1", noCasas:"0", nombre:"VERMONT AVENUE ", precioCasa:"50", renta:["6","30","90","270","400","550"]};
  _BOARD_[9] = {id:"cyan", precio:"120", duenio:"-1", noCasas:"0", nombre:"CONNECTICUT AVENUE", precioCasa:"50", renta:["8","40","100","300","450","600"]};
  _BOARD_[10] = {id:"esquina", precio:"0", duenio:"-1", noCasas:"0", nombre:"carcel", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[11] = {id:"morado", precio:"140", duenio:"-1", noCasas:"0", nombre:"ST. CHARLES PLACE", precioCasa:"100", renta:["10","50","150","450","625","750"]};
  _BOARD_[12] = {id:"servicio", precio:"150", duenio:"-1", noCasas:"0", nombre:"ELECTRIC COMPANY", precioCasa:"0", renta:["s4","s10","0","0","0","0"]};
  _BOARD_[13] = {id:"morado", precio:"140", duenio:"-1", noCasas:"0", nombre:"STATES AVENUE", precioCasa:"100", renta:["10","50","150","450","625","750"]};
  _BOARD_[14] = {id:"morado", precio:"160", duenio:"-1", noCasas:"0", nombre:"VIRGINIA AVENUE", precioCasa:"100", renta:["12","60","180","500","700","900"]};
  _BOARD_[15] = {id:"tren", precio:"200", duenio:"-1", noCasas:"0", nombre:"PENNSYLVANIA RAILROAD", precioCasa:"0", renta:["25","50","100","200","0","0"], noTrenes:"-1"};
  _BOARD_[16] = {id:"naranja", precio:"180", duenio:"-1", noCasas:"0", nombre:"ST. JAMES PLACES", precioCasa:"100", renta:["14","70","200","550","750","950"]};
  _BOARD_[17] = {id:"arca", precio:"0", duenio:"-1", noCasas:"0", nombre:"arca", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[18] = {id:"naranja", precio:"180", duenio:"-1", noCasas:"0", nombre:"TENNESSEE AVENUE", precioCasa:"100", renta:["14","70","200","550","750","950"]};
  _BOARD_[19] = {id:"naranja", precio:"200", duenio:"-1", noCasas:"0", nombre:"NEW YORK AVENUE", precioCasa:"100", renta:["16","80","220","600","800","1000"]};
  _BOARD_[20] = {id:"esquina", precio:"0", duenio:"-1", noCasas:"0", nombre:"parada libre", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[21] = {id:"rojo", precio:"220", duenio:"-1", noCasas:"0", nombre:"KENTUCKY AVENUE", precioCasa:"150", renta:["18","90","250","700","875","1050"]};
  _BOARD_[22] = {id:"fortuna", precio:"0", duenio:"-1", noCasas:"0", nombre:"fortuna", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[23] = {id:"rojo", precio:"220", duenio:"-1", noCasas:"0", nombre:"INDIANA AVENUE", precioCasa:"150", renta:["18","90","250","700","875","1050"]};
  _BOARD_[24] = {id:"rojo", precio:"240", duenio:"-1", noCasas:"0", nombre:"ILLINOIS AVENUE", precioCasa:"150", renta:["20","100","300","750","925","1100"]};
  _BOARD_[25] = {id:"tren", precio:"200", duenio:"-1", noCasas:"0", nombre:"B&O RAILROAD", precioCasa:"0", renta:["25","50","100","200","0","0"], noTrenes:"-1"};
  _BOARD_[26] = {id:"amarillo", precio:"260", duenio:"-1", noCasas:"0", nombre:"ATLANTIC AVENUE", precioCasa:"150", renta:["22","110","330","800","975","1150"]};
  _BOARD_[27] = {id:"amarillo", precio:"260", duenio:"-1", noCasas:"0", nombre:"VENTINOR AVENUE", precioCasa:"150", renta:["22","110","330","800","975","1150"]};
  _BOARD_[28] = {id:"servicio", precio:"150", duenio:"-1", noCasas:"0", nombre:"WATER WORKS", precioCasa:"0", renta:["s4","s10","0","0","0","0"]};
  _BOARD_[29] = {id:"amarillo", precio:"280", duenio:"-1", noCasas:"0", nombre:"MARVIN GARDENS", precioCasa:"150", renta:["24","120","360","850","1025","1200"]};
  _BOARD_[30] = {id:"esquina", precio:"0", duenio:"-1", noCasas:"0", nombre:"ir a carcel", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[31] = {id:"verde", precio:"300", duenio:"-1", noCasas:"0", nombre:"PACIFIC AVENUE", precioCasa:"200", renta:["26","130","390","900","1100","1275"]};
  _BOARD_[32] = {id:"verde", precio:"300", duenio:"-1", noCasas:"0", nombre:"NORTH CAROLINA AVENUE", precioCasa:"200", renta:["26","130","390","900","1100","1275"]};
  _BOARD_[33] = {id:"arca", precio:"0", duenio:"-1", noCasas:"0", nombre:"arca", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[34] = {id:"verde", precio:"320", duenio:"-1", noCasas:"0", nombre:"PENNSYLVANIA AVENUE", precioCasa:"200", renta:["28","150","450","1000","1200","1400"]};
  _BOARD_[35] = {id:"tren", precio:"200", duenio:"-1", noCasas:"0", nombre:"SHORT LINE", precioCasa:"0", renta:["25","50","100","200","0","0"], noTrenes:"-1"};
  _BOARD_[36] = {id:"fortuna", precio:"0", duenio:"-1", noCasas:"0", nombre:"fortuna", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[37] = {id:"rey", precio:"350", duenio:"-1", noCasas:"0", nombre:"PARK PLACE", precioCasa:"200", renta:["35","175","500","1100","1300","1500"]};
  _BOARD_[38] = {id:"impuestos", precio:"100", duenio:"-1", noCasas:"0", nombre:"impuestos", precioCasa:"0", renta:["0","0","0","0","0","0"]};
  _BOARD_[39] = {id:"rey", precio:"400", duenio:"-1", noCasas:"0", nombre:"BOARDWALK", precioCasa:"200", renta:["50","200","600","1400","1700","2000"]};

  _DADO1_.src = "imgs/dado1.png";
  _DADO1_.onload = function(){
    _CTXGAME_.drawImage(_DADO1_, 250, 350, 50, 50);
    _CTXGAME_.stroke();
  }
  _DADO2_.src = "imgs/dado2.png";
  _DADO2_.onload = function(){
    _CTXGAME_.drawImage(_DADO2_, 300, 350, 50, 50);
    _CTXGAME_.stroke();
  }
  _JUGADORAS_[0].img.src = "imgs/jugador0.png";
  _JUGADORAS_[0].img.onload = function(){
    _CTXGAME_.drawImage(_JUGADORAS_[0].img, _JUGADORAS_[0].x, _JUGADORAS_[0].y, _JUGADORAS_[0].w, _JUGADORAS_[0].h);
    _CTXGAME_.stroke();
  }
  _JUGADORAS_[1].img.src = "imgs/jugador1.png";
  _JUGADORAS_[1].img.onload = function(){
    _CTXGAME_.drawImage(_JUGADORAS_[1].img, _JUGADORAS_[1].x, _JUGADORAS_[1].y, _JUGADORAS_[1].w, _JUGADORAS_[1].h);
    _CTXGAME_.stroke();
  }
  if(_PROPIEDADES_[0].length > 0)
    _PROPIEDADES_[0].splice(0, _PROPIEDADES_[0].length);

  if(_PROPIEDADES_[1].length > 0)
    _PROPIEDADES_[1].splice(0, _PROPIEDADES_[1].length);

  _CTXGAME_.font = "15px Arial";
  _VARIOSTURNOS_ = 1;
  habilitaBotones();
  _VARIOSTURNOS_ = 0;
  actualizaPrints();
}

function verificaNoDeTrenes(){

}

function comprarPropiedad(){
  if(_AUDIOCOMPRARPROPIEDAD_.currentTime > 0 && !_AUDIOCOMPRARPROPIEDAD_.paused){var clon = _AUDIOCOMPRARPROPIEDAD_.cloneNode(); clon.play();}
  _AUDIOCOMPRARPROPIEDAD_.play();
  var Jugadora = _JUGADORAS_[_TURNO_];
  var Casilla = _BOARD_[parseInt(Jugadora.casilla)];
  if(Casilla.id == "tren"){
    Casilla.noTrenes = ""+(parseInt(Casilla.noTrenes)+1);
  }
  Casilla.duenio = ""+_TURNO_;
  Jugadora.dinero = ""+(parseInt(Jugadora.dinero)-parseInt(Casilla.precio));
  _PROPIEDADES_[_TURNO_].push(Casilla.nombre);
  verificaNoDeTrenes(); //-------------------------------------------------
  revisaEstado();
  refreshSelect(turno);
}

function venderCasa(turno){
  var e = document.getElementById("selectvendercasas"+turno);
  var estado = buscarIndexEstado(e.options[e.selectedIndex].value);

  _BOARD_[estado].noCasas = ""+(parseInt(_BOARD_[estado].noCasas)-1);
  _JUGADORAS_[turno].dinero = ""+(parseInt(_JUGADORAS_[turno].dinero) + parseInt(_BOARD_[estado].precioCasa));
  actualizaDinero();
  habilitaBotones();
  refreshSelect(turno);
}

function venderHotel(turno){
  var e = document.getElementById("selectvendercasas"+turno);
  var estado = buscarIndexEstado(e.options[e.selectedIndex].value);

  _BOARD_[estado].noCasas = ""+(parseInt(_BOARD_[estado].noCasas)-5);
  _JUGADORAS_[turno].dinero = ""+(parseInt(_JUGADORAS_[turno].dinero) + parseInt(_BOARD_[estado].precioCasa)*5);
  actualizaDinero();
  habilitaBotones();
  refreshSelect(turno);
}

function colocarCasa(turno){
  if(_AUDIOCOLOCARCASA_.currentTime > 0 && !_AUDIOCOLOCARCASA_.paused){var clon = _AUDIOCOLOCARCASA_.cloneNode(); clon.play();}
  _AUDIOCOLOCARCASA_.play();
  var e = document.getElementById("selectcolocar"+turno);
  var estado = buscarIndexEstado(e.options[e.selectedIndex].value);

  _BOARD_[estado].noCasas = ""+(parseInt(_BOARD_[estado].noCasas)+1);
  _JUGADORAS_[turno].dinero = ""+(parseInt(_JUGADORAS_[turno].dinero) - parseInt(_BOARD_[estado].precioCasa));
  actualizaDinero();
  habilitaBotones();
  refreshSelect(turno);
}

function buscarIndexPropiedad(nom, turno){
  for(var n = 0; n < _PROPIEDADES_[turno].length; n++){
    if(_PROPIEDADES_[turno][n] == nom){
      return n;
    }
  }
  return -1;
}

function venderPropiedad(turno){
  var e = document.getElementById("selectvender"+turno);
  var estado = buscarIndexEstado(e.options[e.selectedIndex].value);
  var index = buscarIndexPropiedad(e.options[e.selectedIndex].value, turno);
  _BOARD_[estado].duenio = "-1";
  _PROPIEDADES_[turno].splice(index, 1);
  _JUGADORAS_[turno].dinero = ""+(parseInt(_JUGADORAS_[turno].dinero) + parseInt(_BOARD_[estado].precio));
  actualizaPrints();
  actualizaDinero();
  habilitaBotones();
  if(_PROPIEDADES_[turno].length > 0) refreshSelect(turno);
}

function tirarDados(){
  if(_AUDIODADOS_.currentTime > 0 && !_AUDIODADOS_.paused){var clon = _AUDIODADOS_.cloneNode(); clon.play();}
  _AUDIODADOS_.play();
  var Jugadora = _JUGADORAS_[_TURNO_];
  var dadouno = Math.floor(Math.random() * 6) + 1;
  var dadodos = Math.floor(Math.random() * 6) + 1;
  if(dadouno == dadodos) _VARIOSTURNOS_++;
  else _VARIOSTURNOS_ = 0;
  _DADOS_ = dadouno+dadodos;
  _DADO1_.src = "imgs/dado"+dadouno+".png";
  _DADO1_.onload = function(){
    _CTXGAME_.drawImage(_DADO1_, 250, 350, 50, 50);
    _CTXGAME_.stroke();
  }

  _DADO2_.src = "imgs/dado"+dadodos+".png";
  _DADO2_.onload = function(){
    _CTXGAME_.drawImage(_DADO2_, 300, 350, 50, 50);
    _CTXGAME_.stroke();
  }
  deshabilitaTodo();
  if(Jugadora.idCarcel == "0") moverPieza();
  else if (Jugadora.idCarcel == "1" && dadouno == dadodos) {salirDeLaCarcel(_TURNO_); moverPieza();}
  else{revisaEstado(); refreshSelect(_TURNO_);}
  if(_VARIOSTURNOS_ == 4){irALaCarcel(); cambiaTurno();}
  //else if(_VARIOSTURNOS_ > 0) Jugadora.idCarcel = "0"; //--------------------------------------------------------
  //else cambiaTurno();

}

function isBancarrota(){
  if(parseInt(_JUGADORAS_[0].flagBancarrota) >= 3){
    return 1;
  }
  if(parseInt(_JUGADORAS_[1].flagBancarrota) >= 3){
    return 0;
  }
  return -1;
}

function irALaCarcel(){
  var Jugadora = _JUGADORAS_[_TURNO_];
  Jugadora.idCarcel = "1";
  _CTXGAME_.clearRect(Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
  _CTXGAME_.stroke();
  _JUGADORAS_[_TURNO_].y = "600";
  if(_TURNO_ == 0) _JUGADORAS_[_TURNO_].x = "50";
  else _JUGADORAS_[_TURNO_].x = "25";
  _JUGADORAS_[_TURNO_].casilla = 10;
  Jugadora = _JUGADORAS_[_TURNO_];
  Jugadora.img.src = "imgs/jugador"+_TURNO_+".png";
  Jugadora.img.onload = function(){
    _CTXGAME_.drawImage(Jugadora.img, Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
    _CTXGAME_.stroke();
  }
}

function salirDeLaCarcel(turno){
  var Jugadora = _JUGADORAS_[turno];
  Jugadora.idCarcel = "0";
  habilitaBotones();
  actualizaPrints();
  actualizaDinero();
}

function pagarImpuestos(impuestos){
  alert("Pagaste "+impuestos+" de impuestos.");
  _JUGADORAS_[_TURNO_].dinero = (parseInt(_JUGADORAS_[_TURNO_].dinero) - impuestos);
}

function sacarFortuna(){
  var Jugadora = _JUGADORAS_[_TURNO_];
  var JugadoraEnemiga = _JUGADORAS_[flipBit(_TURNO_)];
  var randnum = Math.floor(Math.random() * 15);
  var Fortuna = _FORTUNA_[randnum];
  alert(Fortuna.texto);
  if(Fortuna.op == "+"){ //Suma dinero
    Jugadora.dinero = ""+(parseInt(Jugadora.dinero)+parseInt(Fortuna.num));
  }
  else if(Fortuna.op == "++"){ //Suma dinero quitando a la jugadora contraria
    Jugadora.dinero = ""+(parseInt(Jugadora.dinero)+parseInt(Fortuna.num));
    JugadoraEnemiga.dinero = ""+(parseInt(JugadoraEnemiga.dinero)-parseInt(Fortuna.num));
  }
  else if(Fortuna.op == "+++"){ //Se mueve al inicio y suma 200
    _CTXGAME_.clearRect(Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
    _CTXGAME_.stroke();
    _JUGADORAS_[_TURNO_].x = "600";
    if(_TURNO_ == 0) _JUGADORAS_[_TURNO_].y = "580";
    else _JUGADORAS_[_TURNO_].y = "610";
    Jugadora = _JUGADORAS_[_TURNO_];
    Jugadora.img.src = "imgs/jugador"+_TURNO_+".png";
    Jugadora.img.onload = function(){
      _CTXGAME_.drawImage(Jugadora.img, Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
      _CTXGAME_.stroke();
    }
    Jugadora.dinero = ""+(parseInt(Jugadora.dinero)+parseInt(Fortuna.num));
  }
  else if(Fortuna.op == "-"){ //Resta dinero
    Jugadora.dinero = ""+(parseInt(Jugadora.dinero)-parseInt(Fortuna.num));
  }
  else if(Fortuna.op == "++++"){ //
    Jugadora.idSalir = ""+(parseInt(Jugadora.idSalir) + 1);
  }
  else if(Fortuna.op == "--"){ //Directo a la cárcel
    irALaCarcel();
  }
}

function sacarArca(){
  var Jugadora = _JUGADORAS_[_TURNO_];
  var JugadoraEnemiga = _JUGADORAS_[flipBit(_TURNO_)];
  var randnum = Math.floor(Math.random() * 15);
  var Arca = _ARCA_[randnum];
  alert(Arca.texto);
  if(Arca.op == "+"){
    Jugadora.dinero = ""+(parseInt(Jugadora.dinero)+parseInt(Arca.num));
  }
  else if(Arca.op == "++"){
    Jugadora.dinero = ""+(parseInt(Jugadora.dinero)+parseInt(Arca.num));
    JugadoraEnemiga.dinero = ""+(parseInt(JugadoraEnemiga.dinero)-parseInt(Arca.num));
  }
  else if(Arca.op == "+++"){
    _CTXGAME_.clearRect(Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
    _CTXGAME_.stroke();
    _JUGADORAS_[_TURNO_].x = "600";
    if(_TURNO_ == 0) _JUGADORAS_[_TURNO_].y = "580";
    else _JUGADORAS_[_TURNO_].y = "610";
    Jugadora = _JUGADORAS_[_TURNO_];
    Jugadora.img.src = "imgs/jugador"+_TURNO_+".png";
    Jugadora.img.onload = function(){
      _CTXGAME_.drawImage(Jugadora.img, Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
      _CTXGAME_.stroke();
    }
    Jugadora.dinero = ""+(parseInt(Jugadora.dinero)+parseInt(Arca.num));
  }
  else if(Arca.op == "-"){
    Jugadora.dinero = ""+(parseInt(Jugadora.dinero)-parseInt(Arca.num));
  }
  else if(Arca.op == "++++"){ //
    Jugadora.idSalir = ""+(parseInt(Jugadora.idSalir) + 1);
  }
  else if(Arca.op == "--"){ //Directo a la cárcel
    irALaCarcel();
  }
}

function acabarJuego(){

}

function revisaEstado(){
  var gameOver = isBancarrota();
  if(gameOver == 0){
    alert("¡Ganó "+_JUGADORAS_[0].nombre+"!");
    acabarJuego();
  }
  else if(gameOver == 1){
    alert("¡Ganó "+_JUGADORAS_[1].nombre+"!");
    acabarJuego();
  }
  else{
    var Jugadora = _JUGADORAS_[_TURNO_];
    var JugadoraEnemiga = _JUGADORAS_[flipBit(_TURNO_)];
    var Casilla = _BOARD_[parseInt(Jugadora.casilla)];

    if(Jugadora.dinero < 0){
      Jugadora.flagBancarrota = ""+(parseInt(Jugadora.flagBancarrota) + 1);
    }
    else{
      Jugadora.flagBancarrota = "0";
    }

    if(Casilla.id == "fortuna")
      sacarFortuna();
    else if(Casilla.id == "arca")
      sacarArca();
    else if(Casilla.id == "impuestos")
      pagarImpuestos(parseInt(Casilla.precio));
    else if(Casilla.nombre == "ir a carcel")
      irALaCarcel();
    else if(Casilla.id != "arca" && Casilla.id != "esquina" && Casilla.id != "fortuna" && Casilla.id != "impuestos" && Casilla.duenio == "-1")
      document.getElementById("comprarpropiedad"+_TURNO_).value = "Comprar propiedad (-"+Casilla.precio+")";
    else if(Casilla.duenio == flipBit(_TURNO_).toString()){
      if(Casilla.id == "servicio"){
        if(Casilla.renta[parseInt(Casilla.noCasas)] == "s4"){
          Jugadora.dinero = ""+(parseInt(Jugadora.dinero)-(_DADOS_*4));
          JugadoraEnemiga.dinero = ""+(parseInt(JugadoraEnemiga.dinero)+(_DADOS_*4));
          alert("¡Caíste en una propiedad enemiga! Pagaste "+(_DADOS_*4)+" de renta.");
        }
        else{
          Jugadora.dinero = ""+(parseInt(Jugadora.dinero)-(_DADOS_*10));
          JugadoraEnemiga.dinero = ""+(parseInt(JugadoraEnemiga.dinero)+(_DADOS_*10));
          alert("¡Caíste en una propiedad enemiga! Pagaste "+(_DADOS_*10)+" de renta.");
        }
      }
      else if(Casilla.id == "tren"){
        Jugadora.dinero = ""+(parseInt(Jugadora.dinero)-parseInt(Casilla.renta[parseInt(Casilla.noTrenes)]));
        JugadoraEnemiga.dinero = ""+(parseInt(JugadoraEnemiga.dinero)+parseInt(Casilla.renta[parseInt(Casilla.noTrenes)]));
        alert("¡Caíste en una propiedad enemiga! Pagaste "+Casilla.renta[parseInt(Casilla.noTrenes)]+" de renta.");
      }
      else{
        Jugadora.dinero = ""+(parseInt(Jugadora.dinero)-parseInt(Casilla.renta[parseInt(Casilla.noCasas)]));
        JugadoraEnemiga.dinero = ""+(parseInt(JugadoraEnemiga.dinero)+parseInt(Casilla.renta[parseInt(Casilla.noCasas)]));
        alert("¡Caíste en una propiedad enemiga! Pagaste "+Casilla.renta[parseInt(Casilla.noCasas)]+" de renta.");
      }
    }
    actualizaPrints();
    if(_PROPIEDADES_[_TURNO_].length > 0) refreshSelect(_TURNO_);
    habilitaBotones();
    if(isCambioTurno()){
      if(_PROPIEDADES_[_TURNO_].length > 0) refreshSelect(_TURNO_);
      cambiaTurno();
      _VARIOSTURNOS_ = 1;
      actualizaPrints();
      if(_PROPIEDADES_[_TURNO_].length > 0) refreshSelect(_TURNO_);
      habilitaBotones();
      if(_VSIAFLAG_ == 1 && _TURNO_ == 1){
        agenteJugadora();
      }
    }
  }
}
//-------------------------------------------------------------------------------------------------------------------------------
function moverPieza(){
  var Jugadora = _JUGADORAS_[_TURNO_];
  var cas = parseInt(Jugadora.casilla);
  var loop;
  var loop2;
  var aux_x = parseInt(Jugadora.x);
  var aux_y = parseInt(Jugadora.y);
  var corte = 0;
  var iteracion = 10;
  var a = 53;
  loop2 = setInterval(function(){
    if(corte == _DADOS_){
      revisaEstado();

      clearInterval(loop2);
      if(_VSIAFLAG_ == 1 && _TURNO_ == 1){
        heuristicaDecide();
      }
    }
  }, 500);
  loop = setInterval(function(){
    if(_AUDIOMOVER_.currentTime > 0 && !_AUDIOMOVER_.paused){var clon = _AUDIOMOVER_.cloneNode(); clon.play();}
    _AUDIOMOVER_.play();
    _CTXGAME_.clearRect(Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
    Jugadora.img.src = "imgs/jugador"+_TURNO_+".png";
    if(cas == 0){if(_TURNO_ == 0){Jugadora.x = "520"; Jugadora.y = "580";} else{Jugadora.x = "520"; Jugadora.y = "610";} cas++;}
    else if(cas == 1){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*1)); Jugadora.y = "580";} else{Jugadora.x = ""+(520-(a*1)); Jugadora.y = "610";} cas++;}
    else if(cas == 2){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*2)); Jugadora.y = "580";} else{Jugadora.x = ""+(520-(a*2)); Jugadora.y = "610";} cas++;}
    else if(cas == 3){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*3)); Jugadora.y = "580";} else{Jugadora.x = ""+(520-(a*3)); Jugadora.y = "610";} cas++;}
    else if(cas == 4){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*4)); Jugadora.y = "580";} else{Jugadora.x = ""+(520-(a*4)); Jugadora.y = "610";} cas++;}
    else if(cas == 5){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*5)); Jugadora.y = "580";} else{Jugadora.x = ""+(520-(a*5)); Jugadora.y = "610";} cas++;}
    else if(cas == 6){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*6)); Jugadora.y = "580";} else{Jugadora.x = ""+(520-(a*6)); Jugadora.y = "610";} cas++;}
    else if(cas == 7){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*7)); Jugadora.y = "580";} else{Jugadora.x = ""+(520-(a*7)); Jugadora.y = "610";} cas++;}
    else if(cas == 8){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*8)); Jugadora.y = "580";} else{Jugadora.x = ""+(520-(a*8)); Jugadora.y = "610";} cas++;}
    else if(cas == 9){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = "620";} else{Jugadora.x = "0"; Jugadora.y = "600";} cas++;}
    else if(cas == 10){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = ""+(575-(a*1));} else{Jugadora.x = "10"; Jugadora.y = ""+(575-(a*1));} cas++;}
    else if(cas == 11){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = ""+(575-(a*2));} else{Jugadora.x = "10"; Jugadora.y = ""+(575-(a*2));} cas++;}
    else if(cas == 12){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = ""+(575-(a*3));} else{Jugadora.x = "10"; Jugadora.y = ""+(575-(a*3));} cas++;}
    else if(cas == 13){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = ""+(575-(a*4));} else{Jugadora.x = "10"; Jugadora.y = ""+(575-(a*4));} cas++;}
    else if(cas == 14){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = ""+(575-(a*5));} else{Jugadora.x = "10"; Jugadora.y = ""+(575-(a*5));} cas++;}
    else if(cas == 15){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = ""+(575-(a*6));} else{Jugadora.x = "10"; Jugadora.y = ""+(575-(a*6));} cas++;}
    else if(cas == 16){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = ""+(575-(a*7));} else{Jugadora.x = "10"; Jugadora.y = ""+(575-(a*7));} cas++;}
    else if(cas == 17){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = ""+(575-(a*8));} else{Jugadora.x = "10"; Jugadora.y = ""+(575-(a*8));} cas++;}
    else if(cas == 18){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = ""+(575-(a*9));} else{Jugadora.x = "10"; Jugadora.y = ""+(575-(a*9));} cas++;}
    else if(cas == 19){if(_TURNO_ == 0){Jugadora.x = "40"; Jugadora.y = "40";} else{Jugadora.x = "10"; Jugadora.y = "10";} cas++;}
    else if(cas == 20){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*8)); Jugadora.y = "40";} else{Jugadora.x = ""+(520-(a*8)); Jugadora.y = "10";} cas++;}
    else if(cas == 21){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*7)); Jugadora.y = "40";} else{Jugadora.x = ""+(520-(a*7)); Jugadora.y = "10";} cas++;}
    else if(cas == 22){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*6)); Jugadora.y = "40";} else{Jugadora.x = ""+(520-(a*6)); Jugadora.y = "10";} cas++;}
    else if(cas == 23){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*5)); Jugadora.y = "40";} else{Jugadora.x = ""+(520-(a*5)); Jugadora.y = "10";} cas++;}
    else if(cas == 24){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*4)); Jugadora.y = "40";} else{Jugadora.x = ""+(520-(a*4)); Jugadora.y = "10";} cas++;}
    else if(cas == 25){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*3)); Jugadora.y = "40";} else{Jugadora.x = ""+(520-(a*3)); Jugadora.y = "10";} cas++;}
    else if(cas == 26){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*2)); Jugadora.y = "40";} else{Jugadora.x = ""+(520-(a*2)); Jugadora.y = "10";} cas++;}
    else if(cas == 27){if(_TURNO_ == 0){Jugadora.x = ""+(520-(a*1)); Jugadora.y = "40";} else{Jugadora.x = ""+(520-(a*1)); Jugadora.y = "10";} cas++;}
    else if(cas == 28){if(_TURNO_ == 0){Jugadora.x = "520"; Jugadora.y = "40";} else{Jugadora.x = "520"; Jugadora.y = "10";} cas++;}
    else if(cas == 29){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = "40";} else{Jugadora.x = "615"; Jugadora.y = "10";} cas++;}
    else if(cas == 30){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = ""+(575-(a*9));} else{Jugadora.x = "615"; Jugadora.y = ""+(575-(a*9));} cas++;}
    else if(cas == 31){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = ""+(575-(a*8));} else{Jugadora.x = "615"; Jugadora.y = ""+(575-(a*8));} cas++;}
    else if(cas == 32){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = ""+(575-(a*7));} else{Jugadora.x = "615"; Jugadora.y = ""+(575-(a*7));} cas++;}
    else if(cas == 33){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = ""+(575-(a*6));} else{Jugadora.x = "615"; Jugadora.y = ""+(575-(a*6));} cas++;}
    else if(cas == 34){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = ""+(575-(a*5));} else{Jugadora.x = "615"; Jugadora.y = ""+(575-(a*5));} cas++;}
    else if(cas == 35){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = ""+(575-(a*4));} else{Jugadora.x = "615"; Jugadora.y = ""+(575-(a*4));} cas++;}
    else if(cas == 36){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = ""+(575-(a*3));} else{Jugadora.x = "615"; Jugadora.y = ""+(575-(a*3));} cas++;}
    else if(cas == 37){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = ""+(575-(a*2));} else{Jugadora.x = "615"; Jugadora.y = ""+(575-(a*2));} cas++;}
    else if(cas == 38){if(_TURNO_ == 0){Jugadora.x = "575"; Jugadora.y = ""+(575-(a*1));} else{Jugadora.x = "615"; Jugadora.y = ""+(575-(a*1));} cas++;}
    else if(cas == 39){if(_TURNO_ == 0){Jugadora.x = "600"; Jugadora.y = "580";} else{Jugadora.x = "600"; Jugadora.y = "610";} cas++; cas = 0; Jugadora.dinero = ""+(parseInt(Jugadora.dinero)+200); _AUDIOESQUINAINICIO_.play();}

    /*else{
      if(_TURNO_ == 0){
        Jugadora.img.onload = function(){
          Jugadora.x = "600";
          Jugadora.y = "580";
          aux_x = parseInt(Jugadora.x);
          aux_y = parseInt(Jugadora.y);
          _CTXGAME_.drawImage(Jugadora.img, Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
          _CTXGAME_.stroke();
        }
      }
      else{
        Jugadora.img.onload = function(){
          Jugadora.x = "600";
          Jugadora.y = "610";
          aux_x = parseInt(Jugadora.x);
          aux_y = parseInt(Jugadora.y);
          Jugadora.y = aux_y.toString();
          _CTXGAME_.drawImage(Jugadora.img, Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
          _CTXGAME_.stroke();
        }
      }
      cas = 0;
      Jugadora.dinero = ""+(parseInt(Jugadora.dinero)+200);
    }*/
    Jugadora.img.onload = function(){
      _CTXGAME_.drawImage(Jugadora.img, Jugadora.x, Jugadora.y, Jugadora.w, Jugadora.h);
      _CTXGAME_.stroke();
    }
    corte++;
    Jugadora.casilla = cas.toString();
    if(corte == _DADOS_) clearInterval(loop);
  }, 500);
}
//-------------------------------------------------------------------------------------------------------------------------------
function displayPlayer(turno, val){
  document.getElementById("tirardados"+turno).style.display = val;
  document.getElementById("comprarpropiedad"+turno).style.display = val;
  document.getElementById("pasar"+turno).style.display = val;
  document.getElementById("colocarcasa"+turno).style.display = val;
  document.getElementById("colocarhotel"+turno).style.display = val;
  document.getElementById("vendercasa"+turno).style.display = val;
  document.getElementById("venderhotel"+turno).style.display = val;
  document.getElementById("venderpropiedad"+turno).style.display = val;
  document.getElementById("propiedadescolocar"+turno).style.display = val;
  document.getElementById("noCasas"+turno+"-colocar").style.display = val;
  document.getElementById("propiedadesvender"+turno).style.display = val;
  document.getElementById("noCasas"+turno+"-vender").style.display = val;
  document.getElementById("propiedadvender"+turno).style.display = val;
  document.getElementById("noCasas"+turno+"-vender-p").style.display = val;
  document.getElementById("salircarcel"+turno).style.display = val;
  document.getElementById("imgcolocar"+turno).style.display = val;
  document.getElementById("imgvender"+turno).style.display = val;
  document.getElementById("imgvender-p"+turno).style.display = val;
}

function startGameOffline(){
  _VSIAFLAG_ = 1;
  document.getElementById("player1-name").innerHTML = document.getElementById("nick").value;
  document.getElementById("player2-name").innerHTML = "Inteligencia Artificial";
  startANewGame();
  displayPlayer(0, "inline");
  displayPlayer(1, "none");
}

function startGameOnline(){
  _VSIAFLAG_ = 0;
  document.getElementById("player1-name").innerHTML = document.getElementById("nick").value;
  startANewGame();
  displayPlayer(0, "inline");
  displayPlayer(1, "inline");
}

deshabilitaTodo();
