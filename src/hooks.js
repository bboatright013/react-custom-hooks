import React, { useState, useRef, useEffect } from "react";
import {v4 as uuid} from 'uuid';
import axios from "axios";
  

function useAxios(keyInLS, baseUrl) {
    const [responses, setResponses] = useLocalStorage(keyInLS);
  
    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
      const response = await axios.get(`${baseUrl}${restOfUrl}`);
      setResponses(data => [...data, formatter(response.data)]);
    };
  
    const clearResponses = () => setResponses([]);
  
    return [responses, addResponseData, clearResponses];
  }
  
  function useLocalStorage(key, initialValue = []) {
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
  }
  
// const useAxios = (url, options = {}) => {
//     const [list, setList] = useState([]);
//     if(options.name){
//         let {name} = options;
//         const add = async({name}) => {
//             try{
//                 console.log(options);

//                 console.log(`${url}${name}/`)
//                 const res = await axios.get(`${url}${name}/`);
//                 setList( list => [...list, {...res.data, id: uuid() } ]);
//             }catch(error){
//                 console.log(error)
//             }
//         }
//         return [list, add];

//     } else {
//         const add = async() => {
//             try{
//                 const res = await axios.get(url);
//                 setList( list => [...list, {...res.data, id: uuid() } ]);
//             }catch(error){
//                 console.log(error)
//             }
//         }
//         return [list, add];
//     }
// }

// const [cards, setCards] = useState([]);

// const addCard = async () => {
//   const response = await axios.get(
//     "https://deckofcardsapi.com/api/deck/new/draw/"
//   );
//   setCards(cards => [...cards, { ...response.data, id: uuid() }]);
// };

// const [pokemon, setPokemon] = useState([]);

//   const addPokemon = async name => {
//     const response = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${name}/`
//     );
//     setPokemon(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
//   };



const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
        setIsFacingUp(isUp => !isUp);
      };

    return [isFacingUp, flipCard]
}

const useFetch = (url, options = {}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsloading] = useState(true);

    useEffect( () => {
    const fetchData = async () => {
        try {
            const res = await fetch(url, options);
            const json = await res.json(res);
            setResponse(json);
        } catch(error){
            setError(error);
        }
        setIsloading(false);
    };
    fetchData();
    }, []);
    return {response, error, isLoading }
}

export { useFlip, useFetch, useAxios, useLocalStorage };