import React, { Component } from 'react'
import ApList from './ApList'
import Contact from './Contact'

export default class Admin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             appointments:[],
        }
    }
    
    render() {
        return (
            <div>
                <div className ="row">
                    <div className ="col">
                        <h1>Welcome to the Administrator Site</h1>
                    </div>
                </div>
                <ApList admin ={"admin"}/>
                <Contact/>
            </div>
        )
    }
}
