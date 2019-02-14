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
    
    var game = new Phaser.Game(500, 500, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    var player;
    var bananas;
    var map;
    var bananasRemaining = 30;
    var style;
    var text1;
    var text2;
    var moving = false;
    var sounds;
    var grab;
    
    function preload() 
    {   
    game.load.spritesheet('dude','assets/dude.png',32,48);
    game.load.image('ground','assets/backgroundtest.jpg');
    game.load.image('banana','assets/banana.png');
    game.load.audio('music', 'assets/background music.mp3');
    game.load.audio('grab','assets/Mario-coin-sound.mp3');
    


    }
    function create() 
    {   
    sounds = game.add.audio('music');
        sounds.volume = 0.3;
    sounds.play();
    grab = game.add.audio('grab');
        grab.volume = 0.2;


        
    //map stuff
       game.world.setBounds(0, 0, 1280, 720);
       map = game.add.sprite(0,0,'ground');
        
    //player stuff    
        
       player = game.add.sprite(32,game.world.height - 300, 'dude');
       game.physics.enable(player, Phaser.Physics.ARCADE);
       game.camera.follow(player);
       player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        
    //bananas
        bananas = game.add.group();
        bananas.enableBody = true;
        bananas.scale.setTo(.1, .1);
        
        for(var i=0;i<bananasRemaining;i++)
            {
                var x = Math.floor(Math.random() * 12800);
                var y = Math.floor(Math.random() * 7200);  
                var banana = bananas.create(x,y,'banana');
                banana.body.width = 10;
                banana.body.height=10;
                
            }
        
        style = { font: "12px Courier", fill: "#fff", tabs: 132 };
        text1 = game.add.text(0, 0, "Bananas Remaining: 30", style);
        text1.alignTo(player, Phaser.RIGHT_TOP, 0);
      
    }
    
    function collectBanana (player, banana) {
    
    // Removes the star from the screen
        banana.kill();
        bananasRemaining--;
        text1.setText("Bananas Remaining: " + bananasRemaining);
        grab.play();

}
    function update() 
    {
        text1.alignTo(player, Phaser.TOP, 16);
        
        if(bananasRemaining ==0)
            text1.setText("YOU FOUND ALL OF THE BANANAS!");
   game.physics.arcade.overlap(player, bananas, collectBanana, null, this);
        
     if (game.input.mousePointer.isDown)
    {
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(player, 200);
        player.animations.play('right');


        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
        {
            player.body.velocity.setTo(0, 0);
            player.animations.stop();
        }
    }
    else
    {
        player.body.velocity.setTo(0, 0);
        player.animations.stop();
        player.frame = 4;
    }   

    }    
    
    function render() {

    // Display
    //game.debug.spriteBounds(player);
    //game.debug.spriteBounds(bananas);

}
    
};
