import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from 'react-router-dom';

//COMPONENT TO PRINT
class ComponentToPrint extends Component {
  render() {
    return <h1>{this.props.invitado.nombre}</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    invitado: state.redux_reducer.invitado,
  };
};
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ComponentToPrint)
);
