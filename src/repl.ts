import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
    const cleaned = input.trim().toLowerCase();

    if (cleaned === "") {
        return [];
    }

    return cleaned.split(/\s+/);
}

export function startREPL(state: State): void {
    state.rl.prompt();

    state.rl.on("line", (input: string) => {
        const words = cleanInput(input);

        if (words.length === 0) {
            state.rl.prompt();
            return;
        }

        const commandName = words[0];
        const command = state.commands[commandName];

        if (!command) {
            console.log("Unknown command");
            state.rl.prompt();
            return;
        }

        try {
            command.callback(state);
        } catch (error) {
            console.log(error);
        }

        state.rl.prompt();
    });
}