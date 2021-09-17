// import { useEffect } from 'react';
import './App.scss';
import Search from './components/Search';

function App() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <Search placeholder="search" />
        </div>
    );
}

export default App;
