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
      var query = this.refs.query.value;
      event.preventDefault();
      event.stopPropagation(); // in case if send button would be ABOVE another button from the site
      //TODO: handle EVENT

    }
  }



  render(){
    return(
        <form>
      <div id='filters'>

          <button type="button" className="btn btn-primary btn-sm">Limit results to what I can make</button>
          <button type="button" className="btn btn-default btn-sm">Quick Recipes</button>
          <button type="button" className="btn btn-default btn-sm">I don't eat meat</button>
          <button type="button" className="btn btn-default btn-sm">I don't eat pork</button>

        </div>
      <div id='searchBox'>
          Search
          <input className="form-control" type="text" name="query" ref='query' />
          <button
            className="btn btn-default"
            onClick={this.handleSearchEvent}>Search</button>
        </div>
        <button
          className="btn btn-default"
          onClick={this.handleSearchEvent}>Make a suggestion</button>
        </form>
      );
    }
  }
