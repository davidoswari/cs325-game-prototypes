"use strict";

BasicGame.EndMenu = function (game) {

	this.music = null;
	this.playButton = null;
    this.sprite = null;
    this.style = null;
    this.text = null;
    this.background = null;

};

BasicGame.EndMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

        
		this.music = this.add.audio('victory');
		this.music.play();

		this.background = this.add.sprite(0, 0, 'titlePage');
        this.background.height = 600;
        
        this.sprite = this.add.sprite(150,400,'adventurer');
        this.sprite.frame = 55;
        this.sprite.height = 100;
        this.sprite.width = 100;
        
        this.sprite = this.add.sprite(350, 400, 'adventurer2');
        this.sprite.frame = 68;
        this.sprite.height = 100;
        this.sprite.width = 100;
        this.sprite.scale.x = -2;
        
        this.style = { font: "40px Courier", fill: "#fff", tabs: 132 };
        this.text = this.add.text(200,250,"PLAYER 1 WINS!", this.style);    

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
