import { createInterface, Interface } from "readline";
import { commandExit } from "./command_functions/command_exit.js";
import { commandHelp } from "./command_functions/command_help.js";
import { commandMap } from "./command_functions/command_map.js";
import { commandMapb } from "./command_functions/command_mapb.js";
import { commandExplore } from "./command_functions/command_explore.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export function initState(): State {
    const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
    })
    
    const commands = {
        exit: {
          name: "exit",
          description: "Exits the pokedex",
          callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays 20 locations",
            callback: commandMap,
      },
        mapb: {
            name: "mapb",
            description: "Displays previous 20 locations",
            callback: commandMapb,
      },
        explore: {
            name: "explore",
            description: "Shows Pokemons in given Area-Location",
            callback: commandExplore,
      },
        
        

      
    }
    return {readline, commands, pokeApi: new PokeAPI(), nextLocationsURL: "https://pokeapi.co/api/v2/location-area/", prevLocationsURL: "" }
}
