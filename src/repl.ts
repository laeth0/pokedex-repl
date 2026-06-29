import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
    const cleaned = input.trim().toLowerCase();

    if (cleaned === "") {
        return [];
    }

    return cleaned.split(/\s+/);
}

export async function startREPL(state: State): Promise<void> {
    state.rl.prompt();

    let pendingCommand = Promise.resolve();

    state.rl.on("line", (input: string) => {
        pendingCommand = pendingCommand.then(() => handleInput(state, input));
    });
}

async function handleInput(state: State, input: string): Promise<void> {
    const words = cleanInput(input);

    if (words.length === 0) {
        state.rl.prompt();
        return;
    }

    const [commandName, ...args] = words;
    const command = state.commands[commandName];

    if (!command) {
        console.log("Unknown command");
        state.rl.prompt();
        return;
    }

    try {
        await command.callback(state, ...args);
    } catch (error) {
        console.log(error);
    }

    state.rl.prompt();
}
