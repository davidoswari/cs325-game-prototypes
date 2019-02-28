"use strict";

BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */
    
    // For optional clarity, you can initialize
    
    //text stuff
    this.style = null;
    this.text1 = null;
    this.text2 = null;
    this.background = null;
    //player stuff
    this.cursors = null;
    this.player1 = null;
    this.wasd = null;
    
    //integers
    this.player1health = null;
    this.player2health = null;
    this.player1shield = null;
    this.player2shield = null;
    
    //boolean
    this.attacking1 = false;
    this.attacking2 = false;
    this.moving1 = false;
    this.moving2 = false;
    this.alive1= true;
    this.alive2 = true;
    
    this.ground = null;
    this.music = null;
    this.attack = null;

    
    
    
};

BasicGame.Game.prototype = {

    create: function () {
    this.music = this.game.add.audio('battle');
    this.music.play();
    this.attack = this.game.add.audio('attack');
        
    this.background = this.game.add.image(0,0,'background');
    this.background.height=600;
    this.background.width = 800;
        
    this.ground = this.game.add.sprite(0,500,'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.width = 800;
    this.ground.body.immovable = true;
    this.ground.enableBody = true;
    this.ground.visible = false;
    
    
    this.style = { font: "20px Courier", fill: "#fff", tabs: 132 };
    this.text1 = this.game.add.text(0,0,"", this.style);
    this.text2 = this.game.add.text(300,0,"", this.style);
        
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.wasd = {
    up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
    down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
    left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    attack: this.game.input.keyboard.addKey(Phaser.Keyboard.F),
    };
    
    this.player1 = this.game.add.sprite(32,this.game.world.height - 150, 'adventurer');
    this.player1.animations.add('idle', [38 ,39, 40, 41], 10, true);
    this.player1.animations.add('right', [8, 9, 10, 11,12,13], 10, true);
    this.player1.animations.add('die',[63,64,65,66,67,68],10,true);
    this.player1.animations.add('attack3',[53,54,55,56,57],20,true);
    this.player1.animations.add('jump',[16,17,18,19,20,21],10,true);
    this.game.physics.arcade.enable(this.player1);
    this.player1.body.gravity.y = 300;
    this.player1.body.collideWorldBounds = true;
    this.player1health = 300;
    this.player1.height= 100;
    this.player1.width = 100;
    this.player1.anchor.setTo(.5,.5);
    
    this.hit1 = this.game.add.sprite(100,200);
    this.hit1.height = 10;
    this.hit1.width = 20;
        
    
        
    this.player2 = this.game.add.sprite(this.game.world.width - 32,this.game.world.height - 150, 'adventurer2');
        
    this.player2.animations.add('idle', [38 ,39, 40, 41], 10, true);
    this.player2.animations.add('right', [8, 9, 10, 11,12,13], 10, true);
    this.player2.animations.add('die',[63,64,65,66,67,68],10,true);
    this.player2.animations.add('attack3',[53,54,55,56,57],20,true);
    this.player2.animations.add('jump',[16,17,18,19,20,21],10,true);
    this.game.physics.arcade.enable(this.player2);
    this.player2.body.gravity.y = 300;
    this.player2.body.collideWorldBounds = true;
    this.player2health = 300;
    this.player2.height= 100;
    this.player2.width = 100;
    this.player2.anchor.setTo(.5,.5);
    this.player1.body.setSize(50, 30,0,5);  
    this.player2.body.setSize(50, 30,0,5);  
    this.player2.scale.x = -2;
        
        
    },

    
    attack1: function()
    {
        this.player1.animations.play('attack3');
        
        var boundsA = this.player1.getBounds();
        var boundsB = this.player2.getBounds();
        var c = Phaser.Rectangle.intersects(boundsA, boundsB);
        
         if(c && this.moving1)
            {
                this.player2health-=1.5;
                if(this.player1.scale.x == -2)
                this.player1.body.x-=10;
                
                else if(this.player1.scale.x == 2)
                this.player1.body.x+=10;
                
            }
            else if(c && this.moving1==false)
            {
                this.player2health--;
            }
        
        this.attacking = false;
    },
      attack2: function()
    {
        this.player2.animations.play('attack3');
        
        var boundsA = this.player1.getBounds();
        var boundsB = this.player2.getBounds();
        var c = Phaser.Rectangle.intersects(boundsA, boundsB);
        
        if(c && this.moving2)
            {
                this.player1health-=1.5;
                
                if(this.player2.scale.x == -2)
                this.player2.body.x-=10;
                
                else if(this.player2.scale.x == 2)
                this.player2.body.x+=10;
                
            }
        else if(c && this.moving2==false)
            {
                this.player1health--;
            }
        this.attacking2 = false;
    },
    

    update: function () 
    {
           //this.game.debug.body(this.player1);
           //this.game.debug.body(this.player2);
             if(this.player2health <= 0)
            {
                this.music.stop();
                this.state.start('EndMenu');
            }
        
        else if(this.player1health<=0)
            {
                this.music.stop();
                this.state.start('EndMenu2');
            }
        
        var hitground1 = this.game.physics.arcade.collide(this.player1, this.ground );
        var hitground2 = this.game.physics.arcade.collide(this.player2, this.ground );
        
        this.text1.setText("Player 1: Health = " + this.player1health, this.style);
        this.text2.setText("Player 2: Health = " + this.player2health, this.style);
        
        
    if(this.alive1==true)
        {
      if(this.space.isDown)
          {
              this.attack.play();
              this.attacking1 = true;
              this.attack1();
          }

      else if(this.cursors.up.isDown && hitground1)
        {
            this.player1.body.velocity.y = -300;
        }
        
        else{
        if(this.cursors.right.isDown)
          {
              this.player1.scale.x = 2;
              this.player1.animations.play('right');
              this.player1.body.velocity.x = 250;
              this.moving1 = true;
          }
       else if(this.cursors.left.isDown)
        {
            this.player1.scale.x = -2;
            this.player1.animations.play('right');
            this.player1.body.velocity.x = -250;
            this.moving1 = true;
        }
        else
        {
            this.player1.animations.play('idle');
            this.player1.body.velocity.x = 0;
            this.moving1 = false;
        }
        }
    }
    
        if(this.alive2==true){
        if(this.wasd.attack.isDown)
          {
              this.attack.play();
              this.attacking2 = true;
              this.attack2();
          }    

      else if(this.wasd.up.isDown && hitground2)
        {
            this.player2.body.velocity.y = -300;    
        }
        
        else{
        if(this.wasd.right.isDown)
          {
              this.player2.scale.x = 2;
              this.player2.animations.play('right');
              this.player2.body.velocity.x = 250;
              this.moving2 = true;
          }
       else if(this.wasd.left.isDown)
        {
            this.player2.scale.x = -2;
            this.player2.animations.play('right');
            this.player2.body.velocity.x = -250;
            this.moving2 = true;
        }
        else
        {
            this.moving2 = false;
            this.player2.animations.play('idle');
            this.player2.body.velocity.x = 0;

        }
        }
        }
        
        
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
    this.style = null;
    this.text1 = null;
    this.text2 = null;
    this.background = null;
    //player stuff
    this.cursors = null;
    this.player1 = null;
    this.wasd = null;
    
    //integers
    this.player1health = null;
    this.player2health = null;
    this.player1shield = null;
    this.player2shield = null;
    
    //boolean
    this.attacking1 = false;
    this.attacking2 = false;
    this.moving1 = false;
    this.moving2 = false;

    
    this.ground = null;
        
        this.state.start('MainMenu');

    }

};
