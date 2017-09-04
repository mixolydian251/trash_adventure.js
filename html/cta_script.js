var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var gravity = 9.8;
var score = 0;
var ache = 3;
var acheText = ['', 'I can\'t take anymore!', 'Rumbling Tummy', 'Feeling Great!' ];
var screen = 'start';
var drop = false;
var instructions = false;

var fart1 = document.getElementById('fart1');
/////////////////////////////Object////////////////////////////////////

function GamePiece(imageName, x, y, dx, dy, speed){
    this.image = new Image();
    this.image.src = imageName;
    this.x = x ;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;

    this.draw = function () {
        c.drawImage(this.image, this.x, this.y);
    };

    this.updateFall = function () {
        this.dy += (Math.pow(gravity, 2) * 0.0005 * Math.random());
        this.dx += 0;
        this.y += this.dy;
        this.x += this.dx;
        this.draw()
    };

    this.updateFallCatch = function () {
        this.dy += (Math.pow(9.8, 2) * 0.005 * Math.random());
        this.dx += 0;
        this.y += this.dy;
        this.x += this.dx;
        this.draw()
    };

    this.updateGround = function () {
        if(this.x < -75 ){
            this.x += this.speed;
            this.draw()
        }
        else if(this.x > window.innerWidth - 140){
            this.x -= this.speed;
            this.draw()
        }
        else{
            this.y += this.dy;
            this.x += this.dx;
            this.draw()
        }
    }
}

