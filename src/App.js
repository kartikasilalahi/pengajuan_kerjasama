import React, { Component } from 'react';
import './App.css';
import Axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Login, reLogin, Logout } from './redux/action'
import { APIURL } from './helper/apiurl';
import Home from './pages/Home'
import Dashboard_Mitra from './pages/Dashboard_mitra'
import Dashboard_Admin from './pages/Dashboard_admin'
import Verifikasi_Akun from './pages/Component_admin/Verifikasi_akun'


class App extends Component {

  componentDidMount() {
    let id = localStorage.getItem('id')
    console.log('ID APP', id)
    if (id) {
      Axios.get(`${APIURL}auth/login/${id}`)
        .then(res => {
          localStorage.setItem('id', res.data.id)
          this.props.reLogin(res.data.result)
        }).catch(err => {
          console.log(err)
        })
    }
    else {
      this.props.Logout()
    }
  }

  state = {}
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/dashboard_mitra' component={Dashboard_Mitra} />
          <Route exact path='/dashboard_admin' component={Dashboard_Admin} />
          <Route exact path='/verifikasi_akun' component={Verifikasi_Akun} />

        </Switch>
      </div>
    );
  }
}

export default connect(null, { Login, reLogin, Logout })(App)