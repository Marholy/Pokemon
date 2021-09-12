import React, { Component } from 'react';
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
    const response=await axios.get(url); 
  
    this.setState({
        name,
        imgUrl:response.data['sprites']['other']['official-artwork']['front_default'],
        id,
        types:response.data.types.map(type=>type.type.name),
    }) 
}

render() {
    return (      
    <div className="col-md-3 col-sm-6 mb-3">                 
         <Router> 
            <Link to={`/pokemon/${this.state.id}`} className="card-link"> 
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
                                  
                    <div className="sprite">
                    <img className="card-img-top rounded mx-auto mt-0"
                    src={this.state.imgUrl}                  
                    />
                    </div>

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
            </Link>         
       </Router> 
    </div>
    );
  }
}

export default Card;