function UI(x, y, dx, dy, width, height){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.finalScore = 0;

    this.drawbox = function (){
        c.textAlign = 'left';
        c.fillStyle = "rgba(250,250,250,0.5";
        this.image = c.fillRect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "rgba(255,255,255,0.9";
        c.lineWidth   = 2;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.fillStyle = "rgba(250,250,250,1";
        c.shadowColor = '#1e1e1e';
        c.shadowBlur = 2;
        if (window.innerWidth > 760){
            c.font = "18px Verdana";
        }
        else{
            c.font = "12px Verdana";
        }
        if (this.finalScore < score){
            this.finalScore += 2;
        }
        c.fillText("Score: " + this.finalScore, this.x + (0.1 *this.width), this.y + (0.4 *this.height), this.width);

        if (window.innerWidth > 760){
            c.font = "15px Verdana";
        }
        else{
            c.font = "11px Verdana";
        }
        if (ache === 3){
            c.fillStyle = '#5ae685';
        }
        if (ache === 2){
            c.font = 'condensed 13px Verdana';
            c.fillStyle = '#ebd663';
        }
        if (ache === 1){
            c.font = 'condensed 13px Verdana';
            c.shadowColor = '#7e7e7e';
            c.fillStyle = '#e84544';
        }
        c.fillText("Stomach: " + acheText[ache], this.x + (0.1 *this.width), this.y + (0.75 *this.height), this.width);
        c.shadowBlur = 0;

    };

    this.drawStomachAcheScreen = function (endGameText) {
        c.fillStyle = "rgba(250,250,250,0.9";
        this.image = c.fillRect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "rgba(20,20,20,0.9";
        c.lineWidth   = 5;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.fillStyle = "rgba(20,20,20,1";
        c.textAlign = 'center';
        c.font = "bold 46px Verdana";
        c.fillText("GAME OVER", window.innerWidth/2 , this.y + (0.15 * this.height));
        c.fillStyle = '#e12417';

        if(window.innerWidth > 800){
            c.font = "bold 27px Verdana";
        }
        else if(window.innerWidth > 400) {
            c.font = "bold 18px Verdana";
        }


        c.fillText(endGameText, window.innerWidth/2 , this.y + (0.3 *this.height));
        c.fillStyle = "rgba(20,20,20,1";
        if(window.innerWidth > 800){
            c.font = "normal 25px Verdana";
        }
        else if(window.innerWidth > 400){
            c.font = "normal 16px Verdana";
        }
        c.fillText("You don't feel so good...", window.innerWidth/2 , this.y + (0.3 *this.height) + 40);
        c.fillText("Oh No!! It seems you have POOPED on the rug!", window.innerWidth/2 , this.y + (0.3 *this.height) + 75);
        c.font = "bold 46px Verdana";
        if (this.finalScore < score){
            this.finalScore += 10;
        }
        c.fillText("Final Score: " + this.finalScore, window.innerWidth/2 , this.y + (0.72 *this.height) );
        c.fillStyle = '#e12417';
        c.font = "bold 36px Verdana";
        c.fillText("Click anywhere to play again!", window.innerWidth/2 , this.y + this.height - 28);

    };


    this.drawStartMenu = function () {
        if (instructions === false){
            c.fillStyle = "rgba(250,250,250,0.9";
            this.image = c.fillRect(this.x, this.y, this.width, this.height);
            c.strokeStyle = "rgba(20,20,20,0.9";
            c.lineWidth   = 5;
            c.strokeRect(this.x, this.y, this.width, this.height);
            c.fillStyle = '#1a2537';
            c.textAlign = 'center';
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                c.font = "bold 70px Verdana";
                if(window.innerHeight > window.innerWidth){
                    c.fillText("Rotate Your", window.innerWidth/2 , this.y + (0.45 * this.height));
                    c.fillText("Phone Sideways!", window.innerWidth/2 , this.y + (0.45 * this.height) + 85);
                }
                else{
                    c.font = "bold 45px Verdana";
                    c.fillText("Chase's Trash Adventure", window.innerWidth/2 , this.y + (0.15 * this.height));
                    chase.x = window.innerWidth/2 - chase.image.width/2; chase.y = window.innerHeight/2 - chase.image.height/2; chase.draw();
                    c.fillStyle = '#e12417';
                    c.font = "bold 36px Verdana";
                    c.fillText("Click anywhere to play!", window.innerWidth/2 , this.y + (0.85 * this.height));
                }
            }
            else if (window.innerWidth < 945 || window.innerHeight < 550){
                c.font = "bold 65px Verdana";
                c.fillText("Enlarge", window.innerWidth/2 , this.y + (0.45 * this.height));
                c.fillText("Your Screen!", window.innerWidth/2 , this.y + (0.45 * this.height) + 85);
            }
            else{
                c.font = "bold 45px Verdana";
                c.fillText("Chase's Trash Adventure", window.innerWidth/2 , this.y + (0.15 * this.height));
                chase.x = window.innerWidth/2 - chase.image.width/2; chase.y = window.innerHeight/2 - chase.image.height/2; chase.draw();
                c.fillStyle = '#e12417';
                c.font = "bold 36px Verdana";
                c.fillText("Click anywhere to play!", window.innerWidth/2 , this.y + (0.85 * this.height));
            }
        }
        else if (instructions === true){
            c.fillStyle = "rgba(250,250,250,0.9";
            this.image = c.fillRect(this.x, this.y, this.width, this.height);
            c.strokeStyle = "rgba(20,20,20,0.9";
            c.lineWidth   = 5;
            c.strokeRect(this.x, this.y, this.width, this.height);
            c.fillStyle = '#1a2537';
            c.textAlign = 'center';
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                c.font = "bold 19px Verdana";
                c.fillText("Today is your lucky day.. No one is looking, and the trash can is full!", window.innerWidth/2 , this.y + (0.1 * this.height));
                c.fillText("It may be harder than you think to find the BEST trash can treats..", window.innerWidth/2 , this.y + (0.1 * this.height) + 50);
                c.font = "normal 16px Verdana";
                c.textAlign = 'left';
                catFood.x = window.innerWidth/4 + 10; catFood.y = this.y + (0.15 * this.height) + 60; catFood.draw();
                c.fillText("Old cat food cans are always delicious!", window.innerWidth/3 + 40 , this.y + (0.15 * this.height) + 85);
                coca.x = window.innerWidth/7 - 13 ; coca.y = this.y + (0.15 * this.height) + 105; coca.draw();
                c.fillText("They say dogs should't eat chocolate.. Whats the worst that can happen?", window.innerWidth/4 , this.y + (0.15 * this.height) + 165);
                coffee.x = window.innerWidth/5; coffee.y = this.y + (0.15 * this.height) + 190; coffee.draw();
                c.fillText("Feeling sluggish? Coffee can put some extra pep in your step!", window.innerWidth/3 - 30 , this.y + (0.15 * this.height) + 247);
                c.fillStyle = '#e12417';
                c.textAlign = 'center';
                c.font = "bold 20px Verdana";
                c.fillText("Continue!", this.x + this.width - 65 , this.y + this.height - 10);
            }
            else if (window.innerWidth < 945 || window.innerHeight < 550){
                c.font = "bold 65px Verdana";
                c.fillText("Enlarge", window.innerWidth/2 , this.y + (0.45 * this.height));
                c.fillText("Your Screen!", window.innerWidth/2 , this.y + (0.45 * this.height) + 85);
            }
            else{
                c.font = "bold 19px Verdana";
                c.fillText("Today is your lucky day.. No one is looking, and the trash can is full!", window.innerWidth/2 , this.y + (0.1 * this.height));
                c.fillText("It may be harder than you think to find the BEST trash can treats..", window.innerWidth/2 , this.y + (0.1 * this.height) + 50);
                c.font = "normal 16px Verdana";
                c.textAlign = 'left';
                catFood.x = window.innerWidth/4 + 10; catFood.y = this.y + (0.15 * this.height) + 60; catFood.draw();
                c.fillText("Old cat food cans are always delicious!", window.innerWidth/3 + 40 , this.y + (0.15 * this.height) + 85);
                coca.x = window.innerWidth/7 - 13 ; coca.y = this.y + (0.15 * this.height) + 105; coca.draw();
                c.fillText("They say dogs should't eat chocolate.. Whats the worst that can happen?", window.innerWidth/4 , this.y + (0.15 * this.height) + 165);
                coffee.x = window.innerWidth/5; coffee.y = this.y + (0.15 * this.height) + 190; coffee.draw();
                c.fillText("Feeling sluggish? Coffee can put some extra pep in your step!", window.innerWidth/3 - 30 , this.y + (0.15 * this.height) + 247);
                c.fillStyle = '#e12417';
                c.textAlign = 'center';
                c.font = "bold 20px Verdana";
                c.fillText("Continue!", this.x + this.width - 65 , this.y + this.height - 10);
            }
        }

    };
    /*
    this.drawInstruct = function () {
        c.fillStyle = "rgba(250,250,250,0.9";
        this.image = c.fillRect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "rgba(20,20,20,0.9";
        c.lineWidth   = 5;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.fillStyle = "rgba(20,20,20,1";
        c.textAlign = 'center';
        c.font = "bold 46px Verdana";
        c.fillText("Controls", window.innerWidth/2 , this.y + (0.15 * this.height));
        c.fillStyle = '#e12417';
        c.font = "bold 36px Verdana";
        c.fillText("OK, Got It!", window.innerWidth/2 , this.y + this.height - 28);

    };
    */



    this.fall = function () {
        this.dy += (Math.pow(20, 2) * 0.001 * Math.random());
        this.dx += 0;
        this.y += this.dy;
        this.x += this.dx;
        if(screen === 'stomachAche'){
            endGame.drawStomachAcheScreen('You have eaten too much chocolate!')
        }
        if(screen === 'tampon'){
            endGame.drawStomachAcheScreen('You ate a tampon... Gross!!')
        }
        if (screen === 'start'){
            start.drawStartMenu();
        }

    };

    this.scoreCardSlide = function () {
        if (this.x < 10 ){
            this.dx += (Math.pow(gravity, 2) * 0.001);
            this.x += this.dx;
            this.drawbox()
        }
        else{
            this.dx = 0;
            this.drawbox()
        }


    };
}

