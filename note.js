class Note {
    static strings = ["E", "A", "D", "G", "B", "E"];
    static octave = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    static notes = [
        ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"], // Lower E string.
        ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], // A string.
        ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"], // D string.
        ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"], // G string.
        ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"], // B string.
        ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"], // E string.
    ];

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.string = Note.normalizeMousePos(x, y).x;
        this.note = this.getNote();
    }

    getNote() {
        return Note.getNoteFromPos(Note.normalizeMousePos(this.x, this.y).x, Note.normalizeMousePos(this.x, this.y).y);
    }

    toNumerical() {
        return Note.octave.indexOf(this.note);
    }

    static getNoteFromPos(x, y) {
        return Note.notes[x][y];
    }

    static normalizeMousePos(mousePosX, mousePosY) {
        return {
            x: Math.floor(mousePosX / Grid.size.x),
            y: Math.floor(mousePosY / Grid.size.y)
        };
    }

    static numericToNote(numeric) {
        return Note.octave[numeric];
    }
}
