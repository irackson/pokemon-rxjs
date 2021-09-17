import { FC, useEffect, useMemo, useState } from 'react';
import { Pokemon } from '../shared-types';
import { pokemon$, selected$ } from '../store';

interface SearchProps {
    placeholder: string;
}

const Search: FC<SearchProps> = ({ placeholder }) => {
    const [search, setSearch] = useState('');
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    const filteredPokemon = useMemo(
        () =>
            pokemon.filter(({ name }) =>
                name.toLowerCase().includes(search.toLowerCase())
            ),
        [pokemon, search]
    );
    useEffect(() => {
        const sub = pokemon$.subscribe(setPokemon);
        return () => sub.unsubscribe();
    }, []);

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '1rem',
                }}
            >
                {filteredPokemon.map((p) => (
                    <div key={p.name}>
                        <input
                            type="checkbox"
                            // checked={selected$.value.includes(p.id)}
                            checked={p.selected}
                            onChange={() => {
                                if (selected$.value.includes(p.id)) {
                                    selected$.next(
                                        selected$.value.filter(
                                            (id) => id !== p.id
                                        )
                                    );
                                } else {
                                    selected$.next([...selected$.value, p.id]);
                                }
                            }}
                        />
                        <strong>{p.name}</strong> - {p.power}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
