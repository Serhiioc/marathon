import {player1, player2} from './players.js'; 
import {viewLogs} from './logs.js';
import {HIT, ATTACK} from "./constants.js";
import Data from './random.js';
import {createReloadButton, createPlayer, $result} from './create.js'; 
const {getRandom} = new Data();
const $arenas = document.querySelector('.arenas');

export class Game {

    start = () => {
        $arenas.appendChild(createPlayer(player1));
        $arenas.appendChild(createPlayer(player2));
        viewLogs('start', player1, player2);
        fight();
    }

    fightStep = (playerDefence, playerAttack, gamer, computer) => {
        if(gamer.hit !== computer.defence) {
            playerDefence.changeHP(gamer.value)
            viewLogs('hit', playerAttack, playerDefence );
        } else {
            viewLogs('defence', playerAttack, playerDefence );
        };
        playerDefence.renderHP();
    }

    viewResult = () => {
        if(player1.hp === 0 && player2.hp > player1.hp) {
            createReloadButton();
            $arenas.appendChild($result(player2));
            viewLogs('end', player2, player1)
        } else 
        if(player2.hp === 0 && player1.hp > player2.hp) {
            createReloadButton();
            $arenas.appendChild($result(player1));
            viewLogs('end', player1, player2);
        } else
        if(player2.hp === 0 && player2.hp === 0) {
            createReloadButton();
            $arenas.appendChild($result());
            viewLogs('draw');
        }
    }

};

const {viewResult, fightStep} = new Game;
const $formFight = document.querySelector('.control');
const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

const playerAttack = () => {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked  && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

const fight = () => {
    
    $formFight.addEventListener('submit', function (evt) {
        evt.preventDefault();
        const enemy = enemyAttack();
        const attack = playerAttack();
        

        // * Ход боя
        fightStep(player1, player2, enemy, attack);
        fightStep(player2, player1, attack, enemy);

        // ! Конец боя
        viewResult();
       
    })
}
