import { State } from "../state.js"

export async function commandExit(obj: State) {
    console.log("Closing the Pokedex... Goodbye!")
    obj.readline.close()
    process.exit(0)
}