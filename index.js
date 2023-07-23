// GAME CONSTANTS AND VARIABLES

let inputDir = {x:0, y:0};
let foodSound=new Audio("Sounds/food_eating.mp3"); 
let gameOverSound=new Audio("Sounds/gameoversound.wav");
let moveSound=new Audio("Sounds/snake_turn.mp3");
let musicSound=new Audio("Sounds/bg_music.mp3");

let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr = [ {x:9,y:9} ]
food={x:6,y:7}

// let highScoreVal=localStorage.getItem(highScore);
// let highScoreElement=document.getElementById("highScore");

let inputElement = document.getElementById("level");
inputElement.addEventListener("input", function() {
    let inputValue = inputElement.value;
    if(inputValue!=null){
        speed=inputValue;
    }
    // console.log("Input value changed:", inputValue);
  });

musicSound.play();
// if(foodSound.pause) foodSound.play();
// btn.addEventListener("click",()=>{
//     musicSound.play();
// //     // moveSound.play();
    
// })

// GAME FUNCTIONS
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollidde(snake){

    // if snake collide in itself

    for(let i=1;i<snakeArr.length ;i++){
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y){
            return true;
        }
    }

    // if snake collides into walls
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
        return true;
    }
    
    return false;
}

function gameEngine(){
    //part 1: updating the snake array & food
    if(isCollidde(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        let msg="Your score is : "+score+"\nGame Over !! Press any key to start the game again! "
        // alert("Your score is : "+score);
        // alert("Game Over !! Press any key to start the game again!");
        alert(msg);
        snakeArr = [ {x:9,y:9} ];
        musicSound.play();
        score=0;
        document.getElementById("score").innerHTML="Score : "+score;
    }

    // If snake has eatten food increment score and update food

    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        score+=1;
        if(score>highScoreVal){
            highScoreVal=score;
            localStorage.setItem("highscore",JSON.stringify(highScoreVal));
            let highScoreElement=document.getElementById("highScore");
            highScoreElement.innerHTML="High Score : "+highScoreVal;
        }
        document.getElementById("score").innerHTML="Score : "+score;
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x , y: snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food= {x : Math.round(a+(b-a)*Math.random()) ,y : Math.round(a+(b-a)*Math.random()) };
        
    }

    // Moving the snake

    for(let i=snakeArr.length -2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    

    //part 2: display the snake and food
    
    // display the snake
    // board.innerHtml= "" ;
    document.getElementById("board").innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);

    });

    // display the food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);
}



// MAIN GAME LOGIC
musicSound.play();

let highscore=localStorage.getItem("highscore");
if(highScore===null){
    highScoreVal=0;
    localStorage.setItem("highscore",JSON.stringify(highScoreVal));
}
else{
    highScoreVal=JSON.parse(highscore);
    let highScoreElement=document.getElementById("highScore");
    highScoreElement.innerHTML="High Score : "+highScoreVal;

}

window.requestAnimationFrame(main);

window.addEventListener("keydown",e=>{
    inputDir={x:0 , y:1} // Start the Game
    // console.log("key pressed");

    switch(e.key){

        case "ArrowUp":
            moveSound.play();
            // console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            moveSound.play();
            // console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            moveSound.play();
            // console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            moveSound.play();
            // console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break; 

        default:
            break;  
    }
});