////////////////////////Object Constructors///////////////////////////////////



var chase = new GamePiece('chase200.png', window.innerWidth/2 - 150, window.innerHeight - 160, 0, 0, 3);
var tampon = new GamePiece('tampon.png', -100, window.innerHeight - 90, 0, 0, 0);
var coffee = new GamePiece('coffee.png', -100, window.innerHeight - 90, 0, 0, 0);
var coca = new GamePiece('coca.png', -100, window.innerHeight - 90, 0, 0, 0);
var catFood = new GamePiece('catfood.png', -100, window.innerHeight - 90, 0, 0, 0);
var speedup = new GamePiece('speedup2.png', -100, 0, 0, 0, 0);
var warn = new GamePiece('warn2.png', -100, 0, 0, 0, 0);
var yum = new GamePiece('yum3.png', -100, 0, 0, 0, 0);

var scoreCard = new UI(-(window.innerWidth * 0.3), window.innerHeight * .015, 0, 0, window.innerWidth * 0.29, window.innerHeight * 0.15);
var endGame = new UI(100, 100, 0, 0, window.innerWidth - 200, window.innerHeight - 200);
var start = new UI(100, 100, 0, 0, window.innerWidth - 200, window.innerHeight - 200);



/////////////////////////////Functions/////////////////////////////////////////////

