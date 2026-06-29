import type { State } from "./state.js";

export async function commandCatch(
    state: State,
    ...args: string[]
): Promise<void> {
    const pokemonName = args[0];

    if (!pokemonName) {
        console.log("you must provide a Pokemon name");
        return;
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    const catchChance = Math.max(0.05, 1 - pokemon.base_experience / 300);

    if (Math.random() < catchChance) {
        state.pokedex[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught!`);
        return;
    }

    console.log(`${pokemon.name} escaped!`);
}
