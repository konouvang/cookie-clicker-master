import React, { Component } from 'react';

const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp(''+cookieName+'[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./,'') : '');
}


class App extends Component {
  state = {
    clickCount: getCookie('count') || 0,
    usernameIsEditable: false,
    username: getCookie('username') || '',
  }

  handleClick = () => {
    const newCount = Number(this.state.clickCount) + 1;
    document.cookie = `count=${newCount}`;
    this.setState({
      clickCount: newCount,
    });
  }

  editusername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  }

  saveusername = () => {
    const newCount = String(this.state.username);
    document.cookie = `username=${newCount}`;
    this.setState({
      usernameIsEditable: false,
    });
  }

  handleNameChange = (event) => {
    this.setState({
      username: [event.target.value],
    });
    console.log(this.state.username);
}

  render() {
  
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
            {this.state.username}
            {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
            {/* 
              This conditional rendering is using a `ternary` operator. It works like an if/else block.
              The part at the front is being evaluated. The `?` starts the conditions. 
              The first condition is what will be done if true.
              The `:` breaks into the else block.
              Rewritten as if/else:
              ```
              let buttonToShow;
              if(this.state.usernameIsEditable) {
                buttonToShow = <button onClick={this.saveusername}>Save username</button>
              } else {
                buttonToShow = <button onClick={this.editusername}>Edit username</button>
              }
              ```

            */}
            {this.state.usernameIsEditable ?
              <div>
              <input placeholder="name" onChange={this.handleNameChange} />
              <button onClick={this.saveusername} value={this.state.username} data-name="username">Save username</button> 
              </div>:
              <button onClick={this.editusername}>Edit username</button>
            }
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{fontSize: '100px', cursor: 'pointer'}}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
