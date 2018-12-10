// Andrew Lefurge
// igme 101
// Final Project
// 12-13-2017
/*---INSTRUCTIONS---

-NOTE------------------------------------------------------------------------------------

THE LEGEND OF ZELDA IS PROPERTY OF NINTENDO CO LTD AND SHIGERU MIYAMOTO

THIS IS A FAN ATTEMPT TO RECREATE THE ORIGINAL NES GAME IN P5.JS FOR EDUCATIONAL PURPOSES
THIS PROJECT DOES NOT REFLECT THE INTENTIONS OF THE SERIES OWNERS

-----------------------------------------------------------------------------------------


                                       /@
                       __        __   /\/
                      /==\      /  \_/\/
                    /======\    \/\__ \__
                  /==/\  /\==\    /\_|__ \
               /==/    ||    \=\ / / / /_/
             /=/    /\ || /\   \=\/ /
          /===/   /   \||/   \   \===\
        /===/   /_________________ \===\
     /====/   / |                /  \====\
   /====/   /   |  _________    /  \   \===\    THE LEGEND OF
   /==/   /     | /   /  \ / / /  __________\_____      ______       ___
  |===| /       |/   /____/ / /   \   _____ |\   /      \   _ \      \  \
   \==\             /\   / / /     | |  /= \| | |        | | \ \     / _ \
   \===\__    \    /  \ / / /   /  | | /===/  | |        | |  \ \   / / \ \
     \==\ \    \\ /____/   /_\ //  | |_____/| | |        | |   | | / /___\ \
     \===\ \   \\\\\\\/   /////// /|  _____ | | |        | |   | | |  ___  |
       \==\/     \\\\/ / //////   \| |/==/ \| | |        | |   | | | /   \ |
       \==\     _ \\/ / /////    _ | |==/     | |        | |  / /  | |   | |
         \==\  / \ / / ///      /|\| |_____/| | |_____/| | |_/ /   | |   | |
         \==\ /   / / /________/ |/_________|/_________|/_____/   /___\ /___\
           \==\  /               | /==/
           \=\  /________________|/=/
             \==\     _____     /==/
            / \===\   \   /   /===/
           / / /\===\  \_/  /===/
          / / /   \====\ /====/
         / / /      \===|===/
         |/_/         \===/
                        =

                                                                                 BETA 1.0

-CONTROLS--------------------------------------------------------------------------------

-MOVEMENT-             -ATTACK-

Up = Up Arrow          Sword (Laser) = CTRL
Down = Down Arrow
Right = Right Arrow
Left = Left Arrow

-HOW TO PLAY-----------------------------------------------------------------------------

Explore Hyrule by controlling Link (you). Enter Caves by going over them and leave them
by going out the way you came in. Explore news areas by walking past the edge of the
screen (don't go to far in any direction). Attack with you sword to shoot lasers and
pretend there is something dangerous to use them on.

-----------------------------------------------------------------------------------------
*/

//---GLOBAL VARIABLES---
let tileSize = 40; //describes the size of individual tiles
let rows = 11; //describes the number of rows
let cols = 16; //describes the number of columns
let link; //variable for the player character object
let charImg = []; //array that stores the character sprites
let nFrms = 8; //variable that describes the number of frames in the character animation
let bgImages = []; //array that stores all the background images
let ugImages = []; //array for background images of the underground
let bgNum = 2; //variable for the current background image initialized for the starting area
var bgm; //variable that stores the background music
var attackSound; //variable that stores the attack sound
let projectile = []; //array that stores projectiles
var linkCur; //links current location logged as a global variable
let laser; //variable that stores the image of the projectile
var isAboveGround = true; //variable for if the player is obe or bellow ground
var caveX;
var caveY;
//---SECTION END---

//function to preload assets to be called later
function preload() {
    //preloads the background music
    soundFormats('mp3', 'ogg');
    bgm = loadSound('../audio/bgm.mp3');
    //preload projectile image
    laser = loadImage("../images/projectile.png");
    //preploads the map files
    for (var i = 0; i < 12; i++) {
        bgImages[i] = loadImage("../images/map" + i + ".gif");
    }
    //preloads underground images
    for (var i = 0; i < 12; i++) {
        ugImages[i] = loadImage("../images/map" + i + "u.gif");
    }
    //preloads the character images
    for (var i = 0; i < nFrms; i++) {
        // Number in the file name matches the array offset & loop counter i
        charImg[i] = loadImage("../images/link" + i + ".png");
    }
}

//setup happens once at start of program
function setup() {
    //changes the framerate of draw to 15 for more character control
    frameRate(15);
    //sets the attack sound to the sword sound that is preloaded
    //this is here because either p5 or JS will not allow me to preload more that one sound in the preload function
    attackSound = loadSound('../audio/sword.mp3');
    //sets the volume of the background music
    bgm.setVolume(0.1);
    //starts playing the background music
    bgm.play();
    //creates the world
    createCanvas(cols * tileSize, rows * tileSize);
    //makes background that is overwritten just for good measure
    background(180);
    //set the size of the tiles
    tileSize = width / cols;
    //creates an instance of the player character
    link = (new Char(tileSize, charImg, nFrms, 7, 7));
}

//draw happens 15/s
function draw() {
    //determines where the cave is based on bgNum
    moveCave();
    //switches between the aboveground and bellow ground backgrounds
    if (link.col == caveX && link.row == caveY) {
        isAboveGround = false;
        link.row = 10;
        link.col = 7;
    }
    if (isAboveGround == true) {
        bgImage = bgImages[bgNum];
    } else if (isAboveGround == false) {
        bgImage = ugImages[bgNum];
    }
    image(bgImage, 0, 0, 640, 440);
    //updates the location and animation of the player character
    link.update();
    //---CHARACTER MOVEMENT---
    //call the movement function from Char class corisponding to the held arrow key
    if (keyIsDown(LEFT_ARROW)) {
        link.moveLeft();
    } else if (keyIsDown(RIGHT_ARROW)) {
        link.moveRight();
    } else if (keyIsDown(UP_ARROW)) {
        link.moveUp();
    } else if (keyIsDown(DOWN_ARROW)) {
        link.moveDown();
    }
    //---SECTION END---
    //calls the intertia function from the Char class to refresh the location of the projectiles
    link.inertia();
}

//describes what happens when certain keys are pressed
function keyPressed() {
    //calls the attack function from the Char class when CONTROL is pressed
    link.attack(CONTROL);
    //logs character location to the console when any key is pressed for debugging
    console.log("link's x =" + link.col);
    console.log("link's Y =" + link.row);
    console.log(bgNum);
    console.log(caveX, caveY);
}
//function for moving the cave X and Y depending on the background
function moveCave() {
    switch (bgNum) {
        case 0:
            //changes the caves X coordinate to match te map
            caveX = 2;
            //changes the caves Y coordinate to match te map
            caveY = 1;
            break;
        case 1:
            caveX = 6;
            caveY = 1;
            break;
        case 2:
            caveX = 4;
            caveY = 1;
            break;
        case 3:
            caveX = 4;
            caveY = 6;
            break;
        case 4:
            caveX = 20;
            caveY = 20;
            break;
        case 5:
            caveX = 7;
            caveY = 1;
            break;
        case 6:
            caveX = 7;
            caveY = 1;
            break;
        case 7:
            caveX = 2;
            caveY = 6;
            break;
        case 8:
            caveX = 20;
            caveY = 20;
            break;
        case 9:
            caveX = 10;
            caveY = 6;
            break;
        case 10:
            caveX = 20;
            caveY = 20;
            break;
        case 11:
            caveX = 20;
            caveY = 20;
    }
}
