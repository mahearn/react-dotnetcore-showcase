import React, { Component } from 'react';

export class User extends Component {
  static displayName = User.name;

  constructor (props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {

    fetch('https://localhost:5001/api/User/ListUsers')
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data, loading: false });
      });
  }
  
  static renderUsers(users) {
      return (
        <div>
            {users.map(user =>
              <div key="{user.id}">      
                <h4>{user.name}</h4>
                <p>{user.summary}</p>
              </div>
            )}
        </div>
      );
  }
  
  render () {
    // debugger;
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : User.renderUsers(this.state.users);

    return (
      <div>
        <h1>My Users</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}