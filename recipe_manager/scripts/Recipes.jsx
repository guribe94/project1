import React, {Component} from 'react';

var Loading = require('react-loading');

export default class Recipes extends Component {
  constructor(props) {
    super(props);

  }


  render(){

    if(this.props.loading){
      return(
        <Loading className='db_load_animation' type='bars' color='#e3e3e3' />
      );
    }
  else{
      // Loop through the list of items in the pantry
      var Items = this.props.items.map((data) => {
        return (
          //Generate a row for each item for the list
          <RecipeRow key={data.id} name={data.name} rmFunc={this.props.rmFunc} />
        )
      });
      return (
        <div className='RecipeItems'>
          <div className="recipes_header">Recipes</div>
          {Items}
        </div>
      );
    }
  }
}





export class RecipeRow extends Component {

  constructor(props) {
    super(props);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.name = this.props.name;

  }

  handleDeleteEvent(event){
    if (event.type === "click"){
      // var item = event.currentTarget;
      console.log(item);
      console.log("click happened");
      console.log(this.id);
      this.props.rmFunc(this.id);
      event.preventDefault();

    }
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
        <div className='RecipeName'>{this.name}</div>
      </div>
    );
  }
}
