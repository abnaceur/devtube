import React, {Component} from 'react';


export default  class Footer extends Component {


    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-bottom">
                    <div className="text-center">
                        <span className="footer-text"> © 2020 Copyright 
                            <strong> DevTUBE</strong>
                        </span>
                    </div>
                    {/* <div className="text-right" style={{position: 'relative', top: '-20px', right: '20px'}}>
                        <span className="footer-text"> 
                            With<i style={{color: 'red'}} className="glyphicon glyphicon-heart"></i><strong>ABN</strong>
                        </span>
                    </div> */}
                </nav>
                
            </div>

        )
    };
}

