import React, { Component } from 'react'
import ApList from './ApList'

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
                <ApList/>
            </div>
        )
    }
}
