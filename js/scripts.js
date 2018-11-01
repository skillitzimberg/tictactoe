function Game() {
  this.board = new Board()

  this.player1= new Player('X',this.board);
  this.player2= new Player('O',this.board);
  this.active = this.player1;

  this.board.build(); // a method of BOARD used to create an array of SQUAREs - positions on board
}

Game.prototype.turnHandler = function(position) {
  console.log(this.active.symbol, 'is in play. wants to move to: ',position)


  // This handles moves from the UI

  if (this.active == this.player1) {

    if (this.board.makeMove(this.active, position)){
      $("#"+position).text(this.active.symbol)

      this.active = this.player2;
      return
    }
  }

  if (this.active == this.player2) {
    if (this.board.makeMove(this.active, position)){
      $("#"+position).text(this.active.symbol)
      
      this.active = this.player1;

      return
    }

  }

  console.log('move made', this.active.symbol," is now active")
  // call makeMove
  // if make move == true
  // activeplayer not current



  // console.log(position)

}

function Square() {
  this.mark;
}

function Board() {
  this.type = 'text';
  this.allSquares = [];
  this.gameOver = false; // reports if Sqaures have been marked play player
}

Board.prototype.build = function() {
  var maxSquares = 9;

  for(var i=0; i<maxSquares; i++) {
    this.allSquares.push(new Square());
  }
}

Board.prototype.makeMove = function(activePlayer, toWhere) {
  this.activePlayer = activePlayer;
  this.toWhere = toWhere;

  if (!this.gameOver) {
    if (!this.allSquares[this.toWhere].mark) {
      this.allSquares[this.toWhere].mark = this.activePlayer.symbol;

      this.redraw();

      this.gameWon();

      return true
    }
    return false
  }
  console.log("GAME OVER!");
}

Board.prototype.gameWon = function() {
  var winningCombos = [
    [0,1,2],[3,4,5],[6,7,8], // horiz
    [0,3,6],[1,4,7],[2,5,8], // verts
    [0,4,8],[2,4,6] // diags
  ];

  winningCombos.forEach((function(combo, i) {
    var first = this.allSquares[combo[0]].mark;
    var second = this.allSquares[combo[1]].mark;
    var third = this.allSquares[combo[2]].mark;

    if ((first  && second  && third) && (first === second && second === third && first === third)) {

      console.log("match found! player ", this.allSquares[combo[0]].mark, "won!")

      this.gameOver = true;
      return this.allSquares[combo[0]].mark

    }}).bind(this));
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

  return this.board.makeMove(this, position)

  // console.log( this.board.makeMove(this,position) )


}

// instantiate a new tic-tac-toe game below
var game1 = new Game();




// game1.player1.move(0)


$(document).ready(function() {
  $("table#board").on("click", "td", function() {
    game1.turnHandler(this.id);

    // game1.player1.move(this.id)
    // console.log(this.id);
  })
})
