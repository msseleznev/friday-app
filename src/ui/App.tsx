import React from 'react';

import './App.css';
import {HashRouter} from "react-router-dom";
import {RoutesApp} from "./routes/RoutesApp";
import Header from "./header/Header";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <RoutesApp/>
            </HashRouter>
        </div>
    );
}

export default App;
