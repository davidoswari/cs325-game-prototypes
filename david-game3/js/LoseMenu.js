"use strict";

BasicGame.LoseMenu = function (game) {
	this.music = null;
	this.playButton = null;

};

BasicGame.LoseMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		var title = this.add.sprite(0, 0, 'failtitlePage');
        title.height=600;
        title.width=800;
        
        var text = this.game.add.text(10, 10 , "YOU WERE CAUGHT AND FAILED!\nRELOAD PAGE TO PLAY AGAIN");

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
