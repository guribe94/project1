import React, {Component} from 'react';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.add = this.props.addFunc.bind(this);

    this.props.items.map((data, index) => {
      this.add(data.name, data.index);
    });
  }


  render(){
    // Loop through the list of items in the pantry
    var Items = this.props.items.map((data, index) => {
      this.props.addFunc(name, index);
      return (
        //Generate a row for each item for the list
        <RecipeRow key={index} name={data.name} rmFunc={this.props.rmFunc} />
      )
    });

    return (
      <div className='RecipeItems'>
        <h1>Recipes</h1>
        {Items}
      </div>
    );
  }
}







export class RecipeRow extends Component {

  constructor(props) {
    super(props);
    // this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.name = this.props.name;

  }

  // handleDeleteEvent(event, item){
  //   if (event.type === "click"){
  //     // var item = event.currentTarget;
  //     console.log(item);
  //     console.log("click happened");
  //     event.preventDefault();
  //     this.props.rmFunc(this.name, this.quantity);
  //   }
  // }


  // handleClick(event){
  //   //TODO: Open Recipe on Click
  // }


  render() {
    return (
      // Add your component markup and other subcomponent references here.
      <div className='RecipeRow' onClick={this.handleClick.bind(this)} >
        <div className='RecipeName'>{this.name}</div>
      </div>
    );
  }
}
