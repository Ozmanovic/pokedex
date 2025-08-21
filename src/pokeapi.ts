import { Cache } from "./pokecache.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(1000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const key = pageURL ?? `${PokeAPI.baseURL}location-area/`;
    const isCached = this.cache.get<ShallowLocations>(key);
    if (isCached) {
      return isCached;
    } else {
      try {
        const result = await fetch(key, {
          method: "get",
          mode: "cors",
        });
        const JsonResult = await result.json();
        const finalResult = {
          count: JsonResult.count,
          next: JsonResult.next,
          previous: JsonResult.previous,
          results: JsonResult.results,
        };
        this.cache.add(key, finalResult);
        return finalResult;
      } catch (error) {
        console.error(`Error in fetching result: ${error}`);
        throw error;
      }
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const cacheExists = this.cache.get<Location>(
      `${PokeAPI.baseURL}/location-area/${locationName}`
    );
    if (cacheExists) {
      return cacheExists;
    } else {
      try {
        const result = await fetch(
          `${PokeAPI.baseURL}location-area/${locationName}`,
          {
            method: "get",
            mode: "cors",
          }
        );
        const JsonResult = await result.json();
        const finalResult = {
          name: JsonResult.name,
          url: `${PokeAPI.baseURL}/location-area/${locationName}`,
        };
        this.cache.add(
          `${PokeAPI.baseURL}/location-area/${locationName}`,
          finalResult
        );
        return finalResult;
      } catch (error) {
        console.error(`Error with given name: ${error}`);
        throw error;
      }
    }
  }
  async fetchPokemonLocation(nameOrId: string): Promise<PokemonsInLocation[]> {
    const isCached = this.cache.get<PokemonsInLocation[]>(nameOrId);
    if (isCached) {
      return isCached;
    } else {
      try {
        const result = await fetch(
          `${PokeAPI.baseURL}/location-area/${nameOrId}`,
          {
            method: "get",
            mode: "cors",
          }
        );
        const JsonResult = await result.json();

        const PokemonsArr = JsonResult.pokemon_encounters.map(
          (poke: { pokemon: { name: string } }) => {
            return { name: poke.pokemon.name };
          }
        );

        this.cache.add(nameOrId, PokemonsArr);
        return PokemonsArr;
      } catch (error) {
        console.error(`Error in fetching result: ${error}`);
        throw error;
      }
    }
  }
  async catchPokemon(name: string): Promise<Pokemon> {
    const isCached = this.cache.get<Pokemon>(name);
    if (isCached) {
      return isCached;
    } else {
      try {
        const result = await fetch(`${PokeAPI.baseURL}/pokemon/${name}`, {
          method: "get",
          mode: "cors",
        });
        const JsonResult = await result.json();
        const pokemon: Pokemon = {
          name: JsonResult.name,
          type: JsonResult.types.map((typeObj:any) => typeObj.type.name), // ← TS infers the structure
          abilities: JsonResult.abilities.map(
            (abilityObj:any) => abilityObj.ability.name
          ),
          baseExperience: JsonResult.base_experience,
          height: JsonResult.height,
        };
        this.cache.add(name, pokemon);
        return pokemon;
      } catch (error) {
        console.error(`Error in fetching result: ${error}`);
        throw error;
      }
    }
  }
}

export type Pokemon = {
  name: string;
  type: string[];
  abilities: string[];
  baseExperience: number;
  height: number;
};

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};

export type PokemonsInLocation = {
  name: string;
};
