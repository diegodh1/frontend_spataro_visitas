import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import store from './redux/store';
import Login_usuario from './components/login_usuario';
import Login_cliente from './components/login_cliente';
//import Dashboard from './components/inicio_usuario';
//import Reporte from './components/inicio_usuario/reporte';
import Dashboard_usuario from './components/inicio_usuario';

  
const Root = (
    <Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Route path="/login/usuario" component={Login_usuario}/>
        <Route path="/login/cliente" component={Login_cliente}/>
        <Route path="/inicio/usuario" component={Dashboard_usuario}/>
        <Redirect from="/" to="/login/cliente"/>
    </Switch>
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));