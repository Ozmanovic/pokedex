import { State } from "../state.js"


export function getRandomInt(min:number, max:number):number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export async function commandCatch(obj: State, ...args: string[]): Promise<void> {

    const pokemonName = args[0]

    if (pokemonName) {
        try {
            console.log(`Throwing a Pokeball at ${pokemonName}...`)
            const pokemon = await obj.pokeApi.catchPokemon(pokemonName)
            if (pokemon.baseExperience >= 0 && pokemon.baseExperience < 100) {
                
                console.log(`${pokemonName} should be an easy catch!(odds: 66%)`)
                if (Math.random() < 0.66) {
                    obj.pokeDex[pokemon.name] = pokemon;
                    console.log(`YOU GOT THE LITTLE BITCH! ${pokemonName} Is added to your PokeDex`)
                } else {
                    console.log(`${pokemonName} Got away! WHAT THE HELL BRUV. Cmon this should be easy!`)
                }

            }
            else if (pokemon.baseExperience >= 100 && pokemon.baseExperience <= 200) {
                
                console.log(`${pokemonName} Is a little trickier to catch! (odds: 14%)`)
                if (Math.random() < 0.23) {
                    obj.pokeDex[pokemon.name] = pokemon;
                    console.log(`YOU GOT THE LITTLE BASTARD! ${pokemonName} Is added to your PokeDex`)
                } else {
                    console.log(`${pokemonName} Got away! WHAT THE HELL BRUV. Cmon lad!`)
                }

            }
            else if (pokemon.baseExperience >= 200 && pokemon.baseExperience <= 350) {
                
                console.log(`${pokemonName} Is a difficult  catch! (odds: 5%)`)
                if (Math.random() < 0.05) {
                    obj.pokeDex[pokemon.name] = pokemon;
                    console.log(`YOU GOT THE BIG BASTARD! ${pokemonName} Is added to your PokeDex`)
                } else {
                    console.log(`${pokemonName} Got away! Tricky little bastard!`)
                }

            }   
            else if (pokemon.baseExperience >= 351) {
                   
                console.log(`${pokemonName} Don't even try this one! (odds: 0.4%)`)
                if (Math.random() < 0.004) {
                    obj.pokeDex[pokemon.name] = pokemon;
                    console.log(`YOU GOT THE BIG AMAZING SUPER BEAUTIFUL BASTARD! ${pokemonName} Is added to your PokeDex`)
                } else {
                    console.log(`${pokemonName} Got away! Why did you even try!`)
                }
            }

        } catch (error) {
            console.log(`Error: ${error}`)
        }
        return;
    }
}
 