

var top = ["_","|","_","|","_"];
var middle = ["_","|","_","|","_"];
var bottom = [" ","|"," ","|"," "];

function Game() {
  this.board = new Board()

  this.player1= new Player('X',this.board);
  this.player2= new Player('O',this.board);

  this.board.build();
}

function Board() {
  this.type = 'text';
  this.allSquares = [];
}

Board.prototype.build = function() {
  var maxSquares = 9;

  for(var i=0; i<maxSquares; i++) {
    this.allSquares.push(new Square());
  }
}

function Square() {
  this.mark = null;
}

function Player(symbol, board) {
  this.symbol = symbol;
  this.board = board;

  console.log("Player",symbol,"is playing on:",board)
}

Player.prototype.move = function(position) {
  // tell the board where it's moving

}


// instantiate a new tic-tac-toe game below
var game1 = new Game();
