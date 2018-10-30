let allEnemies = [];
// Inimigos que nosso jogador deve evitar
var Enemy = function(x, y, coordX, coordY, velocidade) {
    //Definindo posição x do Enemy
    this.x = x;
    //Definindo posição y do Enemy
    this.y = y;

    this.coordX = coordX;
    this.coordY = coordY;
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

    if (this.x >= 0 && this.x < 101) {
        this.coordX = 0;
    }
    if (this.x >=101 && this.x < 202) {
        this.coordX = 1;
    }
    if (this.x >= 202 && this.x < 303) {
        this.coordX = 2;
    }
    if (this.x >= 303 && this.x < 404) {
        this.coordX = 3;
    }
    if (this.x >= 404 && this.x < 505) {
        this.coordX = 4;
    }
    //Testando se inimigo chegou ao final do Canvas
    if(this.x > 505){
      //Se True, Enemy volta para posição inicial
      this.x = -100;
      this.coordX = null;
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
    return Math.floor(Math.random() * (max - min) + min);
}

//Criando array para armazenar os inimigos
allEnemies.push(new Enemy(-100, 50.5,0,1, randomVelocidade()));
allEnemies.push(new Enemy(-100, 140.5,0,2, randomVelocidade()));
allEnemies.push(new Enemy(-100, 225.5,0,3, randomVelocidade()));


var Player = function (x,y, coordX, coordY) {
    this.x = x;
    this.y = y;
    this.coordX = coordX;
    this.coordY = coordY;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt){
    player.checkCollisions();
    player.checkVitoria();
}

//Desenha player na tela
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

Player.prototype.handleInput = function(direcao){
    let valor;
    switch (direcao) {
          //caso tecla para cima
          case 'up':
            console.log('Tecla pra cima');
            //Se posição y === -15, não decrementar
            if (this.y !== -15) {
              this.y -= 80;
              this.coordY -=1;
            }
            break;
          //caso tecla para baixo
          case 'down':
            console.log('Tecla pra baixo');
            //Se posição y >= 385 não incrementar
            if ((this.y + 80) <= 385) {
              this.y += 80;
              this.coordY +=1;
            }
            break;
          //caso tecla para esquerda
          case 'left':
            console.log('Tecla para esquerda');
            //Se posição x === 0 , não decrementar
            if (this.x !== 0) {
                this.x -= 101;
                this.coordX -=1;
            }
            break;
          //caso tecla para direita
          case 'right':
            console.log('Tecla para direita');
            //Se posição x === 404, não incrementar
            if (this.x !== 404) {
                this.x += 101;
                this.coordX +=1;
            }
            break;
    }
}

Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
      //Se o Enemy estiver na mesma coordenada do player, jogador volta para posição inicial
      if((this.coordX === allEnemies[i].coordX) && (this.coordY === allEnemies[i].coordY)) {
          console.log('Colidiram!');
          this.x = 202;
          this.y = 385;
          this.coordX = 2;
          this.coordY = 5;
      }
    }
}

Player.prototype.checkVitoria = function () {
    if (this.coordY === 0) {
      vitoria();
      reset();
    }
}

// Criando objeto Player() e definindo a posição inicial do jogador
var player = new Player(202,385,2,5);

function vitoria() {
    const modal = document.getElementById('idModal');
    const tituloModal = document.createElement('h1');
    const btnReiniciar = document.createElement('button');
    btnReiniciar.innerHTML = '<span>Reiniciar jogo?</span>';
    const conteudoModal = document.querySelector('.modalContent');
    var modalVitoria = setInterval(function () {
        modal.style.display = 'block';
        tituloModal.textContent = 'Vencedor!!!';
        conteudoModal.appendChild(tituloModal);
        conteudoModal.appendChild(btnReiniciar);
    },250);
    btnReiniciar.onclick = function () {
        document.location.reload(true);
    }
}

function reset() {
    player.x = 202;
    player.y = 385;
    player.coordX = 2;
    player.coordY = 5;
}

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
