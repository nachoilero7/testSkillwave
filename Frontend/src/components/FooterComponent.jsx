import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className = "footer">
                    <span className="text-muted">Test developed for Skillwave from Juan Ilero</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent
