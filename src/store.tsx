import { BehaviorSubject } from 'rxjs';
import { Pokemon } from './shared-types';

export const rawPokemon$ = new BehaviorSubject<Pokemon[]>([]);

fetch('/pokemon-simplified.json')
    .then((res) => res.json())
    .then((data) => rawPokemon$.next(data));
