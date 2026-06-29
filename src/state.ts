import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commands = getCommands();
    const pokeAPI = new PokeAPI();

    return {
        rl,
        commands,
        pokeAPI,
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: {},
    };
}
