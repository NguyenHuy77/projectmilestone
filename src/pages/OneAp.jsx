import React from 'react'
import { MDBBtnGroup, MDBBtn, MDBModalFooter } from 'mdbreact'
import { Link } from "react-router-dom"
export default class OneAp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div class="card clean-card text-left"><img class="img-thumbnail card-img-top w-100 d-block"
                src={this.props.avatar} style={{ width: '328px', height: '220px' }} />
                <div class="card-body">

                    <h5>{this.props.name}</h5>
                    <p>Location: {this.props.location}</p>
                    <p>Time: {this.props.time} </p>

                    <div>
                        <MDBModalFooter className="justify-content-center">
                            <Link to={"/Profile/" + this.props.userName + "/" + this.props.appointmentId}>
                                <button 
                                type="button" 
                                className="btn btn-success"
                                color="deep-orange">  Edit </button>
                            </Link>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick ={this.props.deleteFunction.bind(this,this.props.appointmentId)}> Delete</button>
                        </MDBModalFooter>
                    </div>
                </div>
            </div>
        )
    }
}