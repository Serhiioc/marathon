document.addEventListener("DOMContentLoaded", function() {
    const $arenas = document.querySelector('.arenas');
    const $randomBtn = document.querySelector('.button');
    const $formFight = document.querySelector('.control');
    const $chat = document.querySelector('.chat');
      
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

    const logs = {
        start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
        end: [
            'Результат удара [playerWins]: [playerLose] - труп',
            '[playerLose] погиб от удара бойца [playerWins]',
            'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
        ],
        hit: [
            '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
            '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
            '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
            '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
            '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
            '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
            '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
            '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
            '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
            '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
            '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
            '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
            '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
            '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
            '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
            '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
            '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
            '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
        ],
        defence: [
            '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
            '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
            '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
            '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
            '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
            '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
        ],
        draw: 'Ничья - это тоже победа!'
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

    }
       
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));

    function $result(name) {
        const $resultTitle = createElement('div', 'loseTitle');
        if (name) {
            $resultTitle.innerText = `${name.name} wins`;
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

    function enemyAttack() {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];

        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
        }
    }

    function playerAttack() {
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

    function fightStep(playerDefence, playerAttack, gamer, computer) {
        if(gamer.hit !== computer.defence) {
            playerDefence.changeHP(gamer.value)
            viewLogs('hit', playerAttack, playerDefence );
        } else {
            viewLogs('defence', playerAttack, playerDefence );
        };
        playerDefence.renderHP();
    }

    function viewResult() {
        if(player1.hp === 0 && player2.hp > player1.hp) {
            $arenas.appendChild($result(player2));
            viewLogs('end', player2, player1)
        } else 
        if(player2.hp === 0 && player1.hp > player2.hp) {
            $arenas.appendChild($result(player1));
            viewLogs('end', player1, player2);
        } else
        if(player2.hp === 0 && player2.hp === 0) {
            $arenas.appendChild($result());
            viewLogs('draw');
        }
    }

    let date = new Date();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    viewLogs('start', player1, player2);

    function pasteLog(item) {
        const elem = `<p>${item}</p>`;
        $chat.insertAdjacentHTML('afterbegin', elem);
        console.log(item);
    }

    function viewLogs(type, attackPlayerWins = '', defencePlayerLose = '') {
        let num = getRandom(logs[type].length - 1);
        let text; 
        switch (type) {
            case 'start':
                text = logs[type].replace('[player1]', attackPlayerWins.name).replace('[player2]', defencePlayerLose.name).replace('[time]', time);
                pasteLog(text);
                break;
            case 'hit':
                text = logs[type][num].replace('[playerDefence]', defencePlayerLose.name).replace('[playerKick]', attackPlayerWins.name);
                pasteLog(text);
                break;
            case 'defence':
                text = logs[type][num].replace('[playerDefence]', defencePlayerLose.name).replace('[playerKick]', attackPlayerWins.name);
                pasteLog(text);
                break;
            case 'end':
                createReloadButton();
                text = logs.end[num].replace('[playerWins]', attackPlayerWins.name).replace('[playerLose]', defencePlayerLose.name);
                pasteLog(text);
                break;        
            case 'draw':
                text = logs[type];
                pasteLog(text);
                break;
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