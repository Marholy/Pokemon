import React, { Component } from 'react';
import axios from 'axios';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
 
const TYPE_COLORS={
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric:'FBCC17',
    fairy:'F4B1F4',
    fighting:'823551D',
    fire:'ffb36b',
    ghost:'6060B2',
    grass:'74C236',
    ground:'D3B357',
    ice:'A3E7FD',
    normal:'C8C4BC',
    poison:'934594',
    psychic:'ED4882',
    rock:'B9A156',
    steel:'B5B5C3',
    water:'94caff'
};

export default class Pokemon extends Component {
    state={
        name:'',
        pokedexNumber:'',
        imgUrlnormal:'',
        imgUrlshinyFront1:'',
        imgUrlshinyBack1:'',      
        imgUrlshinyFront:'',
        imgUrlshinyBack:'',        
        types:[],
        height:'',
        weight:''
    }

    async componentDidMount(){
        const {id}=this.props.match.params;

        //url for pokemon information
        const pokemonUrl=`https://pokeapi.co/api/v2/pokemon/${id}/`; 

        //get pokemon information 
        const response=await axios.get(pokemonUrl);
      
        const name=response.data.name;
        const imgUrlnormal=response.data['sprites']['other']['official-artwork']['front_default'];
        
        const imgUrlshinyFront1=response.data['sprites']['versions']['generation-v']['black-white']['front_default'];
        const imgUrlshinyBack1=response.data['sprites']['versions']['generation-v']['black-white']['back_default'];
 

        const imgUrlshinyFront=response.data.sprites.front_shiny;
        const imgUrlshinyBack=response.data.sprites.back_shiny;

        const pokedexNumber=response.data.id;
        const height=response.data.height;
        const weight=response.data.weight;
        const types=response.data.types.map(type=>type.type.name);
        this.setState({
            name,
            pokedexNumber,
            imgUrlnormal,
            imgUrlshinyFront1,
            imgUrlshinyBack1,    
            imgUrlshinyFront,
            imgUrlshinyBack,        
            types,
            height,
            weight
        })    
    }

    render(){
    return (            
    <div className="row align-items-center">
        <div className="row mb-3">     
            <div className="col-12">       
                <Link className="btn btns btn-primary rounded-pill" to="/">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
            </div>
        </div>
        <div className="row">     
            <div className="col-md-4 col-sm-8">            
                <div className="card card-styled align-items-center margen">
                        <img alt="" src={this.state.imgUrlnormal}
                        className="card-img-top rounded" 
                        />
                        <div>                          
                            <img alt="" src={this.state.imgUrlshinyFront1}                                            
                            />                    
                            <img alt="" src={this.state.imgUrlshinyBack1}  
                            />
                        </div>
                    </div>
            </div>   
                   
            <div className="col-md-8 col-sm-12">
                <div className="card card-styled">    
                <div className="margen">               
                <h4 style={{fontWeight:'bold', fontSize:'35px'}}> {this.state.name
                           .toLowerCase()
                           .split(' ')
                           .map(
                               l=> l.charAt(0).toUpperCase() + l.substring(1)
                               )
                           .join(' ')}        
                    </h4>
                <div className="mb-4">
                    {this.state.types.map(type=>(
                        <span key={type}
                        className="badge badge-primary rounded-pill mx-1 badge-pill pt-1 p-2"
                        style={{backgroundColor: `#${TYPE_COLORS[type]}`, color:'white'}}>
                        {type.toLowerCase()
                        .split(' ')
                        .map(
                            l=> l.charAt(0).toUpperCase() + l.substring(1)
                            )
                        .join(' ')}                            
                        </span>
                    ))}
                </div> 

                <div className="subtitles col-12 col-md-12">
                    Pokedex Number                           
                    <h6>{this.state.pokedexNumber}</h6>
                    <hr/>
                </div>
                       
                <div className="subtitles col-12 col-md-12">
                    Height                            
                    <h6>{this.state.height}</h6>
                    <hr/>
                </div>
                       
                <div className="subtitles col-12 col-md-12">
                    Weight                           
                    <h6>{this.state.weight}</h6>
                    <hr/>
                </div>
                        
                <div className="subtitles col-12 col-md-12">
                    Shiny                        
            </div>
            </div>
            <div className="d-flex justify-content-start shiny"> 
                <img alt="" src={this.state.imgUrlshinyFront}                                                          
                />
                    
                <img alt="" src={this.state.imgUrlshinyBack}                                                    
                />
            </div>     
            </div>                         
       </div>
    </div>
 </div>           
)
}
}


