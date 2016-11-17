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
                    <button type="button" className="btn btn-primary btn-sm" ref='inPantry' onClick={this.handleFilterEvent}>Limit results to what I can make</button>
                    <button type="button" className="btn btn-default btn-sm" ref='quick' onClick={this.handleFilterEvent}>Quick Recipes</button>
                    <button type="button" className="btn btn-default btn-sm" ref='noMeat' onClick={this.handleFilterEvent}>I don't eat meat</button>
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleSuggestion}>Make a Suggestion</button>

                </div>
            </form>
        );
    }

}
