import React, {Component} from 'react';


export default class Pantry extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>
      <div id='pantry_header'>Pantry</div>
      <PantryInsert addFunc={this.props.addFunc} />
      <PantryList items={this.props.items} rmFunc={this.props.rmFunc} />
      </div>
    );
  }
}


export class PantryInsert extends Component {
  constructor(props) {
    super(props);
    this.handleInsertEvent = this.handleInsertEvent.bind(this);

  }


  handleInsertEvent(event, item) {
    //Onbutton click or enter key press
    if (event.type === "click" || (event.keyCode && event.keyCode === 13)) {
      //Get the values from the textboxes
      var name = this.refs.name.value.trim();
      var amt = this.refs.quantity.value.trim();
      console.log(name);
      console.log(amt);
      // this.props.insertToPantry(name, amt);
      //Stop the normal form sending action (page reload, POST, etc)
      event.preventDefault();
      event.stopPropagation(); // in case if send button would be ABOVE another button from the site
      //Add the item to the pantry
      this.props.addFunc(name, amt);
      //Reset the textboxes
      this.refs.name.value = '';
      this.refs.quantity.value = '';
    }
  }



  render() {
    return (
      <form>
      Ingredient:
      <input type="text" name="quantity" ref='name' />
      <input type="text" name="name" ref='quantity'/>

      <button
      className="btn btn-default"
      onClick={this.handleInsertEvent}>Add</button>
      </form>
    );
  }

}


export class PantryRow extends Component {

  constructor(props) {
    super(props);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    // this.id = this.props.key;
  }

  handleDeleteEvent(event){
    if (event.type === "click"){
      console.log(this);
      console.log("click happened");
      event.preventDefault();

      this.props.rmFunc(this.props.id);
    }
  }


  render() {
    return (
      <div className='PantryRow' >
      <p>Quantity: {this.props.quantity}</p>
      <p>Name: {this.props.name}</p>
      <button
      className="btn btn-default"
      onClick={this.handleDeleteEvent}>Delete</button>

      </div>
    );
  }
}


export class PantryList extends Component {

  constructor(props) {
    super(props);
    this.onRowRender = this.onRowRender.bind(this);
 	}

 	onRowRender(row) {
    //This functions scrolls to the bottom of the list. It is called after every
    //new row is inserted
	  var rowDOM = ReactDOM.findDOMNode(row);
		var parent = rowDOM.parentNode;
		parent.scrollTop = parent.scrollHeight;
	}


  render(){
    // Loop through the list of items in the pantry
    var Items = this.props.items.map((data, index) => {
      return (
        //Generate a row for each item for the list
        <PantryRow key={index} id={data.id} quantity={data.quantity} name={data.name} rmFunc={this.props.rmFunc} onRender={this.onRowRender} />
      )
    });

    return (
      <div className='PantryItems'>
      {Items}
      </div>
    );
  }
}
