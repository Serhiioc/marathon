// import {player1, player2} from './players.js';
// import {Logger} from './logs.js';
// import Data from './random.js';
// import {HIT, ATTACK} from "./constants.js";
import { Game } from "./game.js";
const game = new Game();

document.addEventListener("DOMContentLoaded", function() {
    game.start();

});