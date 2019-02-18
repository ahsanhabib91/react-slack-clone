import React from "react";
import { Menu, Icon, Modal } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    channels: [],
    modal: false
  };
  handleClose = () => this.setState({ modal: false });
  render() {
    const { channels, modal } = this.state;
    return (
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add" />
        </Menu.Item>
        {/* Channels */}
        <Modal open={modal} onClose={this.handleClose} basic size="small" />
      </Menu.Menu>
    );
  }
}

export default Channels;
