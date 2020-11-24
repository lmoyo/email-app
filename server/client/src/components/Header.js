import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return 

                //TODO add loader icon

            case false:
                return (
                    <li><a href="/auth/google">Login with google</a></li>
                )

            default:
                return (
                    <li><a href="/api/logout">Logout</a></li>
                )
        }
    }


    render() {
        console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} 
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )

    }
}

//gets called with the entire state object out of the redux store
function mapStateToProps({ auth }) {
    
    //object will be passed to header as props
    return { 
        auth
    }
}

export default connect(mapStateToProps)(Header);