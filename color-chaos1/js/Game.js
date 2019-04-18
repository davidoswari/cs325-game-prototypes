"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var unit1 = null;
    var unit2 = null;
    var unit3 = null;
    var unit4 = null;
    var grid = null;
    
    //unit stuff
    var health1, health2, health3, health4 = null;
    var color1, color2, color3, color4 = null;
    var changed1, changed2, changed3, changed4 = 2;
    var moves1, moves2, moves3, moves4 = null;
    var box1,box2,box3,box4 = null;
    var attacked1, attacked2, attacked3, attacked4;
  
    var max1 = null;
    var max2 = null;
    var max3 = null;
    var max4 = null;
    
    var state1 = 1;
    var state2 = 1;
    var state3 = 1;
    var state4 = 1;
    
    //damage values
    var strong = null;
    var normal = null;
    var weak = null;
    var oneto3, oneto4, twoto3, twoto4, threeto1, threeto2, fourto1, fourto2 = null;
    
    //keyboard controls
    var one = null;
    var two = null;
    var three = null;
    var four = null;
    var c = null;
    var cursors = null;
    var enter = null;
    var space = null;

    //labels
    var style = null;
    var currUnit = null;
    var turn = null;
    var currLabel = null;
    var turnLabel =null;
    var movesLabel = null;
    var label1 = null;
    var label2 = null;
    var label3 = null;
    var label4 = null;
    var l1 = null;
    var l2 = null;
    var n1;
    var n2;
    var n3;
    var n4;
    
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
    
    return {
        //change current value functions
        changecurr1: function() {if(turn == 1)currUnit=1;},
        changecurr2: function() {if(turn == 1)currUnit=2;},
        changecurr3: function() {if(turn == 2)currUnit=3;},
        changecurr4: function() {if(turn == 2)currUnit=4;},

        //change color functions
        change1Red: function() {unit1.loadTexture('red',0); color1=1;},
        change2Red: function() {unit2.loadTexture('red',0); color2=1;},
        change3Red: function() {unit3.loadTexture('red',0); color3=1;},
        change4Red: function() {unit4.loadTexture('red',0); color4=1;},
        change1Green: function() {unit1.loadTexture('green',0); color1=2;},
        change2Green: function() {unit2.loadTexture('green',0); color2=2;},
        change3Green: function() {unit3.loadTexture('green',0); color3=2;},
        change4Green: function() {unit4.loadTexture('green',0); color4=2;},
        change1Blue: function() {unit1.loadTexture('blue',0); color1=3;},
        change2Blue: function() {unit2.loadTexture('blue',0); color2=3;},
        change3Blue: function() {unit3.loadTexture('blue',0); color3=3;},
        change4Blue: function() {unit4.loadTexture('blue',0); color4=3;},
        changeColor: function() {
            var newcolor = Math.floor(Math.random() * Math.floor(3)) + 1;
            if(currUnit==1 && changed1!=0)
                {
                    if(newcolor==1)
                        {
                        this.change1Red();
                        color1=1;
                        }
                    
                    else if(newcolor==2)
                        {
                        this.change1Green();
                        color1=2;
                        }
                    else if(newcolor==3)
                        {
                        this.change1Blue();
                        color1==3;
                        }
                    changed1=0;
                    
                }
            else if(currUnit==2 && changed2!=0)
                {
                    if(newcolor==1)
                        {
                        this.change2Red();
                        color2=1;
                        }
                    
                    else if(newcolor==2)
                        {
                        this.change2Green();
                        color2=2;
                        }
                    else if(newcolor==3)
                        {
                        this.change2Blue();
                        color1==3;
                        }
                    changed2=0;
                }
            else if(currUnit==3 && changed3!=0)
                {
                    if(newcolor==1)
                        {
                        this.change3Red();
                        color3=1;
                        }
                    
                    else if(newcolor==2)
                        {
                        this.change3Green();
                        color3=2;
                        }
                    else if(newcolor==3)
                        {
                        this.change3Blue();
                        color3==3;
                        }
                    changed3=0;
                }
            else if(currUnit==4 && changed4!=0)
                {
                    if(newcolor==1)
                        {
                        this.change4Red();
                        color4=1;
                        }
                    
                    else if(newcolor==2)
                        {
                        this.change4Green();
                        color4=2;
                        }
                    else if(newcolor==3)
                        {
                        this.change4Blue();
                        color4==3;
                        }
                    changed4=0;
                }
        },
        changeTurn: function()
        {
        
        if(turn ==1)
            {
            turn=2;
            this.generateNums();
            currUnit=3;
            changed3=1;
            changed4=1;
            changed1=1;
            changed2=1;
            attacked1=1;
            attacked2=1;
            attacked3=1;
            attacked4=1;
            }
        else if(turn ==2)
            {
            turn =1;
            this.generateNums();
            currUnit=1;
            changed1=1;
            changed2=1;
            changed3=1;
            changed4=1;
            attacked1=1;
            attacked2=1;
            attacked3=1;
            attacked4=1;
            }
    
        },
        
        //movement
        moveRight: function(){
        if(currUnit==1 && unit1.x!=425 && moves1>0 && turn==1)
            {
        unit1.x += 100;
        moves1--;
            }
        else if(currUnit==2 && unit2.x!=425 && moves2>0 && turn==1)
            {
        unit2.x += 100;
        moves2--;
            }
        else if(currUnit==3 && unit3.x!=425 && moves3>0 && turn==2)
            {
        unit3.x += 100;
        moves3--;
            }
        else if(currUnit==4 && unit4.x!=425 && moves4>0 && turn==2)
            {
        unit4.x += 100;
        moves4--;
            }
        },
    
        moveLeft: function(){
        if(currUnit==1 && unit1.x!=25 && moves1>0 && turn==1)
            {
        unit1.x -= 100;
        moves1--;
            }
        else if(currUnit==2 && unit2.x!=25 && moves2>0 && turn==1)
            {
        unit2.x -= 100;
        moves2--;
            }
        else if(currUnit==3 && unit3.x!=25 && moves3>0 && turn==2)
            {
        unit3.x -= 100;
        moves3--;
            }
        else if(currUnit==4 && unit4.x!=25 && moves4>0 && turn==2)
            {
        unit4.x -= 100;
        moves4--;
            }
        },
        
        moveUp: function(){
        if(currUnit==1 && unit1.y!=25 && moves1>0 && turn==1)
            {
        unit1.y -= 100;
        moves1--;
            }
    
        else if(currUnit==2 && unit2.y!=25 && moves2>0 && turn==1)
            {
        unit2.y -= 100;
        moves2--;
            }
        else if(currUnit==3 && unit3.y!=25 && moves3>0 && turn==2)
            {
        unit3.y -= 100;
        moves3--;
            }
        else if(currUnit==4 && unit4.y!=25 && moves4>0 && turn==2)
            {
        unit4.y -= 100;
        moves4--;
            }
        },
        
        moveDown: function(){
        if(currUnit==1 && unit1.y!=425 && moves1>0 && turn==1)
            {
        unit1.y += 100;
        moves1--;
            }
        else if(currUnit==2 && unit2.y!=425 && moves2>0 && turn==1)
            {
        moves2--;
        unit2.y += 100;
            }
        else if(currUnit==3 && unit3.y!=425 && moves3>0 && turn==2)
            {
        unit3.y += 100;
        moves3--;
            }
        else if(currUnit==4 && unit4.y!=425 && moves4>0 && turn==2)
            {
        unit4.y += 100;
        moves4--;
            }
        },
        //random number generator
        generateNums: function() {
            
        max1 = Math.floor(Math.random() * Math.floor(3)) + 1;
        max2 = Math.floor(Math.random() * Math.floor(3)) + 1;
        max3 = Math.floor(Math.random() * Math.floor(3)) + 1;
        max4 = Math.floor(Math.random() * Math.floor(3)) + 1;
        moves1 = max1;
        moves2 = max2;
        moves3 = max3;
        moves4 = max4;
        }, 
        
        attack1: function()
        {   
            //ONE TO THREE
          if(unit1.x+100 ==unit3.x && unit1.y == unit3.y)//check right
              {
                  health3-=oneto3;
                  moves1 = max1;
                
              }
          if (unit1.x-100 == unit3.x && unit1.y==unit3.y)//check left
              {
                  health3-=oneto3;
                  moves1 = max1;
          
              }
          if(unit1.y-100 == unit3.y && unit1.x == unit3.x)// check up
              {
                  health3-= oneto3;
                  moves1 = max1;
                
              }
          if(unit1.y+100==unit3.y && unit1.x == unit3.x)//check down
              {
                  health3-=oneto3;
                  moves1 = max1;
                
              }
            //ONE TO FOUR
        if(unit1.x+100 ==unit4.x && unit1.y == unit4.y)//check right
              {
                  health4-=oneto4;
                  moves1 = max1;
                 
              }
          if (unit1.x-100 == unit4.x && unit1.y==unit4.y)//check left
              {
                  health4-=oneto4;
                  moves1 = max1;
                 
              }
          if(unit1.y-100 == unit4.y && unit1.x == unit4.x)// check up
              {
                  health4-= oneto4;
                  moves1 = max1;
                 
              }
          if(unit1.y+100==unit4.y && unit1.x == unit4.x)//check down
              {
                  health4-=oneto4;
                  moves1 = max1;
                
              }
        },
         attack2: function()
        {   
            //TWO TO THREE
          if(unit2.x+100 ==unit3.x && unit2.y == unit3.y)//check right
              {
                  health3-=twoto3;
                  moves2 = max2;
                
              }
          if (unit2.x-100 == unit3.x && unit2.y==unit3.y)//check left
              {
                  health3=twoto3;
                  moves2 = max2;
          
              }
          if(unit2.y-100 == unit3.y && unit2.x == unit3.x)// check up
              {
                  health3=twoto3;
                  moves2 = max2;
                
              }
          if(unit2.y+100==unit3.y && unit2.x == unit3.x)//check down
              {
                  health3-=twoto3;
                  moves2 = max2;
                
              }
            //TWO TO FOUR
        if(unit2.x+100 ==unit4.x && unit2.y == unit4.y)//check right
              {
                  health4-=twoto4;
                  moves2 = max2;
                 
              }
          if (unit2.x-100 == unit4.x && unit2.y==unit4.y)//check left
              {
                  health4-=twoto4;
                  moves2 = max2;
                 
              }
          if(unit2.y-100 == unit4.y && unit2.x == unit4.x)// check up
              {
                  health4-= twoto4;
                  moves2 = max2;
                 
              }
          if(unit2.y+100==unit4.y && unit2.x == unit4.x)//check down
              {
                  health4-=twoto4;
                  moves2 = max2;
                
              }
        },
        
         attack3: function()
        {   
            //THREE TO ONE
          if(unit3.x+100 ==unit1.x && unit3.y == unit1.y)//check right
              {
                  health1-=threeto1;
                  moves3 = max3;
                
              }
          if (unit3.x-100 == unit1.x && unit3.y==unit1.y)//check left
              {
                  health1-=threeto1;
                  moves3 = max3;
          
              }
          if(unit3.y-100 == unit1.y && unit3.x == unit1.x)// check up
              {
                  health1-=threeto1;
                  moves3 = max3;
                
              }
          if(unit3.y+100==unit1.y && unit3.x == unit1.x)//check down
              {
                  health1-=threeto1;
                  moves3 = max3;
                
              }
            //THREE TO TWO
        if(unit3.x+100 ==unit2.x && unit3.y == unit2.y)//check right
              {
                  health2-=threeto2;
                  moves3 = max3;
                 
              }
          if (unit3.x-100 == unit2.x && unit3.y==unit2.y)//check left
              {
                  health2-=threeto2;
                  moves3 = max3;
                 
              }
          if(unit3.y-100 == unit2.y && unit3.x == unit2.x)// check up
              {
                   health2-=threeto2;
                  moves3 = max3;
                 
              }
          if(unit3.y+100==unit2.y && unit3.x == unit2.x)//check down
              {
                  health2-=threeto2;
                  moves3 = max3;
                
              }
        },
        attack4: function()
        {   
            //FOUR TO ONE
          if(unit4.x+100 ==unit1.x && unit4.y == unit1.y)//check right
              {
                  health1-=fourto1;
                  moves4 = max4;
                
              }
          if (unit4.x-100 == unit1.x && unit4.y==unit1.y)//check left
              {
                  health1-=fourto1;
                  moves4 = max4;
          
              }
          if(unit4.y-100 == unit1.y && unit4.x == unit1.x)// check up
              {
                health1-=fourto1;
                  moves4 = max4;
                
              }
          if(unit4.y+100==unit1.y && unit4.x == unit1.x)//check down
              {
                  health1-=fourto1;
                  moves4 = max4;
                
              }
            //FOUR TO TWO
        if(unit4.x+100 ==unit2.x && unit4.y == unit2.y)//check right
              {
                  health2-=fourto2;
                  moves4 = max4;
              }
          if (unit4.x-100 == unit2.x && unit4.y==unit2.y)//check left
              {
                 health2-=fourto2;
                  moves4 = max4;
                 
              }
          if(unit4.y-100 == unit2.y && unit4.x == unit2.x)// check up
              {
                  health2-=fourto2;
                  moves4 = max4;
                 
              }
          if(unit4.y+100==unit2.y && unit4.x == unit2.x)//check down
              {
                  health2-=fourto2;
                  moves4 = max4;
                
              }
        },
        
        allattack: function()
        {
          if(state1==1 && currUnit==1 && attacked1>0)
              {
              this.attack1();
                  attacked1=0;
              }
          else if(state2 ==1 && currUnit==2 && attacked2>0)
              {
              this.attack2();
                  attacked2=0;
              }
            else if(state3 ==1 && currUnit==3 && attacked3>0)
                {
                this.attack3();
                    attacked3=0;
                }
            else if(state4 ==1 && currUnit==4 && attacked4>0)
                {
                this.attack4();
                    attacked4=0;
                }
        },
        
        
        create: function () 
        {
        attacked1=1;
        attacked2=1;
        attacked3=1;
        attacked4=1;
    
        //initial values
        turn = 1;
        health1 = 10;
        health2 = 10;
        health3 = 10;
        health4 = 10;
        strong = 5;
        weak = 2;
        normal = 3;
        this.generateNums();
        
        //make units
        grid = game.add.sprite(0,0,'grid');
        unit1 = game.add.sprite(25,25,'blue');
        unit1.height = 50;
        unit1.width = 50;
        unit2 = game.add.sprite(125,25,'red');
        unit2.height= 50;
        unit2.width = 50;
        unit3 = game.add.sprite(325,425,'green');
        unit3.height = 50;
        unit3.width = 50;
        unit4 = game.add.sprite(425,425,'red');
        unit4.height= 50;
        unit4.width = 50;
            
        
        currUnit = 1;
        this.changeColor();
        currUnit = 2;
        this.changeColor();
        currUnit = 3;
        this.changeColor();
        currUnit = 4;
        this.changeColor();
        currUnit = 1;
        changed1=1;
        changed2=1;
        changed3=1;
        changed4=1;
            
        //create controls
        cursors = game.input.keyboard.createCursorKeys();
        one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        two = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        three = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        four = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        c = game.input.keyboard.addKey(Phaser.Keyboard.C);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
        one.onDown.add(this.changecurr1, this);
        two.onDown.add(this.changecurr2, this);
        three.onDown.add(this.changecurr3, this);
        four.onDown.add(this.changecurr4, this);
            
        cursors.right.onDown.add(this.moveRight,this);
        cursors.left.onDown.add(this.moveLeft,this);
        cursors.up.onDown.add(this.moveUp,this);
        cursors.down.onDown.add(this.moveDown,this);
        c.onDown.add(this.changeColor,this);
        enter.onDown.add(this.changeTurn,this);
        space.onDown.add(this.allattack,this);
        
        

            
            
        //labels
        style = { font: "20px Courier", fill: "#fff", tabs: 132 };
        turnLabel = game.add.text(10,500,"Player " + turn + "'s turn",style);
        currLabel = game.add.text(10,550,"Currently selected unit: " + currUnit, style);
        movesLabel = game.add.text(400,550,"Remaining moves on unit: ",style);
        
        l1 = game.add.text(525,50,"PLAYER 1 UNITS",style);
        label1 = game.add.text(525, 100, "UNIT 1 HEALTH: ", style);
        label2 = game.add.text(525, 150 , "UNIT 2 HEALTH: ", style);
        
        l2 = game.add.text(525,250, "PLAYER 2 UNITS", style);
        label3 = game.add.text(525, 300, "UNIT 3 HEALTH: ", style);
        label4 = game.add.text(525, 350 , "UNIT 4 HEALTH: ", style);
            
        n1 = game.add.text(0,0,"1");
        n2 = game.add.text(0,0,"2");
        n3 = game.add.text(0,0,"3");
        n4 = game.add.text(0,0,"4");
            

        
            
        },
    
        update: function () 
        {
            
            //game end conditions
            if(health1<=0 && health2<=0)
                {
                    quitGame();
                }
            if(health3<=0 && health4<=0)
                {
                    quitGame();
                }
            if(health1<=0)
                {
                    unit1.visible = false;
                    state1 = 2;
                }
            if(health2<=0)
                {
                    unit2.visible = false;
                    state2 = 2;
                }
                if(health3<=0)
                {
                    unit3.visible = false;
                    state3 = 2;
                }
                        if(health4<=0)
                {
                    unit4.visible = false;
                    state4 =2;
                }



            
        //update labels
                    
        n1.alignTo(unit1,Phaser.BOTTOM_CENTER,16);
        n2.alignTo(unit2,Phaser.BOTTOM_CENTER,16);
        n3.alignTo(unit3,Phaser.BOTTOM_CENTER,16);
        n4.alignTo(unit4,Phaser.BOTTOM_CENTER,16);
            
        turnLabel.setText("Player " + turn + "'s turn",style);
        currLabel.setText("Currently selected unit: " + currUnit, style);
        if(currUnit ==1)
        movesLabel.setText("Remaining moves on unit: " + moves1,style);
        else if(currUnit==2)
        movesLabel.setText("Remaining moves on unit: " + moves2,style);
        else if(currUnit ==3)
        movesLabel.setText("Remaining moves on unit: " + moves3,style);
        else if(currUnit==4)
        movesLabel.setText("Remaining moves on unit: " + moves4,style);
            
        label1.setText("UNIT 1 HEALTH: " + health1,style);
        label2.setText("UNIT 2 HEALTH: " + health2,style);
        label3.setText("UNIT 3 HEALTH: " + health3,style);
        label4.setText("UNIT 4 HEALTH: " + health4,style);
        
            
            
        //update damage values
            //normal damage
            if(color1 == color3)
                {
                oneto3 = normal;
                threeto1 = normal;
                }
            if(color1 == color4)
                {
                oneto4 = normal;
                fourto1 = normal;
                }
            if(color2 == color3)
                {
                twoto3 = normal;
                threeto2 = normal;
                }
             if(color2 == color4)
                 {
                twoto4= normal;
                fourto2 = normal;
                 }
            
            //weak and strong damage
            //1 VS ALL *********************************************************************************************
            if(color1==1 && color3==2)// red1 vs green3
                {
                oneto3 = strong;
                threeto1 = weak;
                }
            if(color1==1 && color3==3)// red1 vs blue3
                {
                oneto3 = weak;
                threeto1 = strong;
                }
            if(color1==1 && color4==2)// red1 vs green4
                {
                oneto4 = strong;
                fourto1 = weak;
                }
            if(color1==1 && color4==3)// red1 vs blue4
                {
                oneto4 = weak;
                fourto1 = strong;
                }
            
            if(color1==3 && color3==1)// blue1 vs red3
                  {
                oneto3 = strong;
                threeto1 = weak;
                  }
            if(color1==3 && color4==1)// blue1 vs red4
                {
                oneto4 = strong;
                fourto1 = weak;
                }
            if(color1==3 && color3==2)// blue1 vs green3
                  {
                oneto3 = weak;
                threeto1 = strong;
                  }
            if(color1==3 && color4==2)// blue1 vs green4
                {
                oneto4 = weak;
                fourto1 = strong;
                }
            
            if(color1==2 && color3==1)// green1 vs red3
                {
                oneto3 = weak;
                threeto1 = strong;
                }
            if(color1==2 && color4==1)// green1 vs red4
                {
                oneto4= weak;
                fourto1 = strong;
                }
             if(color1==2 && color3==3)// green1 vs blue3
                {
                oneto3 = strong;
                threeto1 = weak;
                }
            if(color1==2 && color4==3)// green1 vs blue4
                {
                oneto4= strong;
                fourto1 = weak;
                }
                //2 VS ALL *****************************************************************************************************
            if(color2==1 && color3==2)// red1 vs green3
                {
                twoto3 = strong;
                threeto2 = weak;
                }
            if(color2==1 && color3==3)// red1 vs blue3
                {
                twoto3 = weak;
                threeto2 = strong;
                }
            if(color2==1 && color4==2)// red1 vs green4
                {
                twoto4 = strong;
                fourto2 = weak;
                }
            if(color2==1 && color4==3)// red1 vs blue4
                {
                twoto4 = weak;
                fourto2 = strong;
                }
            
            if(color2==3 && color3==1)// blue1 vs red3
                  {
                twoto3 = strong;
                threeto2 = weak;
                  }
            if(color2==3 && color4==1)// blue1 vs red4
                {
                twoto4 = strong;
                threeto2 = weak;
                }
            if(color2==3 && color3==2)// blue1 vs green3
                  {
                twoto3 = weak;
                threeto2 = strong;
                  }
            if(color2==3 && color4==2)// blue1 vs green4
                {
                twoto4 = weak;
                fourto2 = strong;
                }
            
            if(color2==2 && color3==1)// green1 vs red3
                {
                twoto3 = weak;
                threeto2 = strong;
                }
            if(color2==2 && color4==1)// green1 vs red4
                {
                twoto4= weak;
                fourto2 = strong;
                }
             if(color2==2 && color3==3)// green1 vs blue3
                {
                twoto3 = strong;
                threeto2 = weak;
                }
            if(color2==2 && color4==3)// green1 vs blue4
                {
                twoto4= strong;
                fourto2 = weak;
                }


            
        }
        
    };
};
