import React, { Component } from 'react';
import PokemonList from '../PokemonList';

class Dashboard extends Component {
    render() {
        return (
            <div className="row">               
                <PokemonList />               
            </div>
        );
    }
}

export default Dashboard;