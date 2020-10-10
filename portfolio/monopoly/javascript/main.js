var _AUDIOESQUINAINICIO_ = new Audio("sounds/a7_cartas.mp3");
var _AUDIOCOLOCARCASA_ = new Audio("sounds/a6_monedas.mp3");
var _AUDIOINICIO_ = new Audio("sounds/a1_inicio.mp3");
var _AUDIOMOVER_ = new Audio("sounds/a2_mover.mp3");
var _AUDIOCOMPRARPROPIEDAD_ = new Audio("sounds/a4_monedas.mp3");
var _AUDIODADOS_ = new Audio("sounds/a5_dados.mp3");
var _VSIAFLAG_ = 0;
var _FORTUNA_ = new Array();
_FORTUNA_.push({texto:"Estreno de la gran ópera, recibiste $50 de la enemiga.", op:"++", num:"50"});
_FORTUNA_.push({texto:"Ingreso por tu seguro de vida, recibiste $100 del banco.", op:"+", num:"100"});
_FORTUNA_.push({texto:"Por la venta de tus acciones recibiste $45 del banco.", op:"+", num:"45"});
_FORTUNA_.push({texto:"Pagaste el recibo escolar, se te descontaron $150.", op:"-", num:"150"});
_FORTUNA_.push({texto:"Pagaste al hospital $100.", op:"-", num:"100"});
_FORTUNA_.push({texto:"Has ganado el segundo premio de un concurso, cobraste $10.", op:"+", num:"10"});
_FORTUNA_.push({texto:"Avanzaste hasta la casilla de salida y cobraste $200.", op:"+++", num:"200"});
_FORTUNA_.push({texto:"Quedas libre de la cárcel gratis.", op:"++++", num:"no_carcel"});
_FORTUNA_.push({texto:"Factura médica, pagaste $150.", op:"-", num:"150"});
_FORTUNA_.push({texto:"Pagaste por servicios, se te descontaron $25.", op:"-", num:"25"});
_FORTUNA_.push({texto:"Hacienda te devuelvió $20.", op:"+", num:"20"});
_FORTUNA_.push({texto:"Ve a la cárcel directamente.", op:"--", num:"go_carcel"});
_FORTUNA_.push({texto:"Ingreso por el fondo de navidades, cobraste $100.", op:"+", num:"100"});
_FORTUNA_.push({texto:"Heradeste $100.", op:"+", num:"100"});
_FORTUNA_.push({texto:"Error del banco a tu favor, cobraste $200.", op:"+", num:"200"});
var _ARCA_ = new Array();
_ARCA_.push({texto:"Heredaste $100.", op:"+", num:"100"});
_ARCA_.push({texto:"Pagaste colegiaturas por $50.", op:"-", num:"50"});
_ARCA_.push({texto:"¡Es tu cumpleaños! Recibiste $10 de la enemiga.", op:"++", num:"10"});
_ARCA_.push({texto:"Recibiste $25 por consultoría.", op:"+", num:"25"});
_ARCA_.push({texto:"Ve a la cárcel directamente.", op:"--", num:"go_carcel"});
_ARCA_.push({texto:"Pagaste cuenta de hospital por $100.", op:"-", num:"100"});
_ARCA_.push({texto:"Ganaste el segundo premio en un concurso de belleza. Cobraste $10.", op:"+", num:"10"});
_ARCA_.push({texto:"Por venta de acciones, recibiste $50.", op:"+", num:"50"});
_ARCA_.push({texto:"Devolución de impuestos. Cobraste $20.", op:"+", num:"20"});
_ARCA_.push({texto:"Vencimiento de fondo vacacional. Recibiste $100.", op:"+", num:"100"});
_ARCA_.push({texto:"Vencimiento de seguro de vida. Cobraste $100.", op:"+", num:"100"});
_ARCA_.push({texto:"Honorarios médicos. Pagaste $50.", op:"+", num:"50"});
_ARCA_.push({texto:"Error bancario a tu favor. Cobraste $200.", op:"+", num:"200"});
_ARCA_.push({texto:"Avanzaste hasta la casilla de salida y cobraste $200.", op:"+++", num:"200"});
_ARCA_.push({texto:"Quedas libre de la cárcel gratis.", op:"++++", num:"no_carcel"});
var _CANVGAME_ = document.getElementById("game");
var _CTXGAME_ = _CANVGAME_.getContext("2d");
var _GAMESTATUS_ = document.getElementById("game-state");
_GAMESTATUS_.style.display = "none";
var _BUSCANDORIVAL_;
var _DADO1_ = new Image;
var _DADO2_ = new Image;
var _JUGADORAS_ = new Array();
_JUGADORAS_.push({x:"600", y:"580", w:"30", h:"30", dinero:"1500", img:{}, casilla:"0", nombre:"JUGADOR 1", idCarcel:"0", idSalir:"0", flagBancarrota:"0"});
_JUGADORAS_.push({x:"600", y:"610", w:"30", h:"25", dinero:"1500", img:{}, casilla:"0", nombre:"JUGADOR 2", idCarcel:"0", idSalir:"0", flagBancarrota:"0"});
_JUGADORAS_[0].img = new Image;
_JUGADORAS_[1].img = new Image;

function online(){
  _GAMESTATUS_.innerHTML = "Buscando rival";
  clearInterval(_BUSCANDORIVAL_);
  var text = "Buscado rival";
  var flagpuntitos = 0;
  _BUSCANDORIVAL_ = setInterval(function(){
    text = "Buscando rival";
    _GAMESTATUS_.style.display = "block";
    if(flagpuntitos == 0){flagpuntitos++;}
    else if(flagpuntitos == 1){text += "."; flagpuntitos++;}
    else if(flagpuntitos == 2){text += ".."; flagpuntitos++;}
    else if(flagpuntitos == 3){text += "..."; flagpuntitos = 0;}
    _GAMESTATUS_.innerHTML = text;
  }, 500);
  startGameOnline();
}

function offline(){
  clearInterval(_BUSCANDORIVAL_);
  _GAMESTATUS_.style.display = "block";
  _GAMESTATUS_.innerHTML = "Juego en curso. Rival: Inteligencia artificial.";
  startGameOffline();
}
