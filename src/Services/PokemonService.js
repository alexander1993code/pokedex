import PokemonModel from '../Models/PokemonModel.js';
import PaginateModel from '../Models/PaginateModel';
const axios = require('axios').default;


class PokemonService {

    async all(){

        let paginate = PaginateModel.empty();

        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
            
            const {count, next, previous, results} = response.data;

            
            paginate.count = count;
            paginate.next = next;
            paginate.previous = previous;
        

            let tempPokemons = [];

            results.forEach( async (item) =>{
               
               let tempPokemon =  await this.find(item.url);

               tempPokemons.push(tempPokemon);

            })
            
            paginate.results = tempPokemons;

        } catch (error) {
            
        }
        
        return paginate;
    }

    async find(url){

        const pokemon = new PokemonModel;

        const response = await axios.get(url);
        
        pokemon.getFromObject(response.data);
        
        const image = response.data.sprites['front_default'];
        const imageShow = response.data.sprites.other.dream_world.front_default;
        
        pokemon.imageDetails = image;
        pokemon.imageShow = imageShow;
        return pokemon;
    }
}

export default PokemonService;