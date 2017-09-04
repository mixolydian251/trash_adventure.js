var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var gravity = 9.8;
var score = 0;
var ache = 3;
var acheText = ['', 'I can\'t take anymore!', 'Rumbling Tummy', 'Feeling Great!' ];
var screen = 'start';
var drop = false;

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
        if(this.x < -55 ){
            this.x += this.speed;
            this.draw()
        }
        else if(this.x > window.innerWidth - 150){
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
        c.strokeStyle = "rgba(20,20,20,0.7";
        c.lineWidth   = 5;
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
        c.fillStyle = "rgba(250,250,250,0.9";
        this.image = c.fillRect(this.x, this.y, this.width, this.height);
        c.strokeStyle = "rgba(20,20,20,0.9";
        c.lineWidth   = 5;
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.fillStyle = '#1a2537';
        c.textAlign = 'center';
        c.font = "bold 70px Verdana";
        if(window.innerHeight > window.innerWidth){
            c.fillText("Rotate Your", window.innerWidth/2 , this.y + (0.45 * this.height));
            c.fillText("Phone Sideways!", window.innerWidth/2 , this.y + (0.45 * this.height) + 85);
        }
        else{
            c.font = "bold 45px Verdana";
            c.fillText("Chase's Trash Adventure", window.innerWidth/2 , this.y + (0.25 * this.height));
            c.fillStyle = '#e12417';
            c.font = "bold 36px Verdana";
            c.fillText("Click anywhere to play!", window.innerWidth/2 , this.y + this.height - 28);
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



var chase = new GamePiece('chase200.png', window.innerWidth/2 - 150, window.innerHeight - 165, 0, 0, 3);
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
    if (object.x >= chase.x  && object.x <= chase.x + chase.image.width) {
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
    chase = new GamePiece('chase200.png', window.innerWidth/2 - 150, window.innerHeight - 165, 0, 0, 3);
    tampon = new GamePiece('tampon.png', -100, window.innerHeight - 90, 0, 0, 0);
    coffee = new GamePiece('coffee.png', -100, window.innerHeight - 90, 0, 0, 0);
    coca = new GamePiece('coca.png', -100, window.innerHeight - 90, 0, 0, 0);
    catFood = new GamePiece('catfood.png', -100, window.innerHeight - 90, 0, 0, 0);
    speedup = new GamePiece('speedup2.png', -100, 0, 0, 0, 0);
    warn = new GamePiece('warn2.png', -100, 0, 0, 0, 0);
    yum = new GamePiece('yum3.png', -100, 0, 0, 0, 0);
    scoreCard = new UI(-(window.innerWidth * 0.29), window.innerHeight * .015, 0, 0, window.innerWidth * 0.28, window.innerHeight * 0.15);
    endGame = new UI(100, 100, 0, 0, window.innerWidth - 200, window.innerHeight - 200);
    start = new UI(100, 100, 0, 0, window.innerWidth - 200, window.innerHeight - 200);
}


///////////////////////////////Event Listeners/////////////////////////////////////

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    restart();
});




//////////////////////////////Game Loop/////////////////////////////////////

function startMenu() {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.addEventListener('touchstart', function () {
            start.dy = -3;
            drop = true;
        });
    }
    else{
        window.addEventListener('click', function (e) {
            e.preventDefault();
            start.dy = -3;
            drop = true;
        });
    }


    requestAnimationFrame(startMenu);

    if (screen === 'start'){
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (drop === false){
            start.drawStartMenu();
        }
        if (drop === true){
            start.fall();
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

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            window.addEventListener('touchstart', function (e) {
                e.preventDefault();
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
                e.preventDefault();
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

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.addEventListener('touchstart', function () {
            endGame.dy = -3;
            drop = true;
        });
    }
    else{
        window.addEventListener('click', function (e) {
            e.preventDefault();
            endGame.dy = -3;
            drop = true;
        });
    }



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