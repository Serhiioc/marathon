export const player1 =  {
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
export const player2 =  {
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