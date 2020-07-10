let wolf;
let coin;
let background;
let border;
let scoreBorder;
let isRigth = true;
let isDown = true;
let mapInterval = new Map();
let countScore = 0;
let arrCoordinatesCoin;
let indexCoin;
let intervalCoin = 120;
let catchCoinRangeUp = [205, 210];
let catchCoinRengeDown = [70, 75];
let level = 1;



function createBorder(){
    border = document.createElement('div');
    border.className = 'borderClass';
    // border.setAttribute('style', "border: 2px solid #000000; width: 565px; height: 445px;");
    document.body.appendChild(border);
}

function createBackground(){
    background = document.createElement('img');
    background.className = "backgroundClass";
    background.setAttribute('src', 'images/background.jpg');
    border.appendChild(background);
    
}


function createWolf(){
    wolf = document.createElement('img');
    wolf.className = 'wolfDownClass';
    wolf.setAttribute('src', 'images/wolfDown.png');
    border.appendChild(wolf);    
}

function createScoreBorder(){
    scoreBorder = document.createElement('div');
    scoreBorder.className = "scoreClass";
    // scoreBorber.innerText = "SCORE";

    let scoreHeader = document.createElement('div');
    scoreHeader.innerText = "SCORE";
    scoreBorder.appendChild(scoreHeader);

    let scoreValue = document.createElement('div');
    scoreValue.innerText = "0";
    scoreBorder.appendChild(scoreValue);
    scoreValue.setAttribute('id', 'score');

    // scoreBorber.innerText += '\n'+ countScore;
    // scoreBorber.innerText += // вывод счетчика игры
    document.body.appendChild(scoreBorder);
       
}

// function countScore{

// }

function renderWolf(){      
        if(isDown){
            wolf.setAttribute('src', 'images/wolfDown.png');
            if(!isRigth){
                wolf.style.transform = 'rotateY(-180deg)'
            } else {
                wolf.style.transform = 'rotateY(0deg)'
            }
            
        } else {
            
            wolf.setAttribute('src', 'images/wolfUp.png');
            if(!isRigth){   
                wolf.style.transform = 'rotateY(-180deg)';                   
            } else {
                wolf.style.transform = 'rotateY(0deg)';
            } 
        }
}


function createCoin(){
    arrCoordinatesCoin = [
    { // left Down
        x : '10px',
        y : '170px',
        dx : 6 * level,
        dy : 1.5 * level, 
        isRigth : false,
        isDown : true
    },
    { // left Up
        x : '10px',
        y : '10px',
        dx : 5 * level,
        dy : 2 * level,
        isRigth : false,
        isDown : false
    }, 
    { // right Down
        x : '500px', 
        y : '170px',
        dx : -6 * level,
        dy : 1.5 * level,
        isRigth : true,
        isDown : true
    },
    { // right Up
        x : '500px',
        y : '10px',
        dx : -5 * level,
        dy : 2 * level,
        isRigth : true,
        isDown : false
    }];

    indexCoin = Math.floor(Math.random() * Math.floor(arrCoordinatesCoin.length));
    coordinatesCoin = arrCoordinatesCoin[indexCoin];
    

    coin = document.createElement('img');
    coin.setAttribute('src', 'images/coint.png');
    coin.className = "coinClass";
    coin.style.left = coordinatesCoin.x;
    coin.style.top = coordinatesCoin.y;

    border.appendChild(coin);

    let myInterval = setInterval(function(){
        // moveCoin(coin, arrCoordinatesCoin[coordinatesCoin].dx, arrCoordinatesCoin[coordinatesCoin].dy)
        coin.style.top = parseInt(coin.style.top) + coordinatesCoin.dy + 'px';
        coin.style.left = parseInt(coin.style.left) + coordinatesCoin.dx + 'px';

        //проверка пересечение монеты и волка
        if(coordinatesCoin.isRigth == isRigth && coordinatesCoin.isDown == isDown){
            let coinY = parseInt(coin.style.top);
            if(isDown && coinY >= catchCoinRangeUp[0] && coinY <= catchCoinRangeUp[1]){
                // console.log('down');
                clearInterval(myInterval);
                coin.parentNode.removeChild(coin);
                catchCoin();
                
            } 
            if (!isDown && coinY >= catchCoinRengeDown[0] && coinY <= catchCoinRengeDown[1]){
                // console.log('up')
                clearInterval(myInterval);
                coin.parentNode.removeChild(coin);
                catchCoin();
            }   
        };
    
        
        // исчезание монеты
        if(parseInt(coin.style.top) >= 250 ){ 
            createCoin()
            clearInterval(myInterval);
            coin.parentNode.removeChild(coin);
            createGameOver();   
        }
    }, intervalCoin);
}

function catchCoin(){
    setScore( parseInt(document.getElementById('score').innerText) + 1)
    level += 0.1;
    createCoin();  
}


function setScore(value){
     document.getElementById('score').innerText = value;
    // scoreBorber.innerText += '\n'+ countScore; 
} 


function timeCoin() { // время движения монеты
    let intervalKey = Math.random();
    let interval = setInterval(function(){moveCoin(intervalKey)}, 100);
    mapInterval.set(intervalKey, interval);
}

function createGameOver(){
    //удаление монеты
    // coin.parentNode.removeChild(coin);
    window.createCoin=function(){return false;};
    //удаление волка
    wolf.parentNode.removeChild(wolf);
    
    let gameOver = document.createElement('img');
    gameOver.setAttribute('src', 'images/game_over.png');
    gameOver.className = "gameOverClass";
    document.body.appendChild(gameOver);

}

function moveRight() {
    isRigth = true;
    renderWolf();
    
}

function moveLeft() {
    isRigth = false;
    renderWolf();
}

function moveUp() {
    isDown = false;
    renderWolf()
}

function moveDown() {
    isDown = true;
    renderWolf();
}

function onKeyPress(event) {
    if (event.keyCode === 37) {
        moveLeft();
    } else if (event.keyCode === 39) {
        moveRight();
    } else if (event.keyCode === 38) {
        moveUp();
    } else if (event.keyCode === 40) {
        moveDown();
    }
}

window.onkeydown = function (event) {
    onKeyPress(event);
}

window.onload = function () {
    createBorder();
    createWolf();  
    createBackground();
    createCoin();
    createScoreBorder();
    
}