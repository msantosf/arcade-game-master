let allEnemies = [];
// Inimigos que nosso jogador deve evitar
var Enemy = function(x, y, coordX, coordY, velocidade) {
    //Definindo posição x do Enemy no canvas
    this.x = x;
    //Definindo posição y do Enemy no canvas
    this.y = y;

    //coordenadas absolutas criadas para comparação
    this.coordX = coordX;
    this.coordY = coordY;

    //definindo velocidade
    this.velocidade = velocidade;
    //imagem do personagem
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    //Criando nova posição para o enemy
    //Novo x, será o próprio x + velocidade * delta
    this.x += this.velocidade * dt;

    //Atribuindo a coordenada absolutas coordX com base na posição x do mesmo no canvas
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

//criando Objeto Player
var Player = function (x,y, coordX, coordY) {
    //x e y do player no canvas
    this.x = x;
    this.y = y;

    //coordenadas absolutas do player para comparação com coordenadas do Enemy
    this.coordX = coordX;
    this.coordY = coordY;
    // Atribuindo imagem ao player
    this.sprite = 'images/char-boy.png';
    //criando uma variável 'pontos' para mudar a mensagem após vitória no jogo
    this.pontos = 5;
}

//Update chama checkCollisions e checkVitoria
Player.prototype.update = function(dt){
    // player.checkCollisions();
    player.checkVitoria();
}

//Desenha player na tela
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

//Definindo função que movimenta o player e ainda faz as altrações na coordX,coordY, x e y
Player.prototype.handleInput = function(direcao){
    switch (direcao) {
          //caso tecla para cima
          case 'up':
            //Se posição y === -15, não decrementar
            if (this.y !== -15) {
              this.y -= 80;
              this.coordY -=1;
            }
            break;
          //caso tecla para baixo
          case 'down':
            //Se posição y >= 385 não incrementar
            if ((this.y + 80) <= 385) {
              this.y += 80;
              this.coordY +=1;
            }
            break;
          //caso tecla para esquerda
          case 'left':
            //Se posição x === 0 , não decrementar
            if (this.x !== 0) {
                this.x -= 101;
                this.coordX -=1;
            }
            break;
          //caso tecla para direita
          case 'right':
            //Se posição x === 404, não incrementar
            if (this.x !== 404) {
                this.x += 101;
                this.coordX +=1;
            }
            break;
    }
}

//Função criada para checar se player foi encostado pelo Enemy
Player.prototype.checkCollisions = function(arrEnemy) {
    for (var i = 0; i < arrEnemy.length; i++) {
      //Se o Enemy estiver na mesma coordenada do player, jogador volta para posição inicial
      if((this.coordX === arrEnemy[i].coordX) && (this.coordY === arrEnemy[i].coordY)) {
          //chama função reset que coloca o player na posição inicial do jogo
          reset();
          //decrementa a pontos
          this.pontos --;
      }
    }
}

//Função que chama funções vitoria e reset
Player.prototype.checkVitoria = function () {
    if (this.coordY === 0) {
      vitoria();
      reset();
    }
}

// Criando objeto Player() e definindo a posição inicial do jogador
var player = new Player(202,385,2,5);

//Função que cria modal de acordo com os pontos do player
function vitoria() {
    const modal = document.getElementById('idModal');
    const mensagemModal = document.createElement('h1');
    const paragrafo = document.createElement('p');
    const btnReiniciar = document.createElement('button');
    btnReiniciar.innerHTML = '<span>Jogar de novo?</span>';
    const conteudoModal = document.querySelector('.modalContent');
    var modalVitoria = setInterval(function () {
        modal.style.display = 'block';

        //De acordo com o valor final da variável o texto dos modais são alterados
        if (player.pontos === 5) {
            mensagemModal.textContent = 'Excelente';
            paragrafo.textContent = 'Você conseguiu atravessar com todos esses obstaculos sem que nenhuma barata te pegasse!'
            conteudoModal.appendChild(mensagemModal);
            conteudoModal.appendChild(paragrafo);
        }

        if (player.pontos === 4) {
            mensagemModal.textContent = 'Muito Bom';
            paragrafo.textContent = 'As baratas te pegaram apenas 01 vez!';
            conteudoModal.appendChild(mensagemModal);
            conteudoModal.appendChild(paragrafo);
        }

        if (player.pontos <= 3) {
            mensagemModal.textContent = 'Você conseguiu ...';
            paragrafo.textContent = '... mas pode melhorar! As baratas te pegaram mais de 01 vez, mostre pra elas quem é que manda! Jogue novamente!';
            conteudoModal.appendChild(mensagemModal);
            conteudoModal.appendChild(paragrafo);
        }
        conteudoModal.appendChild(btnReiniciar);
    },250);
    btnReiniciar.onclick = function () {
        document.location.reload(true);
    }
}

//função que reseta a posição do player
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
