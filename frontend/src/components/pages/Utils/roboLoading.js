import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
require ('./robot.css');


class RobotLoading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {

        return (
            <div id="page">
                <div id="container">

                    <div id="foot" className="left">
                        <div id="f1"></div>
                        <div id="f2"></div>


                        <div id="leg1" className="first">
                            <div id="leg1" className="next1">
                                <div id="leg1" className="next1">
                                    <div id="leg1" className="next1">
                                        <div id="leg1" className="next1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="foot" className="right">
                        <div id="f1"></div>
                        <div id="f2"></div>

                        <div id="leg2" className="first">
                            <div id="leg2" className="next2">
                                <div id="leg2" className="next2">
                                    <div id="leg2" className="next2">
                                        <div id="leg2" className="next2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div id="body">
                        <div id="b1"></div>
                        <div id="b2"></div>
                        <div id="b3"></div>
                        <div id="head">
                            <div id="h1"></div>
                            <div id="h2"></div>
                            <div id="h3"></div>
                            <div id="h4"></div>
                            <div id="h5"><span></span></div>
                            <div id="eyes">
                                <div id="e">
                                    <div id="e1">
                                        <div id="eye"></div>
                                        <span></span>
                                    </div>
                                    <div id="e2">
                                        <div id="eye"></div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div id="mouth">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <div id="m1"></div>
                                <div id="m2"></div>
                            </div>
                        </div>

                        <div id="b4"></div>
                        <div id="b5">
                            <div id="b51">
                                <div id="b51">
                                    <div id="b51">
                                        <div id="b51">
                                            <div id="ab">
                                                <div id="a1"></div>
                                                <div id="a2"></div>
                                                <div id="a3" className="a31"></div>
                                                <div id="a3" className="a32"></div>
                                                <div id="a3" className="a33"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="b6"></div>
                        <div id="b7">
                            <div id="b71">
                                <div id="b71">
                                    <div id="b71">
                                        <div id="b71">
                                            <div id="ac">
                                                <div id="a1"></div>
                                                <div id="a2"></div>
                                                <div id="a3" className="a31"></div>
                                                <div id="a3" className="a32"></div>
                                                <div id="a3" className="a33"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="b8">
                            <span></span>
                        </div>
                        <div id="b9"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const state = (state, ownProps = {}) => {
    return {
        location: state.location,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
    }
};

export default connect(state, mapDispatchToProps)(RobotLoading);