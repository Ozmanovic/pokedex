import { createInterface } from 'readline';
import { getCommands } from './commands.js';
export function cleanInput(input) {
    return input.trim().toLowerCase().split(" ").filter(Boolean);
}
export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    rl.prompt();
    function cBack(stering) {
        const cleaned = cleanInput(stering);
        if (cleaned.length === 0) {
            rl.prompt();
        }
        else {
            const availableCommands = getCommands();
            if (cleaned[0] in availableCommands) {
                try {
                    availableCommands[cleaned[0]].callback(availableCommands);
                }
                catch (error) {
                    console.log(`Something went wrong: ${error}`);
                }
            }
            else {
                console.log("Unknown command");
                rl.prompt();
            }
        }
    }
    rl.on('line', (input) => {
        cBack(input);
    });
}
