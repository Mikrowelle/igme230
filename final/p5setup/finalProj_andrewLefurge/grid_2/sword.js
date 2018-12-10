class Beam {
    constructor(size, picture, row, col, dir) {
        this.size = size;
        this.pic = picture;
        this.row = row;
        this.col = col;
        this.dir = dir;
    }

    //refreshes the location of the sword beam
    update() {
        image(this.pic, this.col * tileSize, this.row * tileSize, this.size, this.size);

    }
}
