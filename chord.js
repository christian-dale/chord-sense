class Chord {
    constructor(notes = []) {
        this.notes = notes;
    }

    addNote(note) {
        this.notes.push(note);
    }

    getChord() {
        return Tonal.Chord.detect(this.notes.map(x => x.note));
    }
}
