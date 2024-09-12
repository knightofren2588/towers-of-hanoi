
const initializeBoard = (numDiscs) => {
  return Array.from({ length: 3 }, () => []);
};

const gameState = {
  board: initializeBoard(3),
  numDiscs: 3,
  currentMove: 0,

  initializeDiscs() {
    this.board[0] = Array.from({ length: this.numDiscs }, (_, i) => this.numDiscs - i);
    this.board[1] = [];
    this.board[2] = [];
  },

  moveDisc(fromPeg, toPeg) {
    if (this.board[fromPeg].length === 0) {
      console.log('No disc to move.');
      return;
    }
    if (this.board[toPeg].length > 0 && this.board[toPeg][this.board[toPeg].length - 1] < this.board[fromPeg][this.board[fromPeg].length - 1]) {
      console.log('Cannot place a larger disc on top of a smaller one.');
      return;
    }

    this.board[toPeg].push(this.board[fromPeg].pop());
    this.currentMove++;
    this.checkWinner();
  },

  
  checkWinner() {
    const winningPeg = this.board.findIndex(peg => peg.length === this.numDiscs && peg.every((disc, i) => disc === this.numDiscs - i));
    if (winningPeg !== -1 && winningPeg !== 0) { 
      console.log(`Congratulations! You've won the game in ${this.currentMove} moves.`);
      this.resetGame();
    }
  },

  resetGame() {
    this.board = initializeBoard(3);
    this.initializeDiscs();
    this.currentMove = 0;
  }
};


gameState.initializeDiscs();


gameState.moveDisc(0, 1); 
gameState.moveDisc(0, 2); 
gameState.moveDisc(1, 2); 

const updateBoardDisplay = () => {
  
  document.querySelectorAll('.peg').forEach(peg => peg.innerHTML = '');


  gameState.board.forEach((peg, pegIndex) => {
      peg.forEach(disc => {
          const discElement = document.createElement('div');
          discElement.className = 'disc';
          discElement.style.width = `${60 + disc * 10}px`; 
          discElement.textContent = `Disc ${disc}`;
          document.getElementById(`peg${pegIndex}`).appendChild(discElement);
      });
  });
};


window.moveDisc = (fromPeg, toPeg) => {
  gameState.moveDisc(fromPeg, toPeg);
  updateBoardDisplay();
};


gameState.initializeDiscs();
updateBoardDisplay();