class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
    }

    attack = () => {
        console.log(this.name + ' Fight...');
    }
    changeHP = (hp) => {
        if(this.hp > hp) {
            this.hp -= hp;
        } else {
            this.hp = 0;
        };
    }
    elHP = () => {
        const $player = document.querySelector('.player'+ this.player + ' .life');
        return $player; 
    };
    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    };
};

export const player1 = new Player ({
    player: 1,
    name: 'Scorpion',
    hp: '100',
    img: 'scorpion.gif',
    weapon: ['ak-47', 15],
   
});

export const player2 = new Player ({
    player: 2,
    name: 'KItana',
    hp: 100,
    img: 'kitana.gif',
    weapon: ['katana', 0],
});
