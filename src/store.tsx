import { createContext, FC, useContext } from 'react';
import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import { Pokemon } from './shared-types';

const rawPokemon$ = new BehaviorSubject<Pokemon[]>([]);

const pokemonWithPower$ = rawPokemon$.pipe(
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

const selected$ = new BehaviorSubject<number[]>([]);

const pokemon$ = pokemonWithPower$.pipe(
    combineLatestWith(selected$),
    map(([pokemon, selected]) =>
        pokemon.map((p) => ({
            ...p,
            selected: selected.includes(p.id),
        }))
    )
);

const deck$ = pokemon$.pipe(
    map((pokemon) => pokemon.filter((p) => p.selected))
);

fetch('/pokemon-simplified.json')
    .then((res) => res.json())
    .then((data) => rawPokemon$.next(data));

const PokemonContext = createContext({
    pokemon$,
    selected$,
    deck$,
});

export const PokemonProvider: FC = ({ children }) => (
    <PokemonContext.Provider value={{ pokemon$, selected$, deck$ }}>
        {children}
    </PokemonContext.Provider>
);

export const usePokemon = () => useContext(PokemonContext);
