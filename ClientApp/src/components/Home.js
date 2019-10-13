import React, { Component } from 'react';
import moment from 'moment';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    var displayDate = moment().format("MMM Do YY");

    return (
      <div>
        <p><em>{ displayDate }</em></p>
        <h1>Welcome!</h1>
        <p>This is my showcase single-page application (SPA) built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='https://reactstrap.github.io/'>Reactstrap</a> for layout and styling</li>
        </ul>
      </div>
    );
  }
}
