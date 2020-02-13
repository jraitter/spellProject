import SpellsService from "../Services/SpellsService.js";
import store from "../store.js";

//Private
function _draw() {
  let spell = store.State.spells;
  let template = "";
  spell.forEach(p => {
    //NOTE this is not a full classed (its a pojo) object so we do not have 'Template'
    template += `<li onclick="app.spellsController.getSpellById('${p.id}')">${p.name}</li>`;
  });
  document.getElementById("spells").innerHTML = template;
}

function _drawMySpells() {
  let spell = store.State.mySpells;
  console.log("mySpells from drawMyspells", store.State.mySpells);

  let template = "";
  spell.forEach(p => {
    //NOTE this is not a full classed object (its a pojo) so we do not have 'Template'
    template += `<li onclick="app.spellsController.setMySpell('${p._id}')">${p.name}</li>`;
  });
  document.getElementById("my-spells").innerHTML = template;
}

function _drawActiveSpell() {
  let activeSpell = store.State.activeSpell;
  if (activeSpell) {
    document.getElementById("details").innerHTML = activeSpell.Template;
  } else {
    document.getElementById("details").innerHTML = ""
  }

}

//Public
export default class SpellsController {
  constructor() {
    console.log("SpellsController constuctor loaded");
    store.subscribe("spells", _draw);
    store.subscribe("activeSpell", _drawActiveSpell);
    store.subscribe("mySpells", _drawMySpells);
    SpellsService.getAllSpells();
    SpellsService.getAllMySpells();
  }
  getSpellById(id) {
    SpellsService.getSpellById(id);
  }
  catch() {
    let found = store.State.mySpells.find(
      s => s.name == store.State.activeSpell.name
    );
    if (found) {
      alert("You already own that spell");
      return;
    }
    SpellsService.catch();
  }
  setMySpell(id) {
    SpellsService.setMySpell(id);
  }
  release() {
    SpellsService.release();

  }
}
