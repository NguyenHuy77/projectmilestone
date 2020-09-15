import React, { Component } from 'react'

export default class OneFeedBack extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div class="card clean-card text-left" >
                {/* <img class="img-thumbnail card-img-top w-100 d-block"
                src={this.props.avatar} style={{ width: '328px', height: '220px' }} /> */}
                <div class="card-body" >                    
                    <h5>{this.props.name}</h5>
                    <p>Sender: {this.props.feedback.name}</p>
                    <p>Email: {this.props.feedback.email} </p>
                    <div>
                    <p>Message: {this.props.feedback.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}
