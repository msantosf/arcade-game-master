let allEnemies = [];
// Inimigos que nosso jogador deve evitar
var Enemy = function(x, y, velocidade) {
    //Definindo posição x do Enemy
    this.x = x;
    //Definindo posição y do Enemy
    this.y = y;
    //definindo velocidade
    this.velocidade = velocidade;
    //imagem do personagem
    this.sprite = 'images/enemy-bug.png';
};

// Atualize a posição do inimigo, método exigido pelo jogo
// Parâmetro: dt, um delta de tempo entre ticks
Enemy.prototype.update = function(dt) {
    //Criando nova posição para o enemy
    //Novo x, será o próprio x + velocidade * delta
    this.x += this.velocidade * dt;

    //Testando se inimigo chegou ao final do Canvas
    if(this.x > 505){
      //Se True, Enemy volta para posição inicial
      this.x = 0;
    }
};

// Desenhe o inimigo na tela, método exigido pelo jogo
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Criando função para gerar uma velocidade aleatória de 100 à 600
function randomVelocidade () {
    let min = 100;
    let max = 600;
    Math.ceil(min);
    Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//Criando array para armazenar os inimigos
allEnemies.push(new Enemy(-100, 50.5, randomVelocidade()));
allEnemies.push(new Enemy(-100, 140.5, randomVelocidade()));
allEnemies.push(new Enemy(-100, 225.5, randomVelocidade()));

// Esta classe exige um método update(),
// um render() e um handleInput().

var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt){

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

Player.prototype.handleInput = function(){

}

// Criando objeto Player() e definindo a posição inicial do jogador
var player = new Player(202,404);

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
