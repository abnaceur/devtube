import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import io from 'socket.io-client';
import { Launcher } from 'react-chat-window'

class ChatBotRobot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageList: [],
            socket: io(process.env.REACT_APP_API_URL),
            userImageUrl: localStorage.getItem("imageUrl"),
            robotImage: "https://lh4.ggpht.com/ruZ5bepI5CLiJjQHIHFDFGJvTsrz-6Ygm1jR3jBj4OT9qIHEHoIclpjpIn1yYNnk4Uo=w300",
            room: localStorage.getItem("userId"),
        }

    }

    UNSAFE_componentWillMount() {
        this._sendMessage("Hey !");
    }

    componentDidMount() {
        this.state.socket.connect(true);
        this.state.socket.emit('join', this.state.room);

        this.state.socket.on("send-msg-response", async (msg) => {
            this.state.messageList.pop();
            await this.setState({
                messageList: [...this.state.messageList]
            })

            this._sendMessage(msg);
        })

    }

    async _onMessageWasSent(message) {
        await this.setState({
            messageList: [...this.state.messageList, message]
        })

        this._sendMessage("••••");
        await this.state.socket.emit('new-msg', { msg: message.data.text, room: this.state.room })

    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                },]
            })
        }
    }


    render() {

        return (
            <div id="chatbox" className="chatbox">
                <Launcher
                    // mute={true}
                    agentProfile={{
                        teamName: 'Doeremon',
                        imageUrl: './assets/img/robot1.png'
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={this.state.messageList}
                    // mainIcon="https://image.flaticon.com/icons/png/512/1033/1033795.png"
                    mainIcon="./assets/img/robot1.png"
                    bgColor="black"
                    headWidth="25%"
                    showEmoji

                />
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

export default connect(state, mapDispatchToProps)(ChatBotRobot);