export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.status}`);
        }

        return response.json() as Promise<ShallowLocations>;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.status}`);
        }

        return response.json() as Promise<Location>;
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: ShallowLocation[];
};

export type ShallowLocation = {
    name: string;
    url: string;
};

export type Location = {
    id: number;
    name: string;
    pokemon_encounters: PokemonEncounter[];
};

export type PokemonEncounter = {
    pokemon: {
        name: string;
        url: string;
    };
};