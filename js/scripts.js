function Game() {
  this.board = new Board()

  this.player1= new Player('X',this.board);
  this.player2= new Player('O',this.board);
  this.active = this.player1;

  this.board.build();
}

Game.prototype.computer = function() {
  return Math.floor(Math.random() * Math.floor(9));
}

Game.prototype.turnHandler = function(position) {


  if (this.active == this.player1) {
    // IF PLAYER1 HAS PLAYED, PLAYER2 MOVES
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
  this.movesMade = 0;
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

      this.movesMade++;

      this.guiDraw(activePlayer.symbol,toWhere)

      // this.redraw(); text-based UI rendering
      this.winChecker(activePlayer);

      if  (this.movesMade === 9 && !this.gameOver) {this.messenger({type: 'draw'});}
      return true
    }
    this.messenger({type: 'invalid_move', board: this.allSquares, player: activePlayer});
    return false
  }
  this.messenger({type: 'game_end', board: this.allSquares, player: activePlayer});
}

Board.prototype.winChecker = function(activePlayer) {
  var testArray;
  var winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],  // horiz
    [0,3,6],[1,4,7],[2,5,8],  // verts
    [0,4,8],[2,4,6]           // diags
  ];

  winningCombos.forEach((function(combo, i) {
    var first = this.allSquares[combo[0]].mark;
    var second = this.allSquares[combo[1]].mark;
    var third = this.allSquares[combo[2]].mark;

    if ((first  && second  && third) && (first === second && second === third && first === third)) {
      this.gameOver = true;
      this.messenger({type: 'game_win', board: combo, player: activePlayer});

      // don't know why below was added—commenting out instead
      // return this.allSquares[combo[0]].mark
    }
  }).bind(this));

}

Board.prototype.guiDraw = function(symbol,toWhere) {
  $("#"+toWhere).text(symbol)

  if (symbol === 'X') {
    $("#p1, #p2").removeClass();
    $("#p2").addClass("active");
  }

  if (symbol === 'O') {
    $("#p1, #p2").removeClass();
    $("#p1").addClass("active");
  }

}

Board.prototype.resetBoard = function() {

  this.allSquares = [];
  this.gameOver = false;
  this.movesMade = 0;

  this.build();

  $("td").empty();
  $(".game-status").hide();
}

Board.prototype.enableButton = function() {
  $(".game-status").show();

  $("#restart").click((function() {
    this.resetBoard()
  }).bind(this))


}

Board.prototype.messenger = function(msg) {
  console.log(msg.type);

  var id;

  if (msg.type === "game_win") {
    msg.player.symbol === "X" ? (id = "p1") : (id = "p2");
    msg.player.score++;

    var output = msg.player.score;
    $("#"+id+" span").text(output);

    this.enableButton();
  }

  else if (msg.type === "draw") {
    this.enableButton();

  }
  return
}

Board.prototype.redraw = function() {
  // text-based game
  var ticTacToe = ["☐","☐","☐","☐","☐","☐","☐","☐","☐"];

  for(var i=0; i<this.allSquares.length; i++) {
    if (this.allSquares[i].mark) {
      ticTacToe[i]=this.allSquares[i].mark;
    }

  }
  var toeBoard = ticTacToe[0]+ticTacToe[1]+ticTacToe[2]+"\n"+ticTacToe[3]+ticTacToe[4]+ticTacToe[5]+"\n"+ticTacToe[6]+ticTacToe[7]+ticTacToe[8];
  console.log(toeBoard);
}

function Player(symbol, board) {
  this.symbol = symbol;
  this.board = board;
  this.score = 0;

}

$(document).ready(function() {
  // instantiate a new tic-tac-toe game below
  var game1 = new Game();

  $("table#board").on("click", "td", function() {
    game1.turnHandler(this.id);

    // console.log('computers')

    console.log(game1.active)

    if (game1.active.symbol==="O") {
      var guess = Math.floor(Math.random() * Math.floor(9));
      $("td#"+guess).click()

      // console.log('computer',Math.floor(Math.random() * Math.floor(9)))
    }

  })
})
