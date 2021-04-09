document.addEventListener("DOMContentLoaded", function() {

    const $arenas = document.querySelector('.arenas');
    const $randomBtn = document.querySelector('.button');
    const player1 =  {
            player: 1,
            name: 'Scorpion',
            hp: '100',
            img: 'scorpion.gif',
            weapon: ['ak-47', 15],
            attack: function() {
                console.log(player1.name + ' Fight...')
            },
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
    };

    

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

    function playerWins(name) {
        const $winsTitle = createElement('div', 'loseTitle');
        $winsTitle.innerText = name + ' wins';

        return $winsTitle;
    }
 
    function changeHp (player) {
        const $playerLife = document.querySelector('.player'+ player.player + ' .life');
        player.hp -= Math.ceil(Math.random() * 20);
        $playerLife.style.width = player.hp + '%';

        if (player.hp <= 0) {
            $playerLife.style.width = '0';
            $randomBtn.setAttribute("disabled", "1");
            $arenas.appendChild(playerWins(player1.hp > 0? player1.name : player2.name));
        }

        
        }
        $randomBtn.addEventListener('click', function() {
            changeHp(player1);
            changeHp(player2);
            
        });
    
    

   
});