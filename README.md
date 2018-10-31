# Projeto 01: "frontend-nanodegree-arcade-game"
================================================

## Sobre o jogo

  O jogo consite no ideal do clássico de fliperama e atari: frogger. Nesse caso você controla um garoto que deve passar por baratas em movimento até a chegada na água.

  Ao chegar na água você vence o jogo!

## Sobre o código

  O projeto em questão tem como intuito o uso de classes e objetos para a criação do jogador e dos inimigos. Portanto, os arquivos ```engine.js``` e ```resources.js``` foram cedidos pela equipe da Udacity, sendo necessário apenas complementar e adicionar novas funções ao arquivo ```app.js```.

### Alterações feitas em ```app.js```

  Com grande parte do classe ```Enemy``` criado foi necessário apenas implementar mais algumas funcionalidades e incrementar algumas subclasses.

  Vale ressaltar que entendendo o funcionamento dessa classe, pode-se usar os conceitos atribuídos à ele para a criação do objeto que representará o jogador, no caso o classe ```Player```.

  Ainda no metódo construtor do ```Enemy``` vale ressaltar a criação de duas variáveis:

  ```coordX``` e ````coordY````

  Essas duas variáveis foram criadas para efetuar os testes necessários de colisão entre inimigo e jogador já que as coordenadas do canvas seriam menos precisas para o mesmo. Variáveis encontradas também em ```Player```.

  Como no jogo devem existir mais de um inimigo, criamos vários a partir de um array chamado ```allEnemies```. Para criar mais de um inimigo é feito:

  ```
  allEnemies.push(new Enemy(x, y,coordX,coordY, randomVelocidade()));
  ```

  A função ```randomVelocidade()``` cria um valor aleatório para ser atribuído e logo ser a taxa de atualização de movimentação do inimigo no jogo.

#### ```Enemy.prototype.update```

  Nessa subclasse a posição do inimigo é atualizada, juntamento com a velocidade que é definida pela função ```randomVelocidade()``` .

  Também é aqui que é garantido que o inimigo saia pela direita e reapareça na esquerda, atualizando tanto as coordenadas do canvas quanto a ```coordX```.

#### Criação do classe Player e subclasses

  Utilizando








Os alunos devem usar esta [rubrica](https://review.udacity.com/#!/rubrics/436/view) para fazer uma autoavaliação de seu projeto. Certifique-se de que as funções que escreveu sejam **orientadas a objetos** - tanto funções de classe (como Player e Enemy) como funções de protótipo de classe, como Enemy.prototype.checkCollisions, e que a palavra-chave 'this' seja usada de maneira correta em suas funções de classe e de protótipo de classe para se referir ao objeto que faz a chamada da função. Certifique-se, também, de que o arquivo **readme.md** esteja atualizado com suas instruções, tanto sobre rodar quanto sobre como jogar o fliperama clássico.

Para ver instruções detalhadas sobre como começar, confira este [guia](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
