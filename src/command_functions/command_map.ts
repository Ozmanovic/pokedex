
import { State } from "../state.js"




export async function commandMap(obj:State): Promise<void> {
    if (obj.nextLocationsURL !== "" && obj.nextLocationsURL !== null) {
    try {

    const api = await obj.pokeApi.fetchLocations(obj.nextLocationsURL)
    for (let res of api.results) {
        console.log(res["name"])
    }
    obj.nextLocationsURL = api.next
    obj.prevLocationsURL = api.previous
    

    }
    
    catch (error) {
        console.log(`Error: ${error}`)
    }
    return
    }
    else {
        console.log("You are on the final page!")
    }
    return
    
}