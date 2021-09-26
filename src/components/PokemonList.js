import React, {useEffect,useState,useCallback}  from 'react';
import Card from './Card';
import axios from 'axios';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {HashRouter as Router, Link} from 'react-router-dom';
import '../index.css';

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

function searchP(searchPokemon){
  return function(x){ 
    console.log(searchPokemon);
    return x.name.toLowerCase().includes(searchPokemon) & !searchPokemon
  }
}

const PokemonList=()=> {
const url="https://pokeapi.co/api/v2/pokemon/"; 
const [data, setData]= useState([]);   
const [dataOriginal, setDataOriginal]=useState([]);
const[searchPokemon,setSearchPokemon]=useState("");
//const [reloadFlag, setReloadFlag] = useState(false);
//let debounceFn = _.debounce(emitChange, 500);
const [pokemon,setPokemon]=useState({  
  name:'',
  imgUrl:'',
  id:'',
  types:[],
})    

const getData=async()=>{  
  try{
    axios.get(url).then(res=>{   
      setDataOriginal(res.data['results']);     
  }); 
  } catch(e){
    console.log(e.message);
  }        
}

/* useEffect(()=>{    
    try{
      axios.get(url).then(res=>{   
        setData(res.data['results']); 
      
    }); 
    } catch(e){
      console.log(e.message);
    }
  },[]);  */

  useEffect(()=>{    
    getData(); 
    setData(dataOriginal);  
},[dataOriginal]) 

/*   
  const reloadData = useCallback(()=>{
    try{
      axios.get(url).then(res=>{     
        setData(res.data['results']);   
       console.log(data);
    }); 
    } catch(e){
      console.log(e.message);
    }
  },[]);
  
  useEffect(()=>{    
    reloadData();
    return () => setReloadFlag(false);
  },[reloadFlag,reloadData]); 

  function handleOnChange(e){
    debounceFn(e.target.value);
  }

  function emitChange(name){
    const filterResults = data.filter(item=>item.name === name);
    if(filterResults.length > 0){
      setData(filterResults);
      console.log(data);
    } else {
      setReloadFlag(true);
    }
  }
 */

  const dataPokemon=async()=>{     
    //const {name,url}=this.props;    
    const id=data.url.split("/")[data.url.split("/").length-2];
    const response=await axios.get(data.url); 
  
    setPokemon({
        name:response.data.name,
        imgUrl:response.data['sprites']['other']['official-artwork']['front_default'],
        id,
        types:response.data.types.map(type=>type.type.name),
    }) 
}

return (  
    <div className="row d-flex justify-content-end">
    {data?
    <>
        <div className="col-md-6 col-sm-6 mb-4"> 
        <div className="input-group mycustom">
        
        <input type="text" className="input form-control rounded-pill" placeholder="Search"     
          name="searchPokemon" onChange={e => setSearchPokemon(e.target.value)} 
          autoComplete="off"
        />

        <div className="input-group-prepend">
            <button className="btn btns btn-primary rounded-pill" type="submit"
            ><FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
               
        </div> 
        </div>

        <div className="row"> 
            {data.filter(searchP(searchPokemon)).map((item, index) => {
            return(
            <Card 
                key={index}
                name={item.name}
                url={item.url}/>        
            /*<div className="col-md-3 col-sm-6 mb-3">   
                <Router> 
                   <Link to={`/pokemon/${index}`} className="card-link"> 
                       <div className="card card-styled align-items-center">
                           <h6 className="m-3" style={{fontWeight: 'bold'}}>
                           {item.name
                                  .toLowerCase()
                                  .split(' ')
                                  .map(
                                      l=> l.charAt(0).toUpperCase() + l.substring(1)
                                      )
                                  .join(' ')}                           
                           </h6>
                           <h6>
                            {(pokemon.id).padStart(3, 0)}                              
                           </h6>
                                         
                           <div className="sprite">
                           <img className="card-img-top rounded mx-auto mt-0" alt=""
                           src={this.state.imgUrl}                  
                           /> 
                           </div>
       
                          <div className="card-body">                       
                           <h6 className="card-tittle">
                          {/* 
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
           </div> */  
           );
         })}
        </div>
        </>
        :
        <div>Loading...</div>
        }
    </div> 
    );
}
 
export default PokemonList;