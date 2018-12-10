//Tile class

class Tile {
    constructor(x, y, size, c, r, bgCol, imList) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.bgCol = bgCol;
        this.imageList = imList;
        this.imgNum = 0;
        this.indexC = c;
        this.indexR = r;
    }


    update() {
        fill(this.bgCol);

        stroke(250);
        rect(this.x, this.y, this.size, this.size);
        image(this.imageList[this.imgNum], this.x, this.y, this.size, this.size);
    }

    nextImage() {
        this.imgNum++;
        if (this.imgNum == this.imageList.length) {
            this.imgNum = 0;
        }
    }

    showNum() {
        console.log(this.indexR, this.indexC);
    }

    checkWithin(x, y) {
        if (x > this.x &&
            x < this.x + this.size &&
            y > this.y &&
            y < this.y + this.size) {

            return true;
        } else {
            return false;
        }
    }
}
