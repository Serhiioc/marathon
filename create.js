const $randomBtn = document.querySelector('.button');
const $arenas = document.querySelector('.arenas');

export const createReloadButton = () => {
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

export function createElement (tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }
    return $tag
};

export function createPlayer(playerObj) {
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


export const $result = (name) => {
    const $resultTitle = createElement('div', 'loseTitle');
    if (name) {
        $resultTitle.innerText = `${name.name} wins`;
    } else {
        $resultTitle.innerText = 'draw';
    }
    return $resultTitle;
}