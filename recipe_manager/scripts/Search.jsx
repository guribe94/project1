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

  render(){
    return(
      <div id='searchBox'>
        <form>
          Search
          <input type="text" name="query" ref='query' />
          <button
            className="btn btn-default"
            onClick={this.handleSearchEvent}>Search</button>
          </form>
        </div>
      );
    }

  }




  export class Filters extends Component{


  }
