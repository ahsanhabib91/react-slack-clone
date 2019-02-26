import React from "react";
import { Segment, Comment, Ref } from "semantic-ui-react";
import firebase from "../../firebase";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    messages: [],
    messagesLoading: true,
    user: this.props.currentUser
  };

  createdRef = React.createRef();

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  scrollToBottom = () => {
    this.createdRef.current.scrollTop = this.createdRef.current.scrollHeight;
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // componentWillUnmount() {
  //   this.removeListeners();
  // }

  // removeListeners = () => {
  //   this.state.messagesRef.off();
  // };

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadMessages = [];
    // console.log(channelId);
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadMessages.push(snap.val());
      // console.log(loadMessages);
      this.setState({
        messages: loadMessages,
        messagesLoading: false
      });
      this.scrollToBottom();
      console.log(this.createdRef);
    });
  };

  displayMessages = messages => {
    return (
      messages.length > 0 &&
      messages.map(message => (
        <Message
          key={message.timestamp}
          message={message}
          user={this.state.user}
        />
      ))
    );
  };

  render() {
    const { messagesRef, channel, user, messages } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Ref innerRef={this.createdRef}>
            <Comment.Group className="messages">
              {this.displayMessages(messages)}
            </Comment.Group>
          </Ref>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
