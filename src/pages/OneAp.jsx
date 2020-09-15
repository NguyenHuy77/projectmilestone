import React from 'react'
import { MDBBtnGroup, MDBBtn, MDBModalFooter } from 'mdbreact'
import { Link } from "react-router-dom"
export default class OneAp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    checkApproval()
    {
        if(this.props.status ==="Approved")
        {
            return <h1>Approved</h1>
        }
    }
    checkAdmin()
    {
        if(this.props.admin === "admin")
        {
            return ( <Link to ={"Admin"}>
            <button 
                type="button" 
                className="btn btn-warning" 
                onClick ={this.props.approveFunction.bind(this,this.props.appointmentId)}>Approve</button>
            </Link>)
        }
    }
    render() {
        return (
            <div class="card clean-card text-left">
                {/* <img class="img-thumbnail card-img-top w-100 d-block"
                src={this.props.avatar} style={{ width: '328px', height: '220px' }} /> */}
                <div class="card-body" >
                    {this.checkApproval()}
                    <h1>{this.props.title}</h1>
                    <p>Location: {this.props.location}</p>
                    <p>Time: {this.props.time} </p>

                    <div>
                        <MDBModalFooter className="justify-content-center">
                            <Link to={"/Profile/" + this.props.userName + "/" + this.props.appointmentId}>
                                <button 
                                type="button" 
                                className="btn btn-success"
                                color="deep-orange">Edit</button>
                            </Link>

                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick ={this.props.deleteFunction.bind(this,this.props.appointmentId)}>Delete</button>

                           {this.checkAdmin()}
                        </MDBModalFooter>
                    </div>
                </div>
            </div>
        )
    }
}