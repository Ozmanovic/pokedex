import { getCommands } from "../commands.js";
export function commandHelp() {
    const availableCommands = getCommands();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (let key in availableCommands) {
        console.log(`${key}:`, availableCommands[key].description);
    }
}
