"use strict";

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
    this.sprite = null;
    this.style = null;
    this.text = null;
    this.background = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

        
		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.background = this.add.sprite(0, 0, 'titlePage');
        this.background.height = 600;
        
        this.sprite = this.add.sprite(150,400,'adventurer');
        this.sprite.frame = 55;
        this.sprite.height = 100;
        this.sprite.width = 100;
        
        this.sprite = this.add.sprite(350, 400, 'adventurer2');
        this.sprite.frame = 50;
        this.sprite.height = 100;
        this.sprite.width = 100;
        this.sprite.scale.x = -2;
        
        this.style = { font: "40px Courier", fill: "#fff", tabs: 132 };
        this.style2 = { font: "16px Courier", fill: "#fff", tabs: 132 };
        
        this.text = this.add.text(200,250,"ADVENTURER FIGHT 2", this.style);
        this.text = this.add.text(10,10,"Controls:\nPlayer 1 (red) moves with ARROWS and attacks with ENTER KEY\nPlayer 2 (blue) moves with WASD and attacks with F key", this.style2);

		this.playButton = this.add.button( 600, 500, 'playButton', this.startGame, this, 'over', 'out', 'down');
        

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
