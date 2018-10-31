



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
  this.mark;
}

Board.prototype.makeMove = function(activePlayer,toWhere) {
  this.activePlayer = activePlayer;
  this.toWhere = toWhere;



  this.allSquares[this.toWhere].mark = this.activePlayer.symbol;

  // draw text-based tic-tac-toe
  this.redraw();

}

Board.prototype.redraw = function() {
  // strictly for text-based game
  var ticTacToe = ["☐","☐","☐","☐","☐","☐","☐","☐","☐"];


  for(var i=0; i<this.allSquares.length; i++) {
    if (this.allSquares[i].mark) {
      ticTacToe[i]=this.allSquares[i].mark
    }

  }

  var toeBoard = ticTacToe[0]+ticTacToe[1]+ticTacToe[2]+"\n"+ticTacToe[3]+ticTacToe[4]+ticTacToe[5]+"\n"+ticTacToe[6]+ticTacToe[7]+ticTacToe[8]

  console.log(toeBoard)


}

function Player(symbol, board) {
  this.symbol = symbol;
  this.board = board;

}

Player.prototype.move = function(position) {
  this.board.makeMove(this,position)
  // tell the board where it's moving

}


// instantiate a new tic-tac-toe game below
var game1 = new Game();


game1.player2.move(3)
game1.player1.move(0)

game1.player2.move(1)
game1.player1.move(8)

game1.player2.move(2)
game1.player1.move(6)



// console.log(game1.board.allSquares)
