// import { useEffect } from 'react';
import './App.scss';
import Deck from './components/Deck';
import Search from './components/Search';
import { PokemonProvider } from './store';

function App() {
    return (
        <PokemonProvider>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    width: '90vw',
                    columnGap: '5vw',
                }}
            >
                <Search placeholder="search" />
                <Deck title={'deck'}></Deck>
            </div>
        </PokemonProvider>
    );
}

export default App;
