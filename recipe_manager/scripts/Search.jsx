import React, {Component} from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearchEvent = this.handleSearchEvent.bind(this);
  }

  handleSearchEvent(event) {
    if (event.type === "click" || (event.keyCode && event.keyCode === 13)) {
      // this.props.insertToPantry(name, amt);
      var query = this.refs.query.value;
      event.preventDefault();
      event.stopPropagation(); // in case if send button would be ABOVE another button from the site
      this.props.searchFunc(query);

    }
  }

  handleFilterEvent(event) {
    //TODO on all radiopresses
    if (event.type === "click" || (event.keyCode && event.keyCode === 13)) {
      event.preventDefault();
      event.stopPropagation(); // in case if send button would be ABOVE another button from the site
      //TODO: handle EVENT

    }
  }

  handleSuggestion(event) {
    this.props.searchFunc(getCurrentFilters);
  }

  getCurrentFilters() {
    var filters = {
      inPantry: this.state.inPantry,
      quick: this.state.quick,
      noMeat: this.state.noMeat
    };
    return filters;
  }

  render() {
    return (
      <form>
        <div id='filters'>
          <Filter type="button" className="btn btn-primary btn-sm" filterName='inPantryFilter' filterFunc={this.props.filterFunc} text='Limit results to what I can make' onClick={this.handleFilterEvent} />
          <Filter type="button" className="btn btn-default btn-sm" filterName='quickFilter' filterFunc={this.props.filterFunc} text='Quick Recipes' onClick={this.handleFilterEvent} />
          <Filter type="button" className="btn btn-default btn-sm" filterName='noMeatFilter' filterFunc={this.props.filterFunc} text='No Meat' onClick={this.handleFilterEvent} />
          <button type="button" className="btn btn-primary btn-lg" onClick={this.handleSuggestion}>Make a Suggestion</button>

        </div>
      </form>
    );
  }

}


export class Filter extends Component {
  constructor(props) {
    super(props);
  }


  handleToggleEvent(event) {
    //TODO on all radiopresses
    if (event.type === "click" ) {
      event.preventDefault();
      event.stopPropagation(); // in case if send button would be ABOVE another button from the site
      //TODO: handle EVENT
      var filter = {filterName:this.props.filterName, value:!this.props.value}
      this.props.filterFunc(filter);

    }
  }



  render(){
    if(this.props.activated){
      return (<button type="button" className="btn btn-primary btn-sm"  onClick={this.handleToggleEvent.bind(this)}>{this.props.text}</button>);
    }else{
      return(<button type="button" className="btn btn-default btn-sm"  onClick={this.handleToggleEvent.bind(this)}>{this.props.text}</button>);
    }
  }
}
