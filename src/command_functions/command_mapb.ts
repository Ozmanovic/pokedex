
import { State } from "../state.js"




export async function commandMapb(obj:State): Promise<void> {
    if (obj.prevLocationsURL != "" && obj.prevLocationsURL != null) {
    try {

    const api = await obj.pokeApi.fetchLocations(obj.prevLocationsURL)
    for (let res of api.results) {
        console.log(res["name"])
    }
    obj.nextLocationsURL = api.next
    obj.prevLocationsURL = api.previous
    

    }
    
    catch (error) {
        console.log(`Error: ${error}`)
    }
    return;
    }
    else {
        console.log("You are already on the first page!")
    }
    return;
}