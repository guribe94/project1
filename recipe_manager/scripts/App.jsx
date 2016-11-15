import React, {Component} from 'react';
import Pantry from './Pantry.jsx';
import Recipes from './Recipes.jsx'
import Search from './Search.jsx'



export default class App extends Component {

  constructor(props){
    super(props);
    //Initial state of the app onLoad
    this.state = { pantry: [], recipes:[{name:"recipe1", id:"1"}, {name:"recipe2", id:"2"}, {name:"recipe3", id:"3"}, {name:"recipe4", id:"4"}, {name:"recipe5", id:"5"}], isLoading : false, sessionKey: null};
    //Bind all necessary functions
    this.insertToPantry = this.insertToPantry.bind(this);
    this.removeFromPantry = this.removeFromPantry.bind(this);
    this.insertToRecipes = this.insertToRecipes.bind(this);
    this.removeFromRecipes = this.removeFromRecipes.bind(this);
    this.search = this.search.bind(this);
    this.filterRecipes = this.filterRecipes.bind(this);
    this.hash = this.hash.bind(this);



  }


  search(query){
    //Update the loading state so the animation will show
    this.setState({isLoading : true});
  }


/*
* State Logic - These are functions for modifying the global state of the app.
* This was designed like this so API calls/validation to database backend can be
* handled by the App component
*/

  insertToPantry(name, amount){
    //Generate a string unique to the item by concating all fields into a string
    //then hashing it
    var key = this.hash(name + amount);
    //Create item
    var pantryItem = { quantity : amount, name : name, id:key };
    //Update State
    this.setState({pantry: this.state.pantry.concat([pantryItem])});
    //TODO:send item
  }



  removeFromPantry(id){
    var items = this.state.pantry.filter(function(itm){
      //Return all elements that do not have the same id
      return id !== itm.id;
    });
    //Update the state to no longer include the element being searched for
    //If it doesn't exist, the list will not be changed
    this.setState({ pantry: items });
  }


  insertToRecipes(name){
    //Create new recipe item
    var recipeItem = {name : name, id:this.hash(name)};
    this.setState({recipes: this.state.recipes.concat([recipeItem])});

  }

  removeFromRecipes(index){

  }

  hash(input){
    //Hash func inspired by http://stackoverflow.com/a/7616484/3282276
    //Needed to generate unique keys for components
    var hash = 0, i, chr, len;
    if (input.length === 0){
      return hash;
    }
    for (i = 0, len = input.length; i < len; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  filterRecipes(filter){

  }



  render() {
    return (
      <div id="App">
        <Pantry className='Pantry' items={this.state.pantry} addFunc={this.insertToPantry} rmFunc={this.removeFromPantry} loading={this.state.isLoading} />
        <Search className='Search' searchFunc={this.search} filterFunc={this.filterRecipes}/>
        <Recipes className='Recipes' items={this.state.recipes} addFunc={this.insertToRecipes} rmFunc={this.removeFromRecipes} loading={this.state.isLoading} />

      </div>
    );
  }


}
