//class that describes how the player character behaves
class Char {
    constructor(size, picture, n, row, col) {
        this.size = size; //the size of the characters sprite/s
        this.pic = picture; //the characters sprite/s
        this.row = row; //current position in rows
        this.col = col; //current position in cols
        this.curF = 0; //current frame number in animation, also State variable for FSM
        this.nFrms = n; //number of frames in animation & number of states in FSM
        this.transTab = [
            [2, 4, 6, 1, 0],
            [2, 4, 6, 0, 0],
            [3, 4, 6, 0, 2],
            [2, 4, 6, 0, 2],
            [2, 5, 6, 0, 4],
            [2, 4, 6, 0, 4],
            [2, 4, 7, 0, 6],
			[2, 4, 6, 0, 6]
          ]; //this tell the character to go in the direction of the arrow pressed and then rest when stopped.
    }

    //function that updates the apparance of the character
    update() {
        image(this.pic[this.curF], this.col * tileSize, this.row * tileSize, this.size, this.size);
        var inputType; // look for LEFT (0) or RIGHT (1) arrow, 2 for all else

        if (keyIsDown(LEFT_ARROW)) {
            //map input condition to inType
            inputType = 0;
            console.log("LEFT_ARROW")
        } else if (keyIsDown(RIGHT_ARROW)) {
            inputType = 1;
            console.log("RIGHT_ARROW")
        } else if (keyIsDown(UP_ARROW)) {
            inputType = 2;
            console.log("UP_ARROW");
        } else if (keyIsDown(DOWN_ARROW)) {
            inputType = 3;
            console.log("DOWN_ARROW");
        } else {
            //any other input or lack of
            inputType = 4;
        }
        // Table lookup - No "if" statements needed!
        this.curF = this.transTab[this.curF][inputType]; // Transition to next state
        linkCur = this.curF;
    }

    //---FUNCTIONS THAT DESCRIBE MOVEMENT---
    //function that moves the character right
    moveRight() {
        //when you leave an underground area it puts you outside the entrance
        if (this.col > cols && isAboveGround == false) {
            isAboveGround = true;
            this.col = caveX;
            this.row = caveY + 1;
            console.log("it worked");
            //describes what happens if the character goes off the right of the screen
        } else if (this.col > cols && isAboveGround == true) {
            //moves the character to the next map screen and move the character to the opposite side of the screen
            this.col = 0;
            bgNum++;
        } else if (this.col >= 0 && this.col <= cols) {
            this.col = this.col + 1;
        }
    }

    //function that moves the character left
    moveLeft() {
        //when you leave an underground area it puts you outside the entrance
        if (this.col < 0 && isAboveGround == false) {
            isAboveGround = true;
            this.col = caveX;
            this.row = caveY + 1;
            //describes what happens if the character goes off the left of the screen
        } else if (this.col < 0) {
            this.col = cols;
            bgNum--;
            //moves the character to the next map screen and move the character to the opposite side of the screen
        } else if (this.col >= 0 && this.col <= cols) {
            this.col = this.col - 1;

        }
    }

    //function that moves the character up
    moveUp() {
        //when you leave an underground area it puts you outside the entrance
        if (this.row < 0 && isAboveGround == false) {
            isAboveGround = true;
            this.col = caveX;
            this.row = caveY + 1;
            //describes what happens if the character goes off the top of the screen
        } else if (this.row < 0) {
            this.row = rows;
            bgNum = bgNum + 4;
            //moves the character to the next map screen and move the character to the opposite side of the screen
        } else if (this.row >= 0 && this.row <= cols) {
            this.row = this.row - 1;

        }
    }

    //function that moves the character down
    moveDown() {
        //when you leave an underground area it puts you outside the entrance
        if (this.row > rows && isAboveGround == false) {
            isAboveGround = true;
            this.col = caveX;
            this.row = caveY + 1;
            //describes what happens if the character goes off the bottom of the screen
        } else if (this.row > rows) {
            //moves the character to the next map screen and move the character to the opposite side of the screen
            this.row = 0;
            bgNum = bgNum - 4;
            //checks that the character is on screen
        } else if (this.row >= 0 && this.row <= cols) {
            this.row = this.row + 1;
        }
    }
    //---SECTION END---

    //function that describes how attacking works
    //keyMap parameter to change what key attack is bound to
    attack(keyMap) {
        //checks to see if the character has a sword
        if (this.hasSword = true) {
            //if the player hits the attack key it checks the direction the player is facing and send the projectile in that direction
            if (keyCode === keyMap) {
                if (linkCur == 0 || linkCur == 1) {
                    //Character pointing down
                    projectile.push(new Beam(tileSize, laser, link.row + 1, link.col, "down"));
                } else if (linkCur == 2 || linkCur == 3) {
                    //character pointing left
                    projectile.push(new Beam(tileSize, laser, link.row, link.col - 1, "left"));
                } else if (linkCur == 4 || linkCur == 5) {
                    //character pointing right
                    projectile.push(new Beam(tileSize, laser, link.row, link.col + 1, "right"));
                } else if (linkCur == 6 || linkCur == 7) {
                    //character pointing up
                    projectile.push(new Beam(tileSize, laser, link.row - 1, link.col, "up"));
                }
                //sound effect
                attackSound.setVolume(0.2); //increases audio volume to be louder than bgm
                attackSound.play(); //Plays sound effect audio
                console.log(projectile);
            }
        }
    }

    //function that desribes how projectiles should continue in the direction they were fired in
    inertia() {
        for (var i = 0; i < projectile.length; i++) {
            projectile[i].update();
            if (projectile[i].dir == "down") {
                projectile[i].row = projectile[i].row + 1;
            } else if (projectile[i].dir == "left") {
                projectile[i].col = projectile[i].col - 1;
            } else if (projectile[i].dir == "right") {
                projectile[i].col = projectile[i].col + 1;
            } else if (projectile[i].dir == "up") {
                projectile[i].row = projectile[i].row - 1;
            }
        }
    }
}
