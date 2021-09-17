import { useObservableState } from 'observable-hooks';
import { FC } from 'react';
import { usePokemon } from '../store';

interface DeckProps {
    title: string;
}

const Deck: FC<DeckProps> = ({ title }) => {
    const { deck$ } = usePokemon();
    const deck = useObservableState(deck$, []);
    return (
        <div>
            <h4>{title.toUpperCase()}</h4>
            <div>
                {deck.map((p) => (
                    <div key={p.id} style={{ display: 'flex' }}>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                            alt={p.name}
                        />
                        <div>
                            <div>{p.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Deck;
