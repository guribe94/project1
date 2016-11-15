import React, {Component} from 'react';
import Pantry from './Pantry.jsx';
import Recipes from './Recipes.jsx'



export default class App extends Component {

  constructor(props){
    super(props);
    //When chat is first loaded, the chat window should be shown, there should
    //be no messages loaded and no sessionKey exists yet because it has not
    //communicated with the backend yet.
    this.state = { pantry: [], recipes: [], sessionKey: null};

    this.insertToPantry = this.insertToPantry.bind(this);
    this.removeFromPantry = this.removeFromPantry.bind(this);
    this.insertToRecipes = this.insertToRecipes.bind(this);
    this.removeFromRecipes = this.removeFromRecipes.bind(this);

  }


  insertToPantry(name, amount){
    var pantryItem = { quantity : amount, name : name };
    this.setState({pantry: this.state.pantry.concat([pantryItem])});
    //send item
  }



  removeFromPantry(name, amount){
    var item = {quantity: amount, name:name};

    console.log(item);
    var items = this.state.pantry.filter(function(itm){
      console.log(itm);
      console.log((item.name != itm.name) && (item.quantity != itm.quantity));
      return (item.name != itm.name) && (item.quantity != itm.quantity);
    });

    this.setState({ pantry: items });
    // this.forceUpdate();
  }


  insertToRecipes(name, index){
    var recipeItem = {name : name, key:index};
    this.setState({recipes: this.state.recipes.concat([recipeItem])});
  }

  removeFromRecipes(index){

  }



  render() {
    return (
      <div id="App">
      <Pantry className='Pantry' items={this.state.pantry} addFunc={this.insertToPantry} rmFunc={this.removeFromPantry} />
      <Recipes className='Recipes' items={this.state.recipes} addFunc={this.insertToRecipes} rmFunc={this.removeFromRecipes} />
      </div>
    );
  }


}
