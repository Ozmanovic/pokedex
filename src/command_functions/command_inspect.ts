import { State } from "../state.js"


export async function commandInspect(obj: State, ...args: string[]): Promise<void> {

    const pokemon = args[0]

    if (pokemon) {
        if (pokemon in obj.pokeDex) {
            console.log(obj.pokeDex[pokemon])
        }
        else {
            console.log("You don't have this pokemon in your PokeDex")
        }
        }
    else {
        console.log("You must enter a valid Pokemon")
    }
        }