let allEnemies = [];
// Inimigos que nosso jogador deve evitar
var Enemy = function(x, y, velocidade) {
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.

    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.

    //Definindo posição x do Enemy
    this.x = x;
    //Definindo posição y do Enemy
    this.y = y;
    //definindo velocidade
    this.velocidade = velocidade;
    this.sprite = 'images/enemy-bug.png';
};

// Atualize a posição do inimigo, método exigido pelo jogo
// Parâmetro: dt, um delta de tempo entre ticks
Enemy.prototype.update = function(dt) {
    // Você deve multiplicar qualquer movimento pelo parâmetro
    // dt, o que garantirá que o jogo rode na mesma velocidade
    // em qualquer computador.
    this.x += this.velocidade * dt;

    //Testando se inimigo chegou ao final do Canvas
    if(this.x > 505){
      this.x = 0;
    }
};

// Desenhe o inimigo na tela, método exigido pelo jogo
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Criando mais de um inimigo
allEnemies.push(new Enemy(-10, 150, Math.floor(Math.random() * 8) + 2));
allEnemies.push(new Enemy(-10, 250, Math.floor(Math.random() * 8) + 2));

// Agora, escreva sua própria classe de jogador
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

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

var player = new Player();

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
