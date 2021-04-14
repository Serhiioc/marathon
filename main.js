document.addEventListener("DOMContentLoaded", function() {
    const $arenas = document.querySelector('.arenas');
    // const $randomBtn = document.querySelector('.button');
    const $formFight = document.querySelector('.control');
    const player1 =  {
            player: 1,
            name: 'Scorpion',
            hp: '100',
            img: 'scorpion.gif',
            weapon: ['ak-47', 15],
            attack,
            changeHP,
            elHP,
            renderHP,

    };
    const player2 =  {
            player: 2,
            name: 'KItana',
            hp: 100,
            img: 'kitana.gif',
            weapon: ['katana', 0],
            attack, 
            changeHP,
            elHP,
            renderHP,
    };
    const HIT = {
        head: 30,
        body: 25,
        foot: 20,
    };
    const ATTACK = ['head', 'body', 'foot'];

    function getRandom(max) {
        return Math.ceil(Math.random() * max);
    }

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

    function $result(name) {
        const $resultTitle = createElement('div', 'loseTitle');
        if (name) {
            $resultTitle.innerText = name.name + ' wins';
        } else {
            $resultTitle.innerText = 'draw';
        }
        return $resultTitle;
    }

    
    function attack() {
        console.log(this.name + ' Fight...')
    }

    function changeHP(hp) {
        if(this.hp > hp) {
            this.hp -= hp;
        } else {
            this.hp = 0;
        }
    }

    function elHP() {
        const $player = document.querySelector('.player'+ this.player + ' .life');
        return $player; 
    }

    function renderHP() {
        this.elHP().style.width = this.hp + '%';
    }

    function createReloadButton() {
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

    function enemyAttack() {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];

        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
        }
    }

    function fightStep(player, gamer, computer) {
        if(gamer.hit != computer.defence) {
            player.changeHP(gamer.value)
        };
    }

    $formFight.addEventListener('submit', function (evt) {
        evt.preventDefault();
        const enemy = enemyAttack();

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

        console.log('a', attack); 
        console.log('e', enemy); 

        // * Ход боя

        fightStep(player2, attack, enemy);
        fightStep(player1, enemy, attack);
        // ! Прорисовка жизни
        player1.renderHP();
        player2.renderHP();

        // ! Конец боя
        if(player1.hp == 0 || player2.hp == 0) {
            createReloadButton();
            $randomBtn.setAttribute("disabled", "1");
        }
        
        if(player1.hp == 0 && player2.hp > player1.hp) {
            $arenas.appendChild($result(player2));
        } else 
        if(player2.hp == 0 && player1.hp > player2.hp) {
            $arenas.appendChild($result(player1));
        } else
        if(player2.hp == 0 && player2.hp == 0) {
            $arenas.appendChild($result());
        }
    })
   
    document.addEventListener('keydown', function(evt) {
            if( (player1.hp == 0 || player2.hp == 0) && evt.code === 'Space') {
                window.location.reload();
            }
    });


});