class Grid {
    static size = {x: 50, y: 50};
    static offset = 20;

    constructor(size = {x: 50, y: 50}, offset = 20) {
        Grid.size = size;
        Grid.offset = offset;
    }
}
