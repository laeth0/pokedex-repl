import type { State } from "./state.js";

export async function commandExplore(
    state: State,
    ...args: string[]
): Promise<void> {
    const areaName = args[0];

    if (!areaName) {
        console.log("you must provide a location area");
        return;
    }

    console.log(`Exploring ${areaName}...`);

    const location = await state.pokeAPI.fetchLocation(areaName);

    console.log("Found Pokemon:");
    for (const encounter of location.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}
