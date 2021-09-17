import { BehaviorSubject, map } from 'rxjs';
import { Pokemon } from './shared-types';

const rawPokemon$ = new BehaviorSubject<Pokemon[]>([]);

export const pokemonWithPower$ = rawPokemon$.pipe(
    map((pokemon) =>
        pokemon.map((p) => ({
            ...p,
            power:
                p.hp +
                p.attack +
                p.defense +
                p.special_attack +
                p.special_defense +
                p.speed,
        }))
    )
);

fetch('/pokemon-simplified.json')
    .then((res) => res.json())
    .then((data) => rawPokemon$.next(data));
