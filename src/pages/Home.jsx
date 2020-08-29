import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './Login'
import Register from './Register'
export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="home">
                    <h1>Booking Online System</h1>
                     <img
                            className="section1"
                            src="https://tgmdental.net/wp-content/uploads/2018/07/booking-background.jpg" />

                </div>
            </div>
        )
    }
}
