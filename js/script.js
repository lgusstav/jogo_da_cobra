//declarando as variaveis 
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let cobra = [];
cobra[0] = {
    x: 8 * box,
    y: 8 * box
}
let pontos = 0;



//funcção que cria as pedras
function DrawRock(){
    if(pontos >= 3){
        context.fillStyle = "black";
        context.fillRect(rock.x, rock.y, box, box);
    }

}
function DrawRock2(){
    if(pontos >= 6){
        context.fillStyle = "black";
        context.fillRect(rock2.x, rock2.y, box, box);
    }

}
function DrawRock3(){
    if(pontos >= 9){
        context.fillStyle = "black";
        context.fillRect(rock3.x, rock3.y, box, box);
    }

}



//variavel que indica, a direção que a cobrinha começará 
let direction = "right";

//variavel da maçã e da pedra
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let rock = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let rock2 = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let rock3 = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// função que cria o background
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

//função que cria a cobrinha
function criarcobrinha(){
   for(i=0; i < cobra.length; i++){
       context.fillStyle = "green";
       context.fillRect(cobra[i].x, cobra[i].y, box, box);
   }
}

//função que cria as maçãs
function DrawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//recebe a informação da tecla e depois executa a função "update"
document.addEventListener('keydown', update);

//função que cria o evento da cobra se movendo a partir das teclas
function update (event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

//aqui esta tudo que sera executado assim que o jogo se iniciar
function iniciarjogo(){

    //codicionais que permitem que a cobra atravesse a parede e da uma "volta" no BG
    if( cobra[0].x > 15 * box && direction == "right") cobra[0].x = 0; 
    if( cobra[0].x < 0 && direction == "left") cobra[0].x = 16 * box; 
    if( cobra[0].y > 15 * box && direction == "down") cobra[0].y = 0; 
    if( cobra[0].y < 0 && direction == "up") cobra[0].y = 16 * box; 

    
    //condicional que mostra a mensagem "game over" e finaliza o jogo, caso a cobra encoste no proprio corpo
    for(i = 1; i < cobra.length; i++ ){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            clearInterval(jogo);
            alert('Game Over');
        }
    }

    //condicional que mostra a mensagem "Parabens, você ganhou!" caso consiga alcansar 12 pontos
    if( pontos >= 12){
        clearInterval(jogo);
        setTimeout(() => {alert('Parabens, você ganhou!');}, 200);
    }

    //chamada das funções
    criarBG();
    criarcobrinha();
    DrawFood();
    DrawRock();
    DrawRock2();
    DrawRock3();

    //variavel para a posição da cobra
    let cobraX = cobra[0].x;
    let cobraY= cobra[0].y;

    //condicionais que indicam a direção na qual sera adicionado os "blocos" que constroem a cobra
    if(direction == "right") cobraX += box;
    if(direction == "left") cobraX -= box;
    if (direction == "up") cobraY -= box;
    if(direction == "down") cobraY += box;


    //condição para o crescimento da cobra e adicionamento de pontos
    if(cobraX != food.x || cobraY != food.y){
        cobra.pop();
    } 
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        pontos++;
        document.getElementById("pontos").innerHTML = pontos;
    }

    //essa condição serve para verificar se a cobrinha bateu na pedra e caso bata finaliza o jogo
    if( (cobraX == rock.x &&  cobraY == rock.y) && pontos>=3 ){
        clearInterval(jogo);
        setTimeout(() => {alert('Game Over');}, 200);
        
    }
    if( (cobraX == rock2.x &&  cobraY == rock2.y) && pontos>=6 ){
        clearInterval(jogo);
        setTimeout(() => {alert('Game Over');}, 200);
        
    }
    if( (cobraX == rock3.x &&  cobraY == rock3.y) && pontos>=9 ){
        clearInterval(jogo);
        setTimeout(() => {alert('Game Over');}, 200);
        
    }

    // variavel da cabeça da cobra
    let newHead = {
        x: cobraX,
        y: cobraY
    }
 
    //adiciona o novo "bloco" ao corpo da cobra
    cobra.unshift(newHead);

}

//Renova a função "iniciarjogo" a cada 100 milissegundos, para evitar travamentos
let jogo = setInterval( iniciarjogo, 100);

