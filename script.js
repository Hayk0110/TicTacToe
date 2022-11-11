// SELECTORS
const $selectBox = document.querySelector('.select-box');
const $size = document.querySelector('.select-box .size');
const $playBoard = document.querySelector('.play-board');
const $playArea = document.querySelector('.play-area');
const $players = document.querySelector('.players');
const $resultBox = document.querySelector('.result-box');
const $wonText = document.querySelector('.won-text');
const $replayBtn = document.querySelector('.btn');


let playerSign ;
let cpuSign;
let player;
let cpu;
let size;
let $allBox = [];
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let step = 0;
let xWin;
let oWin;
// EVENT LISTENERS
$selectBox.addEventListener('click', choosePlayer);
$playArea.addEventListener('click', playerTurn);
$replayBtn.addEventListener('click', reloadFunc);


// FUNCTIONS
function choosePlayer(e){
    if(e.target.classList[0] == 'playerX'){
        $selectBox.classList.add('hide');
        startGame();
        playerSign = playerXIcon;
        cpuSign = playerOIcon;
        player = 'x';
        cpu = 'o';
    }   
    if(e.target.classList[0] == 'playerO'){
        playerSign = playerOIcon;
        cpuSign = playerXIcon;
        $selectBox.classList.add('hide');
        startGame();
        $players.classList.add('active');
        player = 'o';
        cpu = 'x';
    }
}

function startGame(){
    size = Number($size.value).toFixed(0);
    for (let i=0;i<size;i++){
        let section = document.createElement('section');
        let secArr = [];
        for (let i=0;i<size;i++){
            let box = document.createElement('span');
            box.classList.add('box');
            box.setAttribute('data-box', 'true');
            section.appendChild(box);
            secArr.push(box);
        }
        $playArea.appendChild(section);
        $allBox.push(secArr);
    }
    $playBoard.classList.add('show')
}

function playerTurn(e){
    if(e.target.dataset.box){
        if(e.target.innerHTML == ''){
            e.target.innerHTML = `<i class="${playerSign}"></i>`;
            e.target.setAttribute(`data-${player}`,'true');
            step++;
            checkXWin();
            checkOWin();
            drawFunc();
            $playArea.removeEventListener('click',playerTurn);
            if(player == 'x'){
                $players.classList.add('active');
            }else if (player == 'o'){
                $players.classList.remove('active');
            }
            if(!$playArea.dataset.win){
                renderCpu();
            }
        }
    }
}

function renderCpu(){
    let time = 1;
    let index1 = random(0,size);
    let index2 = random(0,size);
    if($allBox[index1][index2].innerHTML == ''){
        let interval = setInterval(()=>{
            if(time <= 0){
                $allBox[index1][index2].innerHTML = `<i class="${cpuSign}"></i>`;
                $allBox[index1][index2].setAttribute(`data-${cpu}`, 'true');
                step++;
                checkOWin();
                checkXWin();
                drawFunc();
                if(cpu == 'o'){
                    $players.classList.remove('active')
                }else if(cpu == 'x'){
                    $players.classList.add('active');
                }
                clearInterval(interval);
                $playArea.addEventListener('click', playerTurn);
            }else{
                time = 0;
            }
        },700);
    }
    else renderCpu();
}

