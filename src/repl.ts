
import { State } from "./state.js";


export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ").filter(Boolean);
}

export async function startREPL(obj: State) {

  obj.readline.prompt();

  async function cBack(stering: string) {
    const cleaned = cleanInput(stering);
    if (cleaned.length === 0) {
      obj.readline.prompt();
    } else {
      const availableCommands = obj.commands
      if (cleaned[0] in availableCommands) {
        try {
          await availableCommands[cleaned[0]].callback(obj);
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
          obj.readline.prompt();
        }
      } else {
        console.log("Unknown command");
        obj.readline.prompt();
      }
    }
  }

  obj.readline.on("line", (input) => {
    cBack(input);
  });
}