function create() {
    var music = document.getElementById('thememusic');
    music.loop = true;
    music.play();
    music.volume = 0.4;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

// Moves item back to the top
function toTop(object, height) {
    object.y = height;
    object.x = (Math.random() * (innerWidth - object.image.width / 2)) - object.image.width / 2;
    object.dy = 0;
    object.dx = (Math.random() - 0.5) * 1.5;
}

// Calls toTop() if something falls past the bottom of the screen
function movePastBottom(object, height) {
    if (object.y > window.innerHeight + object.image.height * 3) {
        toTop(object, height);
    }
}

// Conditionals that update the game based on which item was caught
function caughtObject(object){
    if(object===coffee){
        var slurp = document.getElementById('slurp');
        slurp.play();
        chase.speed += 0.5;
        speedup.x = object.x;
        speedup.y = window.innerHeight - (chase.image.height);
        speedup.dx = (Math.random() - 0.5) * 7;
        speedup.dy = -1;
    }
    if(object===coca){
        ache -= 1;
        var burp = document.getElementById('burp');
        burp.play();
        warn.x = object.x;
        warn.y = window.innerHeight - (chase.image.height);
        warn.dx = (Math.random() - 0.5) * 7;
        warn.dy = -1;
        if (ache <= 0){
            screen = "stomachAche";
            drop = false;
            fart1.play();
            tooMuchChocolate();
        }
    }
    if (object === catFood){
        score += 100;
        gravity += 0.5;
        var bark = document.getElementById('bark');
        bark.play();
        yum.x = object.x;
        yum.y = window.innerHeight - (chase.image.height);
        yum.dx = (Math.random() - 0.5) * 7;
        yum.dy = -1;

    }
    if(object===tampon){
        screen = "tampon";
        drop = false;
        var boo = document.getElementById('boo');
        boo.play();
        tooMuchChocolate();
    }
}

// Collision detection, then calls caughtObjects()
function collision(object, callback) {
    if (object.x >= chase.x  && object.x <= chase.x + chase.image.width - 45) {
        if (object.y < window.innerHeight - (object.image.height * 0.5) && object.y > window.innerHeight - object.image.height * 1.5) {
            caughtObject(object);
            callback();
        }
    }
}

function restart(){
    gravity = 9.8;
    score = 0;
    ache = 3;
    if (screen !== 'start'){
        screen = 'game';
    }
    drop = false;
    chase = new GamePiece('chase200.png', window.innerWidth/2 - 150, window.innerHeight - 160, 0, 0, 3);
    tampon = new GamePiece('tampon.png', -100, window.innerHeight - 90, 0, 0, 0);
    coffee = new GamePiece('coffee.png', -100, window.innerHeight - 90, 0, 0, 0);
    coca = new GamePiece('coca.png', -100, window.innerHeight - 90, 0, 0, 0);
    catFood = new GamePiece('catfood.png', -100, window.innerHeight - 90, 0, 0, 0);
    speedup = new GamePiece('speedup2.png', -100, 0, 0, 0, 0);
    warn = new GamePiece('warn2.png', -100, 0, 0, 0, 0);
    yum = new GamePiece('yum3.png', -100, 0, 0, 0, 0);
    scoreCard = new UI(-(window.innerWidth * 0.29), window.innerHeight * .016, 0, 0, window.innerWidth * 0.28, window.innerHeight * 0.16);
    endGame = new UI(100, 100, 0, 0, window.innerWidth - 200, window.innerHeight - 200);
    start = new UI(100, 100, 0, 0, window.innerWidth - 200, window.innerHeight - 200);
}


///////////////////////////////Event Listeners/////////////////////////////////////

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    restart();
});

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    window.addEventListener('touchstart', function (e) {
        if( /iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
            e.preventDefault();
        }
        if (screen === 'start' && instructions === false){
            instructions = true;
        }
        else if (screen === 'start' && instructions === true) {
            start.dy = -3;
            drop = true;
        }
        if (screen === 'tampon' || screen === 'stomachAche'){
            endGame.dy = -3;
            drop = true;
        }

    });
}
else{
    window.addEventListener('click', function (e) {
        e.preventDefault(e);
        if (screen === 'start' && instructions === false){
            instructions = true;
        }
        else if (screen === 'start' && instructions === true) {
            start.dy = -3;
            drop = true;
        }
        if (screen === 'tampon' || screen === 'stomachAche'){
            endGame.dy = -3;
            drop = true;
        }
    });

    window.addEventListener('keydown', function (event) {
        if(event.keyCode === 32) {
            event.preventDefault(event);
            if (screen === 'start' && instructions === false){
                instructions = true;
            }
            else if (screen === 'start' && instructions === true) {
                start.dy = -3;
                drop = true;
            }
            if (screen === 'tampon' || screen === 'stomachAche'){
                endGame.dy = -3;
                drop = true;
            }
        }

    });
}


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    window.addEventListener('touchstart', function (e) {
        if( /iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
            e.preventDefault();
        }
        var x = e.changedTouches[0].pageX;

        if(x < window.innerWidth/2){
            chase.dx = -chase.speed;

        }
        else if(x > window.innerWidth/2){
            chase.dx = chase.speed;

        }
        else {
            chase.dx = 0;
        }
    });
    window.addEventListener('touchend', function (e) {
        var x = e.changedTouches[0].pageX;


        if (x > window.innerWidth/2 && chase.dx === chase.speed) //Touch Right
            chase.dx = 0;
        if (x < window.innerWidth/2 && chase.dx === -chase.speed) //Touch Left
            chase.dx = 0;
        if (x < window.innerWidth/2 && chase.dx && chase.dx > 0) //Touch Left, Moving Right
            chase.dx = chase.speed;
        if (x < window.innerWidth/2 && chase.dx && chase.dx < 0) //Touch Right, Moving Left
            chase.dx = -chase.speed;
    });
}
else{
    window.addEventListener('keydown', function (event) {

        if(event.keyCode === 37){
            chase.dx = -chase.speed;
        }
        else if(event.keyCode === 39){
            chase.dx = chase.speed;
        }
        else {
            chase.dx = 0;
        }

    });

    window.addEventListener('keyup', function (event) {

        if (event.keyCode === 39 && chase.dx < 0)
            chase.dx = -chase.speed;
        if (event.keyCode === 39 && chase.dx > 0)
            chase.dx = 0;
        if (event.keyCode === 37 && chase.dx < 0)
            chase.dx = 0;
        if (event.keyCode === 37 && chase.dx > 0)
            chase.dx = chase.speed
    });
}

