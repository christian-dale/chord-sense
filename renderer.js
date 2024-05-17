class Renderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.mousePos = {x: 0, y: 0};
        this.x = 0;
        this.y = 0;

        function getMousePos(canvas, evt) {
            const rect = canvas.getBoundingClientRect();

            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        canvas.addEventListener("mousemove", (evt) => {
            const mousePos = getMousePos(canvas, evt);

            this.mousePos.x = Math.floor(mousePos.x / Grid.size.x) * Grid.size.x;
            this.mousePos.y = Math.floor(mousePos.y / Grid.size.y) * Grid.size.y;

            this.x = this.mousePos.x + Grid.offset;
            this.y = this.mousePos.y + Grid.offset + 25;
        });
    }

    render(chord) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawStrings();
        this.drawFrets();
        this.drawNotes(chord);
        this.drawLabels();

        requestAnimationFrame(() => this.render(chord));
    }

    drawStrings() {
        this.ctx.strokeStyle = "blue";
    
        for (let i = 0; i < 6; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(Grid.offset + (i * 50), Grid.offset);
            this.ctx.lineTo(Grid.offset + (i * 50), 600 + Grid.offset);
            this.ctx.stroke();
        }
    }

    drawNotes(chord) {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        this.ctx.fillStyle = "blue";
        this.ctx.fill();

        chord.notes.forEach((note, index) => {
            this.ctx.beginPath();
            this.ctx.arc(note.x, note.y, 20, 0, Math.PI * 2);
            this.ctx.fillStyle = "green";
            this.ctx.fill();

            this.ctx.fillStyle = "white";
            this.ctx.fillText(index, note.x + 10, note.y - 5);
        });
    }
    
    drawFrets() {
        for (let i = 0; i < 13; i++) {
            if (i == 1) {
                this.ctx.strokeStyle = "green";
            } else {
                this.ctx.strokeStyle = "black";
            }

            this.ctx.beginPath();
            this.ctx.moveTo(Grid.offset, Grid.offset + (i * 50));
            this.ctx.lineTo(250 + Grid.offset, Grid.offset + (i * 50));
            this.ctx.stroke();
        }
    }

    drawLabels() {
        this.ctx.fillStyle = "black";

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 12; j++) {
                this.ctx.beginPath();
                this.ctx.arc(Grid.offset + (i * Grid.size.x), Grid.offset + (j * Grid.size.y) + 25, 10, 0, Math.PI * 2);
                this.ctx.stroke();
    
                if (Note.notes[i][j].length == 1) {
                    this.ctx.fillText(Note.notes[i][j], Grid.offset + (i * Grid.size.x) - 3, Grid.offset + (j * Grid.size.y) + 28);
                } else {
                    this.ctx.fillText(Note.notes[i][j], Grid.offset + (i * Grid.size.x) - 5, Grid.offset + (j * Grid.size.y) + 28);
                }
            }
        }
    }
}
