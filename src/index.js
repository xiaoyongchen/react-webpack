import React, { useState, useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';
import Main from './main.tsx';
import Test from './test';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    setInterval(() => {
      let { count } = this.state;
      this.setState({
        count: ++count
      })
    },2000)
  }

  render() {
    const testProps = {count: this.state.count};
    return (
      <div>
        <Test {...testProps}></Test>
      </div>
    );
  }

}


ReactDOM.render(<Index></Index>, document.getElementById('app'));
