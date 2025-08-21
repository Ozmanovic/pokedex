import { State } from "../state.js"


export async function commandExplore(obj: State, ...args: string[]): Promise<void> {

    const areaName = args[0]
    console.log("Debug - args:", args);
    console.log("Debug - args[0]:", args[0]);
    if (areaName) {
        try {
            console.log(`Exploring ${areaName}...`)
            const pokemonsArr = await obj.pokeApi.fetchPokemonLocation(areaName)
            if (pokemonsArr.length !== 0) {
                console.log("Found Pokemon:")
                for (let pokemon of pokemonsArr) {
                    console.log(` - ${pokemon.name}`)
                    }
            }
            else {
                console.log("No Pokemons found")
            }
            }
        catch (error) {
                console.log(`Error: ${error}`)
            }
            return;
            
            }
    else {
        console.log("Area missing from command; `Example command: Explore pastoria-city-area`")

    }
    }