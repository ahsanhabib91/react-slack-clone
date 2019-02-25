import React from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";
import firebase from "../../firebase";

class FileModal extends React.Component {
  state = {
    file: null
  };

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {};

  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal basic open={modal} onClose={this.closeModal}>
        <Modal.Header>Select an Image</Modal.Header>
        <Modal.Content>
          <Input
            onChange={this.addFile}
            fluid
            label="File types: jpg, png"
            name="file"
            type="file"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button inverted color="green" onClick={this.sendFile}>
            <Icon name="checkmark" /> Send
          </Button>
          <Button inverted color="red" onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;
