import React, { useEffect,useState}  from 'react';
import Card from './Card';
import axios from 'axios';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
function searchData(search){
    return function(pokemon){
      return pokemon.name.toLowerCase().includes(search.toLowerCase())
    }
}

const PokemonList=()=> {
const url="https://pokeapi.co/api/v2/pokemon/"; 
const [search, setSearch] = useState(""); 
const [data,setData]=useState([]); 
const [filteredData, setFilteredData] = useState([]);

    const getData=async()=>{  
        await axios.get(url)
        .then(res=>{     
            setData(res.data['results']);           
        });       
    }      
        
    useEffect(()=>{    
        getData(); 
        setFilteredData(data);         
    },[data]) 
 

    return (  
    <div className="row d-flex justify-content-end">
    {filteredData?
    <>
        <div className="col-md-6 col-sm-6 mb-4"> 
        <div className="input-group mycustom">
                
            <input type="text" className="input form-control rounded-pill" placeholder="Search"     
            name="term" onChange={e => setSearch(e.target.value)} />

            <div className="input-group-prepend">
                <button className="btn btns btn-primary rounded-pill" type="submit"
                ><FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
               
        </div> 
        </div>

        <div className="row"> 
            {filteredData.filter(searchData(search)).map((pokemon,key)=>{
            return(
                <Card 
                key={key}
                name={pokemon.name}
                url={pokemon.url}/>
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