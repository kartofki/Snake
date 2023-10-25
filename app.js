const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');


const width = canvas.width
const height = canvas.height;
const gridSize = width / 20;

//start screen

let timer = null;

//initial coordinates of the snake and apple + tail (empty array)
const snake = {
    x: 10,
    y: 10
}

let size = 3;
const tail = []


const apple = {
    x: 5,
    y: 5
}

const goldenApple = {
   x: 7,
   y: 7
}

//directions
const speed = {
    x: 1,
    y: 0
}

const inputSpeed = {
    x: 1,
    y: 0
}
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if(speed.y == 0){
            inputSpeed.y = -1;
            inputSpeed.x = 0;
            }            
            break;
        case 'ArrowDown':
            if(speed.y == 0){
                inputSpeed.y = 1;
                inputSpeed.x = 0;
                }  
            break;
        case 'ArrowLeft':
            if(speed.x == 0){
                inputSpeed.y = 0;
                inputSpeed.x = -1;
                }      
            break;
        case 'ArrowRight':
            if(speed.x == 0){
                inputSpeed.y = 0;
                inputSpeed.x = 1;
                }  
            break;
    }
    btn.addEventListener('click', main)
    main()
})

//deletes everything
function clear() {
    ctx.clearRect(0, 0, width, height)
}

//grid 20 x 20
function drawGrid() {
    ctx.beginPath();
    ctx.strokeStyle = '#c8cbcc'

    for (let x = 1; x < 20; x++) {
        ctx.moveTo(x * gridSize, 0)
        ctx.lineTo(x * gridSize, height);
    }
    for (let y = 1; y < 20; y++) {
        ctx.moveTo(0, y * gridSize)
        ctx.lineTo(height, y * gridSize);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.font = "50px serif"
    let score = "Score: " + (size - 3);
    ctx.fillStyle = 'blue';
    ctx.fillText(score, 300, 780);


}

//squares

function rect(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x * gridSize + 1, y * gridSize + 1, 38, 38)
    ctx.strokeStyle = "black"
    ctx.strokeRect(x * gridSize + 1, y * gridSize + 1, 38, 38)
}



//tail movement
function tick(){
    tail.push({
        x: snake.x,
        y: snake.y
    })


    while(tail.length > size){
        tail.shift()
    }
    speed.x = inputSpeed.x
    speed.y = inputSpeed.y
    snake.x += speed.x;
    snake.y += speed.y
    
    //wrap

    if(snake.x == -1){
        snake.x = 19
    }

    if(snake.x == 20){
        snake.x = 0
    }

    if(snake.y == 20){
        snake.y = 0
    }

    if(snake.y == -1){
        snake.y = 19
    }

    //game over if u eat ur tail
    for(let segment of tail){
        if(segment.x == snake.x && segment.y == snake.y){
            gameOver()
        }
    }

    //grow if u eat apple

    if (snake.x == apple.x && snake.y == apple.y){
        size++
        spawnApple()
    }

    if (snake.x == goldenApple.x && snake.y == goldenApple.y){
        size+=3
        spawnGoldenApple()
        clearInterval(timer)
        timer = setInterval(main, 200)
    }

    if(timer != null){
        clearInterval(timer)
    }
   if(size < 7){
       clearInterval(timer)
        
       timer = setInterval(main, 250)
    }
    else if(size >= 7 || size < 15){
        clearInterval(timer)
       
        timer = setInterval(main, 200)
   }
   else if(size >= 15 || size < 25){
       clearInterval(timer)
       
    timer = setInterval(main, 150)
}
else if(size >= 25 || size < 35){
    clearInterval(timer)
       
    timer = setInterval(main, 125)
}
else if(size >= 35){
    clearInterval(timer)
        
    timer = setInterval(main, 80)
}


}

//apple spawn
function spawnApple(){
    apple.x = Math.floor(Math.random() * 20)
    apple.y = Math.floor(Math.random() * 20)

    for(let square of tail){
        if(square.x == apple.x && square.y == apple.y){
            spawnApple()
        }
    }
}

//golden apple spawn

function spawnGoldenApple(){
    goldenApple.x = Math.floor(Math.random() * 20)
   goldenApple.y = Math.floor(Math.random() * 20)

    for(let square of tail){
      if(square.x == goldenApple.x && square.y == goldenApple.y){
            spawnGoldenApple()
        }
    }

    setTimeout(() => {
        
    ctx.clearRect(goldenApple.x * 20, goldenApple.y * 20, 20, 20);

        
        const randomInterval = Math.floor(Math.random() * 1000) + 1000; // Random interval 
        setTimeout(spawnGoldenApple, randomInterval);
    }, 5000); // 7000 milliseconds (7 seconds)
}

//const initialSpawnDelay = Math.floor(Math.random() * 3000) + 1000; 
      //  setTimeout(spawnGoldenApple, initialSpawnDelay);

function drawScene() {
   
    clear();
    drawGrid();
    rect(snake.x, snake.y, '#23571d')

    for(let square of tail){
        rect(square.x, square.y, '#3e8037')
    }

    rect(apple.x, apple.y, 'red')
   
    rect(goldenApple.x, goldenApple.y, 'gold')
    
}

function main(){
    tick()
    drawScene()
    
}

//game starts
function start() {
    if(timer != null){
        clearInterval(timer)
    }
    snake.x = 10;
    snake.y = 10;
    size = 3;
    tail.length = 0;
    speed.x = 1;
    speed.y = 0;
    spawnApple()
    
  
    timer = setInterval(main, 200)
    
  
}


   

//
//game ends
//make this better
function gameOver(){
    const choice = confirm(`Game over! Your score: ${size - 3}. Play again?`)

    if(choice == true){
        start()
    }
}


