import Spell from "../Models/Spell.js";
import store from "../store.js";

// @ts-ignore
let _spellsApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/spells",
  timeout: 3000
});

// @ts-ignore
let _mySpellsApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/James/spells",
  timeout: 3000
});
class SpellsService {
  constructor() {
    console.log("SpellsService constructor loaded");
  }
  getAllSpells() {
    _spellsApi
      .get("").then(results => {
        store.commit("spells", results.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  getAllMySpells() {
    _mySpellsApi
      .get("").then(results => {
        store.commit("mySpells", results.data.data)
      })
      .catch(error => {
        console.error(error);
      });
  }
  getSpellById(id) {
    _spellsApi(id)
      .then(result => {
        console.log("return result", result);
        let spell = new Spell(result.data, true);
        store.commit("activeSpell", spell);
        console.log("active spell", store.State.activeSpell);
      })
      .catch(error => {
        console.error(error);
      });
  }
  catch() {
    // fix description it is an [], needs to be string
    let activeSpell = store.State.activeSpell;
    activeSpell.description = activeSpell.description.join(" ");

    _mySpellsApi
      .post("", store.State.activeSpell)
      .then(result => {
        let newSpell = new Spell(result.data.data);
        store.State.mySpells.push(newSpell);
        store.commit("mySpells", store.State.mySpells)
        console.log("mySpells", store.State.mySpells);

      })
      .catch(error => {
        console.error(error);
      });
  }
  setMySpell(id) {
    let mySpells = store.State.mySpells;
    let foundSpell = mySpells.find(s => s._id == id)
    foundSpell = new Spell(foundSpell, false)
    store.commit("activeSpell", foundSpell);
  }
  getMySpellById(id) {
    _mySpellsApi(id)
      .then(result => {
        console.log("return result", result);
        let spell = new Spell(result.data, false);
        store.commit("activeSpell", spell);
        console.log("active spell", store.State.activeSpell);
      })
      .catch(error => {
        console.error(error);
      });
  }
  release() {
    _mySpellsApi
      .delete(store.State.activeSpell._id)
      .then(result => {
        let filteredList = store.State.mySpells.filter(
          s => store.State.activeSpell._id != s._id);
        store.commit("mySpells", filteredList);
        store.commit("activeSpell", null)
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const service = new SpellsService();
export default service;
