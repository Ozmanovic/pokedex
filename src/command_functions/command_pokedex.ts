import { State } from "../state.js";

export async function commandPokedex(obj: State): Promise<void> {
  

  if (obj.pokedex !== {}) {
    for (let poke of pokedex) {
      console.log(` - ${obj.pokeDex[poke].name}`);
    }
  } else {
    console.log("Pokedex is empty");
  }
}
