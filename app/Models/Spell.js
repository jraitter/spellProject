export default class Spell {
    constructor(data, fromFlag) {
        this._id = data._id || "";
        this.name = data.name;
        this.description = data.desc || data.description;
        this.level = data.level;
        this.range = data.range;
        this.duration = data.duration;
        this.components = data.components;
        this.school = data.school;
        this.user = data.user;
        this.fromFlag = fromFlag || false;
    }

    getButton() {
        if (this.fromFlag) {
            return `<button class="btn btn-warning" onclick="app.spellsController.catch()">CATCH</button>`;
        }
        return `<button class="btn btn-danger" onclick="app.spellsController.release()">Release</button>`;
    }

    get Template() {
        return /*html*/ `
      <div class="card">
      <div class="card-body">
        <h5 class="card-title">Name: ${this.name}</h5>
        <p class="card-text">Description: ${this.description}</p>
        <p class="card-text">Level: ${this.level}</p>
        <p class="card-text">Range: ${this.range}</p>
        <p class="card-text">Duration: ${this.duration}</p>
        <p class="card-text">Components: ${this.components}</p>
        <p class="card-text">School: ${this.school}</p>

        ${this.getButton()}

      </div>
    </div>
      `;
    }
}

// sandbox schema for reference
// var schema = new Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     level: { type: Number },
//     range: { type: String, required: true },
//     duration: { type: String, required: true },
//     components: [{ type: String }],
//     user: { type: String, required: true },
// })