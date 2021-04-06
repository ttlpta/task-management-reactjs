import React from "react";

export default class Page500 extends React.PureComponent
{

  constructor(props){
    super(props);
    this.state = {
      hasError : false
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error);
  }
    
  render(){
    if (this.state.hasError) {
      return <div>Page500</div>;
    }

    return this.props.children;
  }
}
