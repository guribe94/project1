import React, {Component} from 'react';
import SearchInput, {createFilter} from 'react-search-input'

var Loading = require('react-loading');



export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {items:this.props.items, searchTerm: ''};
    this.searchUpdated = this.searchUpdated.bind(this);

  }

  searchUpdated (term) {
     this.setState({searchTerm: term});
   }


  render(){
    var KEYS_TO_FILTERS = ['name'];
    // var filtered = this.state.items.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    if(this.props.loading){
      return(
        <Loading className='db_load_animation' type='bars' color='#e3e3e3' />
      );
    } else {
      // Loop through the list of items in the pantry
      var Items = this.props.items.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS)).map((data) => {
        return (
          //Generate a row for each item for the list
          <RecipeRow key={data.id} name={data.name} recipe={data.instructions} rmFunc={this.props.rmFunc} />
        )
      });
      return (
        <div className='RecipeItems'>
          <div className="recipes_header">Recipes</div>
         <SearchInput className="search-recipes form-control" onChange={this.searchUpdated.bind(this)} />
          {Items}
        </div>
      );
    }
  }
}





export class RecipeRow extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }


  handleClick(event){

    if (event.type === "click") {
      //TODO: Open Recipe on Click
      alert(this.name);
    }
  }


  render() {

    return (
      // Add your component markup and other subcomponent references here.
      <div className='RecipeRow' onClick={this.handleClick.bind(this)} >
        <div className='RecipeName'>{this.props.name}</div>
        <br />
        <p>Recipe:</p>
        <br />
        <div className='RecipeInstructions'>{this.props.ingredients}</div>
      </div>
    );
  }
}
