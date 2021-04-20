import {player1, player2} from './players.js';
import {viewLogs} from './logs.js';
import getRandom from './random.js';

document.addEventListener("DOMContentLoaded", function() {
    const $arenas = document.querySelector('.arenas');
    const $randomBtn = document.querySelector('.button');
    const $formFight = document.querySelector('.control');

    const HIT = {
        head: 30,
        body: 25,
        foot: 20,
    };
    const ATTACK = ['head', 'body', 'foot'];

    function createElement (tag, className) {
        const $tag = document.createElement(tag);

        if (className) {
            $tag.classList.add(className);
        }
        return $tag
    }
   
    function createPlayer(playerObj) {
        // ! Player div
        const $players = createElement('div', 'player'+playerObj.player);
        // ! Progress
        const $progressbar = createElement('div', 'progressbar');
        // * Life
        const $life = createElement('div', 'life');
        $life.style.width = playerObj.hp+'%';
        // * Name
        const $name = createElement('div', 'name');
        $name.innerText = playerObj.name;
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        // ! CHaracter
        const $character = createElement('div', 'character');
        // * Image
        const $img = createElement('img');
        $img.src = 'http://reactmarathon-api.herokuapp.com/assets/' + playerObj.img;
        $character.appendChild($img);
        $players.appendChild($progressbar);
        $players.appendChild($character);
       return $players;

    }
       
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
    viewLogs('start', player1, player2);

    function $result(name) {
        const $resultTitle = createElement('div', 'loseTitle');
        if (name) {
            $resultTitle.innerText = `${name.name} wins`;
        } else {
            $resultTitle.innerText = 'draw';
        }
        return $resultTitle;
    }
    
   

    const createReloadButton = () => {
        $randomBtn.setAttribute("disabled", "1");
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button', 'button');
        $reloadButton.innerText = 'Restart';
        $reloadWrap.appendChild($reloadButton);
        $arenas.appendChild($reloadWrap);
        $reloadButton.addEventListener('click', () => {
            window.location.reload();
            $arenas.removeChild($reloadWrap);
        });
        
    }

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
    // ! Неудачная попытка деструктуризации
    // const {player: myPlayer, name: myName,} = player1;
    // const {player: enemyPlayer, name: enemyName,} = player2;
    // const {hit: myHit, defence: myDefence, value: myValue} = attack;
    // const {hit: myHit, defence: enemyDefence, value: enemyValue} = enemy;

    function fightStep(playerDefence, playerAttack, gamer, computer) {
        if(gamer.hit !== computer.defence) {
            playerDefence.changeHP(gamer.value)
            viewLogs('hit', playerAttack, playerDefence );
        } else {
            viewLogs('defence', playerAttack, playerDefence );
        };
        playerDefence.renderHP();
    }

    const viewResult = () => {
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
   
    

    document.addEventListener('keydown', function(evt) {
        if( (player1.hp == 0 || player2.hp == 0) && evt.code === 'Space') {
            window.location.reload();
        }
    });


});