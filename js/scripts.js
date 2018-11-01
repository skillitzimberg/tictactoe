function Game() {
  this.board = new Board()

  this.player1= new Player('X',this.board);
  this.player2= new Player('O',this.board);
  this.active = this.player1;

  this.board.build();
}

Game.prototype.turnHandler = function(position) {
  console.log(this.active.symbol, 'is in play. wants to move to: ',position)


  if (this.active == this.player1) {

    if (this.board.makeMove(this.active, position)){

      this.active = this.player2;
      return
    }
  }

  if (this.active == this.player2) {
    if (this.board.makeMove(this.active, position)){
      this.active = this.player1;

      return
    }
  }
}


function Square() {
  this.mark;
}

function Board() {
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
  if (!this.gameOver) {
    if (!this.allSquares[toWhere].mark) {
      this.allSquares[toWhere].mark = activePlayer.symbol;

      this.gameWon(activePlayer);
      this.guiDraw(activePlayer.symbol,toWhere)

      return true
    }
    this.messenger({msg: 'invalid_move', board: this.allSquares, player: activePlayer});
    return false
  }
  this.messenger({msg: 'game_end', board: this.allSquares, player: activePlayer});
}

Board.prototype.gameWon = function(activePlayer) {
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

      this.gameOver = true;
      this.messenger({msg: 'game_win', board: combo, player: activePlayer});
      // don't know why below was added—commenting out instead
      // return this.allSquares[combo[0]].mark
    }}).bind(this));
}

Board.prototype.guiDraw = function(symbol,toWhere) {
  $("#"+toWhere).text(symbol)

  if (symbol === 'X') {
    $("#player1, #player2").removeClass();
    $("#player2").addClass("active");
  }

  if (symbol === 'O') {
    $("#player1, #player2").removeClass();
    $("#player1").addClass("active");
  }

}

Board.prototype.messenger = function(msg) {
  console.log(msg)
}

// Board.prototype.redraw = function() {
//   // text-based game
//   var ticTacToe = ["☐","☐","☐","☐","☐","☐","☐","☐","☐"];
//
//   for(var i=0; i<this.allSquares.length; i++) {
//     if (this.allSquares[i].mark) {
//       ticTacToe[i]=this.allSquares[i].mark;
//     }
//
//   }
//   var toeBoard = ticTacToe[0]+ticTacToe[1]+ticTacToe[2]+"\n"+ticTacToe[3]+ticTacToe[4]+ticTacToe[5]+"\n"+ticTacToe[6]+ticTacToe[7]+ticTacToe[8];
//   console.log(toeBoard);
// }

function Player(symbol, board) {
  this.symbol = symbol;
  this.board = board;

}

Player.prototype.move = function(position) {
  return this.board.makeMove(this, position)

}

$(document).ready(function() {
  // instantiate a new tic-tac-toe game below
  var game1 = new Game();
  $("table#board").on("click", "td", function() {
    game1.turnHandler(this.id);

    // game1.player1.move(this.id)
    // console.log(this.id);
  })
})
