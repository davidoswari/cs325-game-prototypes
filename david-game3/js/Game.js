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
    // member variables here. Otherwise, you will do it in create().
    this.player = null;
    this.professor = null;
    this.cursors = null;
    this.desks = null;
    this.floor = null;
    this.chalkboard = null;
    this.classmates = null;
    this.detection = null;
    this.orange = null;
    this.paper = null;
    this.safe = null;
    this.cheatZone1 = null;
    this.cheatZone2 = null;
    this.cheatZone3 = null;
    this.cheatZone4 = null;
    this.copyKey = null;
    this.music = null;
    this.writing = null;
    this.ping = null;
    //booleans
    this.movingDown = true;
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.isSafe = true;
    this.active1 = true;
    this.active2 = true;
    this.active3 = true;
    this.active4 = true;
    this.goingBack = false;
    
    //text stuff
    this.text1 = null;
    this.style = null;
    this.style2 = null;
    this.dialogue = null;
    
    this.percent = 0;
    this.one = 200;
    this.two = 200;
    this.three = 200;
    this.four = 200;
    
    
};

BasicGame.Game.prototype = {
    create: function () {
        this.music = this.game.add.audio('background music');
        this.music.volume = 0.3;
        this.music.play();
        
        this.writing = this.game.add.audio('writing');
        this.ping = this.game.add.audio('ping');
        
        this.copyKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
        
        
        this.floor = this.game.add.image(0, 0, 'floor');
        this.floor.height = 600;
        this.floor.width = 800;
        
        //detection circle
        this.detection = this.game.add.sprite(400, 50, 't-red');
        this.game.physics.arcade.enable(this.detection);
        this.detection.height = 350;
        this.detection.width = 400;
        
        //professor
        this.professor = this.game.add.sprite(574, 200, 'red');
        this.professor.height = 32;
        this.professor.width = 32;
        this.professor.enableBody = true;
        this.game.physics.arcade.enable(this.professor);
        
        //classmates group
        this.classmates = this.game.add.group();
        this.classmates.enableBody = true;
        this.game.physics.arcade.enable(this.classmates);
      
        
        //player stuff
        this.player = this.game.add.sprite(706, 520, 'blue');
        this.player.height = 32;
        this.player.width = 32;
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        
        //safe zone
        this.safe = this.game.add.sprite(680, 520);
        this.safe.height = 40;
        this.safe.width = 60;
        
        //cheatZones
        this.cheatZone1 = this.game.add.sprite(120, 180);
        this.cheatZone1.height = 125;
        this.cheatZone1.width = 75;
        this.cheatZone1.enableBody = true;
        
        this.cheatZone2 = this.game.add.sprite(308, 430);
        this.cheatZone2.height = 125;
        this.cheatZone2.width = 75;
        
        this.cheatZone3 = this.game.add.sprite(420, 310);
        this.cheatZone3.height = 125;
        this.cheatZone3.width = 75;
        
        this.cheatZone4 = this.game.add.sprite(620, 310);
        this.cheatZone4.height = 125;
        this.cheatZone4.width = 75;
        
            
        //keyboard
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //desks group
        this.desks = this.game.add.group();
        this.desks.enableBody = true;
        this.game.physics.arcade.enable(this.desks);
        
        //paper group
        this.paper = this.game.add.group();
        this.paper.enableBody = true;

        //chalk board
        this.chalkboard = this.game.add.image(300, 0, 'board');
        this.chalkboard.height = 20;
        this.chalkboard.width = 230;
        
      
        //make 16 desks all evenly spaced, 3x4
        var y = 200;
        for (var i=0;i<3;i++)
        {
            var x=50
            for(var j=0;j<4;j++)
            {
                var desk = this.desks.create(x,y,'desk');
                desk.height=64;
                desk.width=128;
                desk.body.immovable = true;
                
                var sheet = this.paper.create(x+20,y+20,'paper');
                sheet.height = 30;
                sheet.width = 20;
                
                sheet = this.paper.create(x+80,y+20,'paper');
                sheet.height = 30;
                sheet.width = 20;
                x+=192;
            }
            y+=128;
        }
        
        //make students
        
        y=264;
        for(i=0;i<3;i++)
            {
                x = 50;
        for(j=0;j<4;j++)
            {   
                if((i!=1||j!=3) &&( i!=1 || j!=2))
                    {
                var classmate = this.classmates.create(x +20,y,'green');
                classmate.height=32;
                classmate.width=32;
                classmate.body.immovable = true;
                    }
                
                else
                {
                classmate = this.classmates.create(x+20,y,'orange');
                classmate.height=32;
                classmate.width=32;
                classmate.body.immovable = true;
                    
                }
                        
                
                //leave spot for player to sit && right side students
                if((i!=2 || j!=3) && (i!=0||j!=0) && (i!=2||j!=1 )){
                classmate = this.classmates.create(x+80,y,'green');
                classmate.height=32;
                classmate.width=32;
                classmate.body.immovable = true;
                }
                
                else if(i!=2||j!=3)
                {
                classmate = this.classmates.create(x+80,y,'orange');
                classmate.height=32;
                classmate.width=32;
                classmate.body.immovable = true;
                    
                }
                
                x+=192;
                
            }
                y+=128;
            }
        
        
        this.style = { font: "20px Courier", fill: "#fff", tabs: 132 };
        this.style2 = { font: "10px Courier", fill: "#fff", tabs: 132 };
        this.text1 = this.game.add.text(10, 32, "Test Answers: " + this.percent + "%", this.style);
        this.dialogue = this.game.add.text(0, 0, "I'm\nso\nscrewed.", this.style2);
        this.text2 = this.game.add.text(10,64, "Hold 'E' to copy when near orange student's paper", this.style);
    },

    update: function () 
    {
    if(this.percent>=100)
        {
    this.writing.stop();
    this.music.stop();
    this.state.start('WinMenu');
   
        }
        
    this.dialogue.alignTo(this.player, Phaser.TOP, 16);
    this.text1 = this.text1.setText("Test Answers: " + this.percent + "%");
        
  this.game.physics.arcade.collide(this.player, this.desks);
  this.game.physics.arcade.collide(this.player, this.classmates);
    
        
        
    //player controls    
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        
      if (this.cursors.up.isDown)
          {
              this.player.body.velocity.y = -125;
          }
        else if(this.cursors.down.isDown)
            {
                this.player.body.velocity.y = 125;
            }
         else if(this.cursors.left.isDown)
            {
                this.player.body.velocity.x = -125;
            }
         else if(this.cursors.right.isDown)
            {
                this.player.body.velocity.x = 125;
            }
        
        else
        {
            this.player.body.velocity.x=0;
            this.player.body.velocity.y=0;
        }
        //check positions
        
        if(this.movingDown && this.professor.y >= 550)
            {
                            this.movingDown =false;
                            this.movingLeft = true;
                
            }
        if(this.movingLeft && this.professor.x <= 200)
            {
                            this.movingLeft =false;
                            this.movingUp = true;
            }
        if(this.movingUp && this.professor.y<= 150)
            {
                this.movingUp=false;
                this.movingRight = true;
            }
        if(this.movingRight && this.professor.x >=574)
            {
                this.movingRight = false;
                this.movingDown = true;
            }
        
        //professor movement
            if(this.movingDown)
            {
                this.professor.body.velocity.y = 75;
                this.professor.body.velocity.x = 0;
                this.detection.body.velocity.y = 75;
                this.detection.body.velocity.x = 0;
            }
            
            else if(this.movingLeft)
            {
                this.professor.body.velocity.x = -75;
                this.professor.body.velocity.y = 0;
                this.detection.body.velocity.x = -75;
                this.detection.body.velocity.y = 0;
            }
            
            else if(this.movingRight)
            {
                this.professor.body.velocity.x = 75;
                this.professor.body.velocity.y = 0;
                this.detection.body.velocity.x = 75;
                this.detection.body.velocity.y = 0;
            }
            
            else if(this.movingUp)
            {
                this.professor.body.velocity.y = -75;
                this.professor.body.velocity.x = 0;
                this.detection.body.velocity.y = -75;
                this.detection.body.velocity.x = 0;
            }
        
    var boundsA = this.detection.getBounds();
    var boundsB = this.player.getBounds();
    var boundsC = this.safe.getBounds();
        
        //safe zone detection
        var intersectBC = Phaser.Rectangle.intersects(boundsB, boundsC);
        if(intersectBC)
            {
                this.isSafe = true;
                
                if(this.goingBack)
                    {
                        this.goingBack=false;
                        this.percent+=25;
                        this.dialogue.setText("Who should I\ncopy from next?");
                        this.writing.play();
                    }
            }
        else{
            this.isSafe=false;
        }
        
        //player and cheatzone detection
        var bounds1 = this.cheatZone1.getBounds();
        var bounds2 = this.cheatZone2.getBounds();
        var bounds3 = this.cheatZone3.getBounds();
        var bounds4 = this.cheatZone4.getBounds();
        
        var intersect1 = Phaser.Rectangle.intersects(boundsB, bounds1);
        if(this.active1 && intersect1 && this.copyKey.isDown && this.goingBack ==false)
            {
                this.one--;
                if(this.one<=0)
                    {
                this.ping.play();
                this.active1 = false;
                this.goingBack=true;
                this.dialogue.setText("Got it!\nReturning.");
                    }
                 else
                    {
                    this.dialogue.setText("Probably should have paid attention.\nCopying.");
                    }
            }
        
        
         var intersect2 = Phaser.Rectangle.intersects(boundsB, bounds2);
        
        if(this.active2 && intersect2 && this.copyKey.isDown&& this.goingBack ==false)
            {
                this.two--;
                if(this.two<=0)
                    {
                this.ping.play();
                this.active2 = false;
                this.goingBack = true;
                this.dialogue.setText("Too easy!\nI should go back.");
                    }
                 else
                    {
                    this.dialogue.setText("Did we really learn this stuff?\nCopying.");
                    }
            }
        
         var intersect3 = Phaser.Rectangle.intersects(boundsB, bounds3);
       
        if(this.active3 && intersect3 && this.copyKey.isDown&& this.goingBack ==false)
            {
                this.three--;
                if(this.three<=0)
                    {
                this.ping.play();
                this.active3 = false;
                this.goingBack=true;
                this.dialogue.setText("I got the answers!\nI should write them down.");
                    }
                    else
                    {
                    this.dialogue.setText("True. False. False..\nCopying.");
                    }
                    
            }
        
         var intersect4 = Phaser.Rectangle.intersects(boundsB, bounds4);
        
        if(this.active4 && intersect4 && this.copyKey.isDown&& this.goingBack ==false)
            {
                this.four--;
                if(this.four<=0)
                {
                this.ping.play();
                this.active4 = false;
                this.goingBack=true;
                this.dialogue.setText("I got the answers!\nJust need to write them down.");
                }
                else
                {
                this.dialogue.setText("I see...\nCopying.");
                }

            }
        
 //player and professor detection
    var intersectAB = Phaser.Rectangle.intersects(boundsA, boundsB);
    if(intersectAB && !this.isSafe)
        {
    this.music.stop();
    this.state.start('LoseMenu');
      //reset      
    this.player = null;
    this.professor = null;
    this.cursors = null;
    this.desks = null;
    this.floor = null;
    this.chalkboard = null;
    this.classmates = null;
    this.detection = null;
    this.orange = null;
    this.paper = null;
    this.safe = null;
    this.cheatZone1 = null;
    this.cheatZone2 = null;
    this.cheatZone3 = null;
    this.cheatZone4 = null;
    this.copyKey = null;
    
    //booleans
    this.movingDown = true;
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.isSafe = true;
    this.active1 = true;
    this.active2 = true;
    this.active3 = true;
    this.active4 = true;
    this.goingBack = false;
    
    //text stuff
    this.text1 = null;
    this.style = null;
    this.style2 = null;
    this.dialogue = null;
    
    this.percent = 0;
    this.one = 200;
    this.two = 200;
    this.three = 200;
    this.four = 200;
        }
            
        
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }
    

    
    
    

};
