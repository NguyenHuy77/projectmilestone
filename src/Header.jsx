import React from 'react'
import './js/bs-animation.js'
import { BrowserRouter, Link, Route } from 'react-router-dom'

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <section>
                    <div data-bs-parallax-bg="true" style={{ height: '500px', backgroundImage: `url(${require('./images/pic1.jpg')})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                        <nav class="navbar navbar-light navbar-expand-md navbar-transparency" style={{position: 'relative'}}>
                            <div class="container">
                                <div><a class="navbar-brand" href="#">BRAND</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button></div>
                                <div class="collapse navbar-collapse "
                                    id="navcol-1">
                                    <ul class="nav navbar-nav float-left ml-auto">
                                   
                                        <li class="nav-item" role="presentation"><a class="nav-link text-dark" href="#" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>Cart</a></li>
                                        <li class="nav-item d-md-flex m-auto justify-content-md-center" role="presentation"><a class="nav-link text-dark" href="#" data-toggle="modal" data-target="#signup" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>Login</a></li>
                                        <li class="nav-item d-md-flex m-auto justify-content-md-center" role="presentation"><a class="nav-link text-dark" href="#" data-toggle="modal" data-target="#signin" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>Sign Up</a></li>
                                        <li class="nav-item dropdown"><a class="dropdown-toggle nav-link text-dark" data-toggle="dropdown" aria-expanded="false" href="#" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>Dropdown </a>
                                            <div class="dropdown-menu" role="menu"><a class="dropdown-item" role="presentation" href="#">First Item</a><a class="dropdown-item" role="presentation" href="#">Second Item</a><a class="dropdown-item" role="presentation" href="#">Third Item</a></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>


                    
                   
                </section>
            </div>
        )
    }
}