//////////////////////////////Game Loop/////////////////////////////////////

function startMenu() {

    requestAnimationFrame(startMenu);

    if (screen === 'start'){
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (drop === false){
            start.drawStartMenu();
        }
        if (instructions === true){
            if (drop === true){
                start.fall();
            }
        }
        if (start.y > window.innerHeight * 1.5){
            screen = 'game';
            restart();
            gameLoop();
        }
    }

    if(screen === 'instructions'){
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (drop === false){
            endGame.drawStomachAcheScreen('You have eaten too much chocolate!')
        }
        if (drop === true){
            endGame.fall();
        }
        if (endGame.y > window.innerHeight * 1.5){
            restart();
            gameLoop();
        }
    }

}

function gameLoop() {

    if (screen === 'game'){

        requestAnimationFrame(gameLoop);
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);

        collision(tampon, toTop.bind(null, tampon, -tampon.image.height * 3));
        collision(coca, toTop.bind(null, coca, -coca.image.height));
        collision(coffee, toTop.bind(null, coffee, -coffee.image.height * 2));
        collision(catFood, toTop.bind(null, catFood, -catFood.image.height * 1.5));

        movePastBottom(tampon, -tampon.image.height * 3);
        movePastBottom(coca, -coca.image.height);
        movePastBottom(coffee, -coffee.image.height * 2);
        movePastBottom(catFood, -catFood.image.height * 1.5);

        chase.updateGround();
        coca.updateFall();
        tampon.updateFall();
        coffee.updateFall();
        catFood.updateFall();
        speedup.updateFallCatch();
        yum.updateFallCatch();
        warn.updateFallCatch();

        scoreCard.scoreCardSlide();
    }
}

function tooMuchChocolate(){

    if (screen === 'tampon'){
        requestAnimationFrame(tooMuchChocolate);
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (drop === false){
            endGame.drawStomachAcheScreen('You ate a tampon.... Gross!')
        }
        if (drop === true){
            endGame.fall();
        }
        if (endGame.y > window.innerHeight * 1.5){
            restart();
            gameLoop();
        }
    }



    if(screen === 'stomachAche'){
        requestAnimationFrame(tooMuchChocolate);
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (drop === false){
            endGame.drawStomachAcheScreen('You have eaten too much chocolate!')
        }
        if (drop === true){
            endGame.fall();
        }
        if (endGame.y > window.innerHeight * 1.5){
            restart();
            gameLoop();
        }
    }
}

////////////////////////////////Called Functions///////////////////////////////////////////
window.onload = create();
window.onload = startMenu();





//////////////////////////////////////Old Code//////////////////////////////////////////////////////

// Mouse Listener
/*
    if(chase.x + chase.image.width * 0.6 >= x && chase.x + chase.image.width * 0.4 <= x){
        chase.dx = 0;
    }
    else if(x < chase.x ){
        chase.dx = -chase.speed;
    }
    else if(x > chase.x + chase.image.width){
        chase.dx = chase.speed;
    }
    */