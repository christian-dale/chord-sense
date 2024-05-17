class Main {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.chord = new Chord();
        this.grid = new Grid();
        this.renderer = new Renderer(this.canvas, this.ctx);
        this.renderer.render(this.chord);

        this.handleEvents();
    }

    handleEvents() {
        this.canvas.addEventListener("click", (evt) =>
            this.chord.addNote(new Note(this.renderer.x, this.renderer.y)));
        
        document.querySelector(".btn-analyze").addEventListener("click", () => {
            const chordType = this.chord.getChord();
            document.querySelector(".current-chord span").innerHTML = chordType.map(x => `<a>${x}</a>`);
        });

        document.querySelector(".btn-reset").addEventListener("click", () => {
            document.querySelector(".current-chord span").innerHTML = "";

            this.chord.notes = [];
        })
    }
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const main = new Main(canvas, ctx);
