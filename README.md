# Projeto 01: "frontend-nanodegree-arcade-game"

## Acesso o jogo 

  Para acessar o jogo, clone o repositório e depois abra o arquivo ```index.html``` existente dentro do diretório **arcade-game-master**:

      $ git clone https://github.com/msantosf/arcade-game-master.git

## Sobre o jogo

  O jogo consite no ideal do clássico de fliperama e atari: frogger. Nesse caso você controla um garoto que deve passar por baratas em movimento até a chegada na água.

  Ao chegar na água você vence o jogo!

## Sobre o código

  O projeto em questão tem como intuito o uso de classes e objetos para a criação do jogador e dos inimigos. Portanto, os arquivos ```engine.js``` e ```resources.js``` foram cedidos pela equipe da Udacity, sendo necessário apenas complementar e adicionar novas funções ao arquivo ```app.js```.

### Alterações feitas em ```app.js```

  Com grande parte da classe ```Enemy``` criada foi necessário apenas implementar mais algumas funcionalidades e incrementar algumas subclasses.

  Vale ressaltar que entendendo o funcionamento dessa classe, pode-se usar os conceitos atribuídos à ela para a criação do objeto que representará o jogador, no caso a classe ```Player```.

  Ainda no metódo construtor do ```Enemy``` vale ressaltar a criação de duas variáveis:

  ```coordX``` e ````coordY````

  Essas duas variáveis foram criadas para efetuar os testes necessários de colisão entre inimigo e jogador, já que as coordenadas do canvas seriam menos precisas para este fim. Tais variáveis são encontradas também em ```Player```.

  Como no jogo devem existir mais de um inimigo, criamos vários a partir de um array chamado ```allEnemies```.

  Para criar mais de um inimigo é feito:

  ```
  allEnemies.push(new Enemy(x, y,coordX,coordY, randomVelocidade()));
  ```

  A função ```randomVelocidade()``` cria um valor aleatório para ser atribuído e logo ser a taxa de atualização de movimentação do inimigo no jogo.

#### ```Enemy.prototype.update```

  Nessa subclasse a posição do inimigo é atualizada, juntamente com a velocidade que é definida pela função ```randomVelocidade()``` .

  Também é aqui que é garantido que o inimigo saia pela direita e reapareça na esquerda, atualizando tanto as coordenadas do canvas quanto a ```coordX```.

#### Criação da classe Player e subclasses

  Utilizando a classe e subclasses de```Enemy``` , foi criada a partir de então a classe ```Player```.

  A única variável não existente em ```Enemy``` que foi criada dentro do construtor foi a ```pontos```. O intuito dessa variável é ter uma pontuação que definirá qual será o modal que irá aparecer ao final do jogo.

  #### Subclasse ```handleInput```

  Esta classe é chamada dentro do evento ```document.addEventListerner('keyup', function (e))``` . Esse evento chama a classe, passando pra ela um objeto com os valores de evento das teclas de direção do teclado.

  Voltando a subclasse, o valor recebido como parâmetro é usado dentro de um ```switch``` onde são testados cada posição. Ao testar, é feita a atualiação dos valores ```x,y, coordX e coordY``` .

#### Subclasse ```update```

  Esta subclasse tem como responsabilidade chamar outras duas subclasses que seriam: ```checkCollisions()``` e ```checkVitoria()``` .

#### ```checkCollisions```

  Como implicito no nome da classe, tem como intuito verificar se o jogador esta na mesma posição que o inimigo. Caso esteja, o jogador volta a para a posição iniciar do jogo.

  Caso isso aconteça a variável ```pontos``` é decrementada.

  #### ```checkVitoria```

  Essa subclasse testa se a ```coordY``` do player é igual a 0, indicando assim que chegou ao objetivo do jogo.

  Caso verdade, chama duas funções: ```vitoria()``` e ```reset()```.

  A função ```vitoria()``` criará o modal que indicará ao usuário que ele ganhou o jogo.

  No entanto dentro da mesma é efetuado o teste de valor da variável ```pontos``` da classe ```PLayer```. De acordo com esse valor é demonstrado uma mensagem diferente dentro do modal.

  Por fim a classe ```reset()``` faz com que o jogador volte a posição inicial do jogo.
