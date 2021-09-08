import React, { useEffect,useState}  from 'react';
import Card from './Card';
import axios from 'axios';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
const PokemonList=()=> {
const url="https://pokeapi.co/api/v2/pokemon/";
const[term,setTerm]=useState("");    
const [tabledata,setTableData]=useState([]); 

    const peticionGet=async()=>{      
    await axios.get(url)
    .then(res=>{     
        setTableData(res.data['results']);           
    });       
    }
          
      useEffect(()=>{    
          peticionGet();            
        },[]) 
           

        return (
            <>
            {tabledata? (  
                <div className="row d-flex justify-content-end">
                <div className="col-md-6 col-sm-6 mb-4"> 
                <div className="input-group mycustom">
                
                <input type="text" className="input form-control rounded-pill" placeholder="Search"     
                name="term" onChange={e => setTerm(e.target.value)} />

               {/*  <div className="input-group-prepend">
                <button className="btn btn-search btn-primary rounded-pill" type="submit"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                </div> */}
               
                </div>
 
                </div>

                <div className="row"> 
                {tabledata.filter((pokemon)=>{
                    if(term===""){
                        return pokemon
                    }else if(pokemon.name.toLowerCase().includes(term.toLowerCase())){
                        return pokemon
                    }
                }).map((pokemon,key)=>{
                    return(
                        <Card 
                        key={key}
                        name={pokemon.name}
                        url={pokemon.url}/>
                    );
                })}
                 </div>
              </div>
            ) : 
            (
                <h1>Cargando pokemones</h1>
            )}
           </>
        );
    }
 
export default PokemonList;