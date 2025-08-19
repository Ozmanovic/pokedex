import { State } from "../state.js"


export async function commandHelp(obj:State) {
    const availableCommands = obj.commands
    console.log("Welcome to the Pokedex!")
    console.log("Usage:\n")

    for (let key in availableCommands) {
        console.log(`${key}:`, availableCommands[key].description)
    }
    return
}