import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Resume } from './components/Resume';
import { Gallery } from './components/Gallery';
import { News } from './components/News';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/resume' component={Resume} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/news' component={News} />
      </Layout>
    );
  }
}
