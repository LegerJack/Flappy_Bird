let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let pipeUp = new Image();
let pipeDown = new Image();
let fg = new Image();

bird.src = "img/bird.png";
bg.src = "img/background_flapp.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeDown.src = "img/flappy_bird_pipeBottom.png";

//Звуковые файлы
let fly = new Audio();
let score_aduio = new Audio();

fly.src = "audio/fly.mp3";
score_aduio.src = "audio/score.mp3";

let gap = 90;
//При нажатии на кнопку

let pause = false;
let restart;
document.addEventListener("keydown", moveUp);

function moveUp(event) {
    if (event.keyCode === 32 || event.keyCode === 38) {
        yPos -= 20;
        fly.play();
    }
    else if (event.keyCode === 27) {
        pause = !pause;
    }
}
//Создание блоков
let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

let score = 0;
//Позиция птички
let xPos = 10;
let yPos = 150;
let grav = 2;
function draw() {
    if (pause) {
        ctx.fillText("Пауза", cvs.width / 2.5, cvs.height / 2);
        return;
    }
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        //Столкновение птицы
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); //Перезапуск игры
        }
        if (pipe[i].x == 5) {
            score++;
            score_aduio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#A00";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeDown.onload = draw;