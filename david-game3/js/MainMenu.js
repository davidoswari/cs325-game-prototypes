"use strict";

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		var title = this.add.sprite(0, 0, 'titlePage');
        title.height=600;
        title.width=800;
        
        var text = this.game.add.text(10, 10 , "Last Day of School: \nYou Have a Final Exam But You Forgot To Study! \nCheat to Pass! Don't Get Caught!");
        var text2 = this.game.add.text(10, 400 , "Rules:\nHold 'E' until you have answers,\nthen go to your seat.\nStay out of Teacher's detection zone.");
        

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
