import React, {Component} from 'react';
import Pantry from './Pantry.jsx';
import Recipes from './Recipes.jsx'



export default class App extends Component {

  constructor(props){
    super(props);
    //When chat is first loaded, the chat window should be shown, there should
    //be no messages loaded and no sessionKey exists yet because it has not
    //communicated with the backend yet.
    this.state = { pantry: [], recipes:[{name:"recipe1", id:"1"}, {name:"recipe2", id:"2"}, {name:"recipe3", id:"3"}, {name:"recipe4", id:"4"}, {name:"recipe5", id:"5"}], sessionKey: null};

    this.insertToPantry = this.insertToPantry.bind(this);
    this.removeFromPantry = this.removeFromPantry.bind(this);
    this.insertToRecipes = this.insertToRecipes.bind(this);
    this.removeFromRecipes = this.removeFromRecipes.bind(this);
    this.hash = this.hash.bind(this);


  }



  insertToPantry(name, amount){
    var key = this.hash(name + amount);
    console.log("gen key" + key);
    var pantryItem = { quantity : amount, name : name, id:key };
    this.setState({pantry: this.state.pantry.concat([pantryItem])});
    //send item
  }



  removeFromPantry(id){
    // var item = {quantity: amount, name:name};
    //
    // console.log(item);
    var items = this.state.pantry.filter(function(itm){
      console.log("current" + itm.id);
      console.log("serch" + id);
      console.log(id != itm.id);
      return id !== itm.id;
    });

    this.setState({ pantry: items });
    // this.forceUpdate();
  }


  insertToRecipes(name){

    var recipeItem = {name : name, id:this.hash(name)};
    this.setState({recipes: this.state.recipes.concat([recipeItem])});

  }

  removeFromRecipes(index){

  }

  hash(input){

    var hash = 0, i, chr, len;

       // do something else


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



  render() {
    return (
      <div id="App">
        <Pantry className='Pantry' items={this.state.pantry} addFunc={this.insertToPantry} rmFunc={this.removeFromPantry} />
        <Recipes className='Recipes' items={this.state.recipes} addFunc={this.insertToRecipes} rmFunc={this.removeFromRecipes} />
      </div>
    );
  }


}
