export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
  try {
    if (pageURL) {
      const result = await fetch(pageURL, {
        method: "get",
        mode: "cors",
      });
      const JsonResult = await result.json();
      return JsonResult;

    } else {
      const result = await fetch(`${PokeAPI.baseURL}location-area/`, {
        method: "get",
        mode: "cors",
      });
      const JsonResult = await result.json();
      return { 
        count: JsonResult.count,
        next: JsonResult.next, 
        previous: JsonResult.previous,
        results: JsonResult.results

      };
    }
    } catch (error) {
      console.error(`Error in fetching result: ${error}`)
      throw error
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try {
      const result = await fetch(`${PokeAPI.baseURL}location-area/${locationName}`, {
        method: "get",
        mode: "cors",
      });
      const JsonResult = await result.json();
      return { name: JsonResult.name, url: `${PokeAPI.baseURL}/location-area/${locationName}` };
    }
    catch (error) {
      console.error(`Error with given name: ${error}`)
      throw error;
    }
    }
  }


export type ShallowLocations = {
  
    count: number,
    next: string,
    previous: string,
    results: Location[]
  
};

export type Location = {
  name: string,
  url: string
};
