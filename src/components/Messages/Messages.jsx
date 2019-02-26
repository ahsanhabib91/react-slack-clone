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
    user: this.props.currentUser,
    progressBar: false
  };

  createdRef = React.createRef();

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  scrollToBottom = () => {
    if (this.createdRef.current) {
      this.createdRef.current.scrollTop = this.createdRef.current.scrollHeight;
    }
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

  isProgressBarVisible = percent => {
    if (percent > 0) {
      this.setState({ progressBar: true });
    }
  };

  render() {
    const { messagesRef, channel, user, messages, progressBar } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Ref innerRef={this.createdRef}>
            <Comment.Group
              className={progressBar ? "messages__progress" : "messages"}
            >
              {this.displayMessages(messages)}
            </Comment.Group>
          </Ref>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isProgressBarVisible={this.isProgressBarVisible}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
