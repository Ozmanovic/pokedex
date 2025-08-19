
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

const stateObject = initState()

function main() {
  startREPL(stateObject);
}

main();

