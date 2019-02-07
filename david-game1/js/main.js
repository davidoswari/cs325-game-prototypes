"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

 var game = new Phaser.Game(1136, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update });

function preload() {
    game.load.spritesheet('adventurer','./assets/adventurer.png',50,37);
    game.load.spritesheet('adventurer2','./david-game1/assets/adventurer2.png',50,37);
    game.load.image('ground','./david-game1/assets/platform.png');
    game.load.image('background','./david-game1/assets/background2.jpg');
    game.load.audio('music', './david-game1/assets/music.mp3');
    game.load.audio('jump','./david-game1/assets/jump.mp3');



}
    var cursors;
    var wasd;
    var style;
    var style2;
    var spacekey;


    var player1;
    var player1health;
    var facingRight= true;
    var attacking=false;
    var text1;
    var dead1=false;
    var energy1=100;

    var player2;
    var player2health;
    var facingRight2= true;
    var attacking2=false;
    var text2;

    var dead2=false;
    var energy2 = 100;
    var text3;
    var text4;
    var text5;
    var text6;
    var text7;
    var sounds;
    var jump;
    var platforms;


function create() {
    sounds = game.add.audio('music');
    sounds.play();
    jump = game.add.audio('jump');



    //add physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'background');

    //map stuff
    platforms = game.add.group();
    platforms.enableBody=true;
    var ground = platforms.create(0, game.world.height - 30, 'ground');
    ground.scale.setTo(4, 1);
    ground.body.immovable = true;
    ground.visible=false;

    var ledge = platforms.create(200, game.world.height - 200, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(500, game.world.height - 100, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(600, game.world.height - 300, 'ground');
    ledge.body.immovable = true;


    //player 1 stuff
    player1 = game.add.sprite(32,game.world.height - 300, 'adventurer');
    player1.animations.add('idle', [38 ,39, 40, 41], 10, true);
    player1.animations.add('right', [8, 9, 10, 11,12,13], 10, true);

    player1.animations.add('attack',[42,43,44,45,46,47],15,true);
    player1.animations.add('attack2',[48,49,50,51,52],15,true);
    player1.animations.add('attack3',[53,54,55,56,57],15,true);

    player1.animations.add('jump',[16,17,18,19,20,21],10,true);
    game.physics.arcade.enable(player1);
    player1.body.gravity.y = 300;
    player1.body.collideWorldBounds = true;
    player1health = 150;
    player1.body.setSize(30, 30, 0, 0);
    player1.anchor.setTo(.5,.5);
        player1.animations.add('die',[63,64,65,66,67,68],10,true);


    //player 2 stuff
    player2 = game.add.sprite(600,game.world.height - 300, 'adventurer2');
    player2.animations.add('idle', [38 ,39, 40, 41], 10, true);
    player2.animations.add('right', [8, 9, 10, 11,12,13], 10, true);

    player2.animations.add('attack',[42,43,44,45,46,47],15,true);
    player2.animations.add('attack2',[48,49,50,51,52],15,true);
    player2.animations.add('attack3',[53,54,55,56,57],15,true);

    player2.animations.add('jump',[16,17,18,19,20,21],10,true);
    game.physics.arcade.enable(player2);
    player2.body.gravity.y = 300;
    player2.body.collideWorldBounds = true;
    player2health = 150;
    player2.body.setSize(30, 30, 0, 0);
    player2.anchor.setTo(.5,.5);
    player2.animations.add('die',[63,64,65,66,67,68],10,true);






    //collision detection
    game.physics.enable([player1,player2], Phaser.Physics.ARCADE);





    //keyboard controls
    cursors = game.input.keyboard.createCursorKeys();
    spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    wasd = {
    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    attack: game.input.keyboard.addKey(Phaser.Keyboard.F),
    };


    //text
    style = { font: "20px Courier", fill: "#fff", tabs: 132 };
    style2 = { font: "50px Courier", fill: "#fff", tabs: 132 };
    text1 = game.add.text(10, 32, "Player 1 Health: 100", style);
    text2 = game.add.text(600, 32, "Player 2 Health: 100", style);
    text3 = game.add.text(10, 64, "Player 1 Energy: 100", style);
    text4 = game.add.text(600, 64, "Player 2 Energy: 100", style);
    text5 = game.add.text(10, 0, "Player 1 Controls: ARROWS + SPACEBAR", style);
    text6 = game.add.text(600, 0, "Player 2 Controls: WASD + F", style);
    text7 = game.add.text(300, 300, "", style2);



    //timer events
    game.time.events.repeat(Phaser.Timer.SECOND * 1, Infinity, increaseEnergy, this);
    game.time.events.repeat(Phaser.Timer.SECOND * 2, Infinity, heal, this);

}


function checkOverlap(spriteA, spriteB)
{

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function increaseEnergy()
{
        if(energy1<100)
            {
            energy1+=50;
            }
        if(energy2<100)
            {
            energy2+=50;
            }
    }


function heal()
{
    if(player1health<50)
player1health+=1;
    if(player2health<50)
player2health+=1;

}


function update() {

    //text updates
    text1.setText("Player 1 Health: " + player1health);
    text2.setText("Player 2 Health: " + player2health);
    text3.setText("Player 1 Energy: " + energy1);
    text4.setText("Player 2 Energy: " + energy2);



    //attack checks
    if (checkOverlap(player1, player2))
    {
        if(attacking == true){
        player2health-=1;
            }
        if(player2health<=0){
        player2.body.velocity.x = 0;
        player2.body.velocity.y = 0;
        attacking2=false;
        player2.animations.play('die');
        player2.animations.stop();
        player2.frame = 68;
                text7.setText("Player 1 wins!!!");
            dead2=true;
        }


        if(attacking2 == true){
        player1health-=1;
            }
        if(player1health<=0){
        player1.body.velocity.x = 0;
        player1.body.velocity.y = 0;
        attacking=false;
        player1.animations.play('die');
        player1.animations.stop();
        player1.frame = 68;
        text7.setText("Player 2 wins!!!");
            dead1=true;

        }
    }


    //walk on platforms
var hitPlatform = game.physics.arcade.collide(player1, platforms);
var hitPlatform2 = game.physics.arcade.collide(player2, platforms);

    if(!dead1)
    {
    //PLAYER ONE STUFF************************************************************************************
 player1.body.velocity.x = 0;
    //left jump
    if (cursors.up.isDown && cursors.left.isDown && player1.body.touching.down && hitPlatform)
    {
        attacking = false;
        if(facingRight==true)
            {
                facingRight = false;
                player1.anchor.setTo(.5,.5);
                player1.scale.x = -1;


            }

        player1.animations.play('right');
        player1.body.velocity.x = -200;
        player1.body.velocity.y = -300;
        jump.play();
    }
    //right jump
     else if (cursors.up.isDown && cursors.right.isDown && player1.body.touching.down && hitPlatform)
    {
        attacking = false;
          if(facingRight==false)
            {
                facingRight= true;
                player1.anchor.setTo(.5,.5);
                player1.scale.x = 1;
            }
        player1.animations.play('right');
        player1.body.velocity.x = 200;
        player1.body.velocity.y = -300;
        jump.play();
    }

    //right
    else if (cursors.right.isDown)
    {
        attacking= false;
        if(facingRight==false)
            {
                facingRight = true;
                player1.anchor.setTo(.5,.5);
                player1.scale.x = 1;
            }

                player1.body.velocity.x = 200;
                player1.animations.play('right');
    }

    //left
    else if (cursors.left.isDown)
        {
            attacking = false;
        if(facingRight==true)
            {
                facingRight = false;
                player1.anchor.setTo(.5,.5);
                player1.scale.x = -1;

            }
            player1.body.velocity.x = -200;
            player1.animations.play('right');

        }
    //jump
       //  Allow the player to jump if they are touching the ground.
    else if (cursors.up.isDown && player1.body.touching.down && hitPlatform)
    {
        attacking = false;
        player1.body.velocity.y = -300;
        player1.animations.play('right');
        jump.play();
    }
    //attack
    else if(spacekey.isDown && energy1 >=5)
           {
               attacking = true;
               //player1.animations.play('attack');
               //player1.animations.play('attack2');
               player1.animations.play('attack3');
               energy1-=5;
           }


    //idle animation
    else{
        attacking = false;
        player1.animations.play('idle');
    }
        }


    //PLAYER TWO STUFF******************************************************************************************

    if(!dead2)
        {
         player2.body.velocity.x = 0;
    //left jump
    if (wasd.up.isDown && wasd.left.isDown && player2.body.touching.down && hitPlatform2)
    {
        attacking2 = false;
        if(facingRight2==true)
            {
                facingRight2 = false;
                player2.anchor.setTo(.5,.5);
                player2.scale.x = -1;


            }

        player2.animations.play('right');
        player2.body.velocity.x = -200;
        player2.body.velocity.y = -300;
        jump.play();

    }
    //right jump
     else if (wasd.up.isDown && wasd.right.isDown && player2.body.touching.down && hitPlatform2)
    {
        attacking2 = false;
          if(facingRight2==false)
            {
                facingRight2= true;
                player2.anchor.setTo(.5,.5);
                player2.scale.x = 1;
            }
        player2.animations.play('right');
        player2.body.velocity.x = 200;
        player2.body.velocity.y = -300;
        jump.play();
    }

    //right
    else if (wasd.right.isDown)
    {
        attacking2 = false;
        if(facingRight2==false)
            {
                facingRight2 = true;
                player2.anchor.setTo(.5,.5);
                player2.scale.x = 1;
            }

                player2.body.velocity.x = 200;
                player2.animations.play('right');
    }

    //left
    else if (wasd.left.isDown)
        {
            attacking2 = false;
        if(facingRight2==true)
            {
                facingRight2 = false;
                player2.anchor.setTo(.5,.5);
                player2.scale.x = -1;

            }
            player2.body.velocity.x = -200;
            player2.animations.play('right');

        }
    //jump
       //  Allow the player to jump if they are touching the ground.
    else if (wasd.up.isDown && player2.body.touching.down && hitPlatform2)
    {
        attacking2 = false;
        player2.body.velocity.y = -300;
        player2.animations.play('right');
        jump.play();
    }
    //attack
    else if(wasd.attack.isDown && energy2>=5)
           {
               attacking2 = true;
               //player2.animations.play('attack');
               //player1.animations.play('attack2');
               player2.animations.play('attack3');
               energy2-=5;
           }


    //idle animation
    else{
        attacking2 = false;
        player2.animations.play('idle');
    }
        }


}

};
