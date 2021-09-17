import { FC, useEffect, useMemo, useState } from 'react';
import { Pokemon } from '../shared-types';
import { pokemonWithPower$ } from '../store';

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
        const sub = pokemonWithPower$.subscribe(setPokemon);
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
                    gap: '1rem',
                }}
            >
                {filteredPokemon.map((p) => (
                    <div key={p.name}>
                        <strong>{p.name}</strong> - {p.power}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
