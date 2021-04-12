document.addEventListener("DOMContentLoaded", function() {

    const $arenas = document.querySelector('.arenas');
    const $randomBtn = document.querySelector('.button');
    // const $reloadButton = document.querySelector('.reloadWrap .button');
    const player1 =  {
            player: 1,
            name: 'Scorpion',
            hp: '100',
            img: 'scorpion.gif',
            weapon: ['ak-47', 15],
            attack: function() {
                console.log(player1.name + ' Fight...')
            },
            changeHP: changeHP,
            elHP: elHP,
            renderHP: renderHP,

    };
    const player2 =  {
            player: 2,
            name: 'KItana',
            hp: '100',
            img: 'kitana.gif',
            weapon: ['katana', 0],
            attack: function() {
                console.log(player2.name + ' Fight...')
            },
            changeHP: changeHP,
            elHP: elHP,
            renderHP: renderHP,
    };

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

    };
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
 
    
    $randomBtn.addEventListener('click', function() {
        // changeHp(player1);
        // changeHp(player2);
        player1.changeHP(getRandom(20));
        player2.changeHP(getRandom(20));
        player1.renderHP();
        player2.renderHP();

        if(player1.hp == 0 || player2.hp == 0) {
            $randomBtn.setAttribute("disabled", "1");
            createReloadButton();
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
    });
    

    function changeHP(hp) {
        if(this.hp > hp) {
            this.hp -= hp;
            console.log(this.hp); 
        } else {
            this.hp = '0';
            console.log('lose');
        }
    }

    function elHP() {
        const $player = document.querySelector('.player'+this.player);
        console.log($player);
        return $player; 
    }

    function renderHP() {
        const $playerLife = document.querySelector('.player'+ this.player + ' .life');
        $playerLife.style.width = this.hp + '%';
        console.log(this.hp + '%');
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

});