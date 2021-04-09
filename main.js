document.addEventListener("DOMContentLoaded", function() {
    const playerObj = {
        player1: {
            name: 'Scorpion',
            hp: '100',
            img: 'scorpion.gif',
            weapon: ['ak-47', 15],
            attack: function() {
                console.log(player1.name + ' Fight...')
            },
        },
        player2: {
            name: 'KItana',
            hp: '80',
            img: 'kitana.gif',
            weapon: ['katana', 0],
            attack: function() {
                console.log(player2.name + ' Fight...')
            },
        },

    };


    const $arenas = document.querySelector(".arenas");
   
    function createPlayer(player, name, src) {
        // ! Player div
        const $players = document.createElement('div');
        $players.classList.add(player);
        // ! Progress
        const $progressbar = document.createElement('div');
        $progressbar.classList.add('progressbar');
        // * Life
        const $life = document.createElement('div');
        $life.classList.add('life');
        $life.style.width = '100%';
        // * Name
        const $name = document.createElement('div');
        $name.classList.add('name');
        $name.innerText = name;

        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        // ! CHaracter
        const $character = document.createElement('div');
        $character.classList.add('character');
        // * Image
        const $img = document.createElement('img');
        $img.classList.add('img');
        $img.src = 'http://reactmarathon-api.herokuapp.com/assets/' + src;

        $character.appendChild($img);

        $players.appendChild($progressbar);
        $players.appendChild($character);

        $arenas.appendChild($players);

    };

        createPlayer('player1', playerObj.player1.name, playerObj.player1.img);
        createPlayer('player2', playerObj.player2.name, playerObj.player2.img);
});