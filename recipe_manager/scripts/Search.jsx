import React, {Component} from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearchEvent = this.handleSearchEvent.bind(this);
  }

  handleSearchEvent(event) {
    if (event.type === "click") {
      // this.props.insertToPantry(name, amt);
      event.preventDefault();
      event.stopPropagation(); // in case if send button would be ABOVE another button from the site
      this.props.searchFunc();

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




  render() {
    return (
      <form>
        <div id='filters'>
          <button type="button" className="btn btn-primary btn-lg" onClick={this.handleSearchEvent}>Make a Suggestion</button>
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
      var filter = {filterName:this.props.filterName, value:!this.props.activated};
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
