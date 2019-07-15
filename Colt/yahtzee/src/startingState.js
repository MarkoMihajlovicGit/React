const NUM_DICE = 5;
const NUM_ROLLS = 3;

const startingState = {
  dice: Array.from({ length: NUM_DICE }).map(
    d => Math.floor(Math.random() * 5) + 1
  ),
  bestScores: [],
  locked: Array(NUM_DICE).fill(false),
  rollsLeft: NUM_ROLLS,
  rolling: false,
  gameOver: false,
  scores: {
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    threeOfKind: undefined,
    fourOfKind: undefined,
    fullHouse: undefined,
    smallStraight: undefined,
    largeStraight: undefined,
    yahtzee: undefined,
    chance: undefined
  }
};

export default startingState;
