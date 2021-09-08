import React, { Component } from 'react';
import styled from 'styled-components';
import {HashRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';
import '../index.css'

const TYPE_COLORS={
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric:'FBCC17',
    fairy:'F4B1F4',
    fighting:'823551D',
    fire:'E73B0C',
    ghost:'6060B2',
    grass:'74C236',
    ground:'D3B357',
    ice:'A3E7FD',
    normal:'C8C4BC',
    poison:'934594',
    psychic:'ED4882',
    rock:'B9A156',
    steel:'B5B5C3',
    water:'3295F6'
};

const Sprite=styled.img`
width: 6em;
height: 6em;
display:none;
`;
 
const StyleLink=styled(Link)`
text-decoration:none;
color:black;
&:focus,
&:hover,
&:visited,
&:link,
&:active{
    text-decoration:none
}
`;

class Card extends Component { 
state={
    name:'',
    imgUrl:'',
    id:'',
    types:[],
}

async componentDidMount(){
    const {name,url}=this.props;    
    const id=url.split("/")[url.split("/").length-2];
    const imgUrl=`https://github.com/PokeApi/sprites/blob/master/sprites/pokemon/${id}.png?raw=true`;
    this.setState({
        name,
        imgUrl,
        id,
        types:[],
    })

    //url for pokemon information
    const pokemonUrl=`https://pokeapi.co/api/v2/pokemon/${id}/`;
     
    //get pokemon information
    const response=await axios.get(pokemonUrl);    
    this.setState({        
        types:response.data.types.map(type=>type.type.name),
    }) 
}

render() {
    return (      
    <div className="col-md-4 col-sm-8 mb-4">                 
         <Router> 
            <StyleLink to={`/pokemon/${this.state.id}`}> 
                <div className="card card-styled align-items-center">
                    <h6 className="m-3" style={{fontWeight: 'bold'}}>
                    {this.state.name
                           .toLowerCase()
                           .split(' ')
                           .map(
                               l=> l.charAt(0).toUpperCase() + l.substring(1)
                               )
                           .join(' ')}                           
                    </h6>
                    <h6>
                        {(this.state.id).padStart(3, 0)}
                    </h6>
                    {
                        this.state.imageLoading?(
                            <img alt="" src=".\.\image\spinner.png" style={{width:'6em', height:'6em'}} 
                            className="card-img-top rounded mx-auto mt-0"></img>
                        )
                        :null
                    }

                    <Sprite className="card-img-top rounded mx-auto mt-2"
                    onLoad={()=>this.setState({imageLoading:false})}
                    onError={()=>this.setState({toManyRequests:true})}
                    src={this.state.imgUrl} 
                    style={
                        this.state.toManyRequests?{display:'none'}:
                        this.state.imageLoading? null : {display:'block'}
                    }                      
                    />
                    {this.state.toManyRequests ? (
                        <h6 className="mx-auto">
                            <span className="badge badge-danger mt-2">Muchas peticiones</span>
                        </h6>
                    ):null}
                   <div className="card-body">                       
                    <h6 className="card-tittle">

                    {this.state.types &&  
                    <>
                    {this.state.types.map(type=>(
                    <span key={type}
                    className="badge badge-primary badge-pill mr-1 pt-1 p-2"
                    style={{backgroundColor: `#${TYPE_COLORS[type]}`, color:'white'}}>
                    {type}                            
                    </span>
                    ))  
                    }
                    </> 
                    }                    
                            
                    </h6>
                   </div>
                </div>
            </StyleLink>         
       </Router> 
    </div>
    );
    }
}

export default Card;