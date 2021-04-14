window.onload = function(){
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush); // Set key push
    document.getElementById("score").innerHTML = 0;
    setInterval(game, 100);
    
}

snakeX = snakeY = 10; // init pos of snake
foodX = foodY = 15; // init pos of food
gs = tc = 20; //frame size
xv = yv = 0;
trail = [];
tail = 1;
score = 0;

function game() {

    snakeX += xv;
    snakeY += yv;
    if(snakeX < 0){
        snakeX = tc - 1;
    }
    if(snakeX > tc - 1){
        snakeX = 0;
    }
    if(snakeY < 0){
        snakeY = tc - 1;
    }
    if(snakeY > tc - 1){
        snakeY = 0;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "Turquoise";
    for(var i = 0; i < trail.length; i++){
        ctx.fillRect( trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if( trail[i].x == snakeX && trail[i].y == snakeY){ // eat tail
            tail = 5;
            score = 0;
            document.getElementById("score").innerHTML = score;
        }
    }

    trail.push({
        x: snakeX, y: snakeY
    })

    while (trail.length > tail) {
        trail.shift();
    }

    if(foodX == snakeX && foodY == snakeY){ // snake eaten
        tail++; // add tail
        document.getElementById("score").innerHTML = ++score;
        foodX = Math.floor(Math.random() * tc); // set new cherry in x
        foodY = Math.floor(Math.random() * tc); // set new cherry in y
    }

    ctx.fillStyle = "OrangeRed";
    ctx.fillRect( foodX * gs, foodY * gs, gs - 2, gs - 2);
    
}


function keyPush(event){
    console.log(event)
    switch (event.keyCode) {
        case 37:
            xv = -1;
            yv = 0;
            break;
        case 38:
            xv = 0;
            yv = -1;
            break;
        case 39:
            xv = 1;
            yv = 0;
            break;
        case 40:
            xv = 0;
            yv = 1;
            break;
    }
}