import React, {Component} from 'react';
import Pantry from './Pantry.jsx';
import Recipes from './Recipes.jsx'
import Search from './Search.jsx'
import Header from './Header.jsx'

export default class App extends Component {

  constructor(props) {
    super(props);
    //Initial state of the app onLoad
    this.state = {
      pantry: [],
      recipes: [
        {
          name: "recipe1",
          id: "1"
        }, {
          name: "recipe2",
          id: "2"
        }
      ],
      isLoading: false,
      hasUser: false,
      sessionKey: null,
      quickFilter:false,
      noMeatFilter:false,
      inPantryFilter:false
    };
    //Bind all necessary functions
    this.insertToPantry = this.insertToPantry.bind(this);
    this.removeFromPantry = this.removeFromPantry.bind(this);
    this.editPantryItem = this.editPantryItem.bind(this);
    // this.insertToRecipes = this.insertToRecipes.bind(this);
    // this.removeFromRecipes = this.removeFromRecipes.bind(this);
    this.search = this.search.bind(this);
    this.filterRecipes = this.filterRecipes.bind(this);
    this.hash = this.hash.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getCurrentFilters = this.getCurrentFilters.bind(this);

  }

  search(query) {
    //Update the loading state so the animation will show
    this.setState({isLoading: true});

    this.setState({isLoading: false});
  }

  /*
  * State Logic - These are functions for modifying the global state of the app.
  * This was designed like this so API calls/validation to database backend can be
  * handled by the App component
  */

  insertToPantry(name) {
    //Generate a string unique to the item by concating all fields into a string
    //then hashing it
    // var key = this.hash(name);
    console.log(name);
    //TODO:send item
    $.ajax({
      url: '/addPantryItem',
      method: 'POST',
      data: {
        item: name
      },
      success: function(data) {
        console.log("returned data" + JSON.stringify(data));

        console.log("right after ajax call");
        //Create item
        //Update State
        this.setState({
          pantry: data.pantry
        });

      }.bind(this)});
    }

    removeFromPantry(id) {
      var items = this.state.pantry.filter(function(itm) {
        //Return all elements that do not have the same id
        return id !== itm.id;
      });
      //Update the state to no longer include the element being searched for
      //If it doesn't exist, the list will not be changed
      this.setState({pantry: items});
      $.ajax({
        url: '/deletePantryItem',
        method: 'POST',
        data: { pid:id },
        success: function(data) {
          // var response = {
          //   success: data.success,
          //   pantry: data.pantry
          // };
          this.setState({ pantry : data.pantry });
        }.bind(this)
      });


    }

    editPantryItem(id, newName){
      $.ajax({
        url: '/editPantryItem',
        method: 'POST',
        data: {pid:id, item:newName},
        success: function(data) {
          this.setState({ pantry : data.pantry });
        }.bind(this)
      });

    }

    // insertToRecipes(name) {
    //   //Create new recipe item
    //   var recipeItem = {
    //     name: name,
    //     id: this.hash(name)
    //   };
    //   this.setState({
    //     recipes: this.state.recipes.concat([recipeItem])
    //   });
    //   // $.ajax({
    //   //   url: '/chat',
    //   //   method: 'POST',
    //   //   data: {},
    //   //   success: function(data) {
    //   //     var response = {username:BOT_NAME, message:data["msg"][0]};
    //   //     if(response.message === '{}'){
    //   //       console.log("No message sent back");
    //   //       response = {username:BOT_NAME, message:ERROR_MSG};
    //   //     }
    //   //   }.bind(this)
    //   // });
    //
    // }
    //
    // removeFromRecipes(index) {
    //
    //   // $.ajax({
    //   //   url: '/chat',
    //   //   method: 'POST',
    //   //   data: {recipeID:rid},
    //   //   success: function(data) {
    //   //     var response = {username:BOT_NAME, message:data["msg"][0]};
    //   //     if(response.message === '{}'){
    //   //       console.log("No message sent back");
    //   //       response = {username:BOT_NAME, message:ERROR_MSG};
    //   //     }
    //   //   }.bind(this)
    //   // });
    //
    // }

    hash(input) {
      //Hash func inspired by http://stackoverflow.com/a/7616484/3282276
      //Needed to generate unique keys for components
      var hash = 0,
      i,
      chr,
      len;
      if (input.length === 0) {
        return hash;
      }
      for (i = 0, len = input.length; i < len; i++) {
        chr = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }

    filterRecipes(filter) {

      console.log("given filter" + JSON.stringify(filter));
      if(filter.filterName === 'quickFilter'){
        this.setState({quickFilter: filter.value});
      }

      if(filter.filterName === 'noMeatFilter'){
        this.setState({noMeatFilter: filter.value});
      }

      if(filter.filterName === 'inPantryFilter'){
        this.setState({inPantryFilter: filter.value});
      }

    }

      // var currentFilters = this.getCurrentFilters();

      // $.ajax({
      //   url: '/chat',
      //   method: 'POST',
      //   data: {},
      //   success: function(data) {
      //
      //     }
      //   }.bind(this)
      // });




    getCurrentFilters() {
      var filters = {
        inPantry: this.state.inPantry,
        quick: this.state.quick,
        noMeat: this.state.noMeat
      };
      return filters;
    }


    verifyUser(username, password) {
      //TODO:Make call to DB
      console.log("found username" + username);
      console.log("pass " + password);
      $.ajax({
        url: '/login',
        method: 'POST',
        data: {username: username, password: password},
        success: function(data) {
          var response = {success:data.success, sessionKey:data.sessionKey};
          if(response.success){
            this.setState({hasUser : true, sessionKey : username});

          }else{
            this.setState({hasUser:false, sessionKey:null});
          }
        }.bind(this)
      });

    }

    addUser(username, password) {
      console.log("found username" + username);
      console.log("pass " + password);
      $.ajax({
        url: '/register',
        method: 'POST',
        data: {username: username, password: password},
        success: function(data) {
          var response = {success:data.success, sessionKey:data.sessionKey};
          console.log("response" + response);
          if(response[success]){
            this.setState({hasUser:true, sessionKey:data.sessionKey});
            valid = true;

          } else {
            this.setState({hasUser:false, sessionKey:null});
            valid = false;
          }
        }.bind(this)
      });
    }

    render() {
      return (
        <div id="App">

          <Header className='Header navbar-header' addUserFunc={this.addUser} userAuthFunc={this.verifyUser} hasUser={this.state.hasUser} user={this.state.sessionKey}/>
          <div className="main">
            <Pantry items={this.state.pantry} addFunc={this.insertToPantry} rmFunc={this.removeFromPantry} loading={this.state.isLoading} editFunc={this.editPantryItem}/>
            <Recipes className='Recipes' items={this.state.recipes} addFunc={this.insertToRecipes} rmFunc={this.removeFromRecipes} filterFunc={this.filterRecipes} loading={this.state.isLoading}/>
          </div>
          <Search className='Search' searchFunc={this.search} filterFunc={this.filterRecipes} inPantry={this.state.inPantryFilter}  quick={this.state.quickFilter} noMeat={this.state.noMeatFilter}/>
        </div>
      );
    }

  }