function checkXWin(){
    // UXAHAYAC

    for (let i=0;i<size;i++){
        xWin = 0;
        for (let j=0;j<size;j++){
            if($allBox[i][j].dataset.x){
                xWin++;
            }
        }
        if(xWin == size){
            let time = 1;
            let interval = setInterval(()=>{
                if(time<=0){
                    $playArea.setAttribute('data-win','true');
                    $playBoard.classList.remove('show');
                    $resultBox.classList.add('show');
                    $wonText.textContent = 'Player X won the game!';
                }else time = 0;
            },500)
        }
    }

    // HORIZONAKAN

    for (let i=0;i<size;i++){
        let xWin = 0;
        for (let j=0;j<size;j++){
            if($allBox[j][i].dataset.x){
                xWin++;
            }
        }
        if(xWin == size){
            let time = 1;
            let interval = setInterval(()=>{
                if(time<=0){
                    $playArea.setAttribute('data-win','true');
                    $playBoard.classList.remove('show');
                    $resultBox.classList.add('show');
                    $wonText.textContent = 'Player X won the game!';
                }else time = 0;
            },500)
        }
    }

    // GLXAVOR ANKYUNAGIC

    xWin = 0;
    for (let i=0;i<size;i++){
        if($allBox[i][i].dataset.x){
            xWin++;
        }
    }
    if(xWin == size){
        let time = 1;
        let interval = setInterval(()=>{
            if(time<=0){
                $playArea.setAttribute('data-win','true');
                $playBoard.classList.remove('show');
                $resultBox.classList.add('show');
                $wonText.textContent = 'Player X won the game!';
            }else time = 0;
        },500)
    }

    // OJANDAK ANKYUNAGIC

    xWin = 0;
    for (let i=0;i<size;i++){
        if($allBox[i][size - 1 - i].dataset.x){
            xWin++;
        }
    }
    if(xWin == size){
        let time = 1;
        let interval = setInterval(()=>{
            if(time<=0){
                $playArea.setAttribute('data-win','true');
                $playBoard.classList.remove('show');
                $resultBox.classList.add('show');
                $wonText.textContent = 'Player X won the game!';
            }else time = 0;
        },500)
    }
}

function checkOWin(){
    // UXAHAYAC

    for (let i=0;i<size;i++){
        oWin = 0;
        for (let j=0;j<size;j++){
            if($allBox[i][j].dataset.o){
                oWin++;
            }
        }
        if(oWin == size){
            let time = 1;
            let interval = setInterval(()=>{
                if(time<=0){
                    $playArea.setAttribute('data-win','true');
                    $playBoard.classList.remove('show');
                    $resultBox.classList.add('show');
                    $wonText.textContent = 'Player O won the game!';
                }else time = 0;
            },500)
        }
    }

    // HORIZONAKAN

    for (let i=0;i<size;i++){
        let oWin = 0;
        for (let j=0;j<size;j++){
            if($allBox[j][i].dataset.o){
                oWin++;
            }
        }
        if(oWin == size){
            let time = 1;
            let interval = setInterval(()=>{
                if(time<=0){
                    $playArea.setAttribute('data-win','true');
                    $playBoard.classList.remove('show');
                    $resultBox.classList.add('show');
                    $wonText.textContent = 'Player O won the game!';
                }else time = 0;
            },500)
        }
    }

    // GLXAVOR ANKYUNAGIC

    oWin = 0;
    for (let i=0;i<size;i++){
        if($allBox[i][i].dataset.o){
            oWin++;
        }
    }
    if(oWin == size){
        let time = 1;
            let interval = setInterval(()=>{
                if(time<=0){
                    $playArea.setAttribute('data-win','true');
                    $playBoard.classList.remove('show');
                    $resultBox.classList.add('show');
                    $wonText.textContent = 'Player O won the game!';
                }else time = 0;
            },500)
    }

    // OJANDAK ANKYUNAGIC

    oWin = 0;
    for (let i=0;i<size;i++){
        if($allBox[i][size - 1 - i].dataset.o){
            oWin++;
        }
    }
    if(oWin == size){
        let time = 1;
            let interval = setInterval(()=>{
                if(time<=0){
                    $playArea.setAttribute('data-win','true');
                    $playBoard.classList.remove('show');
                    $resultBox.classList.add('show');
                    $wonText.textContent = 'Player O won the game!';
                }else time = 0;
            },500)
    }
}

function drawFunc(){
    if(step == size**2 && !$playArea.dataset.win){
        $playBoard.classList.remove('show');
        $resultBox.classList.add('show');
        $wonText.textContent = 'Match has been drawn!';
    }
}

function random(min,max){
    return Math.floor(Math.random()*(max-min) + min);
}

function reloadFunc(){
    window.location.reload();   
}