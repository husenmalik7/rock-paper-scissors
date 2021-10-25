import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class ModalPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  async handlePost() {
    let isCloseModalSuccess = await this.props.closeModal(
      false,
      this.state.name
    );

    console.log({ isCloseModalSuccess });

    if (isCloseModalSuccess) {
      this.setState({ name: "" });
    }
  }

  render() {
    const { isShowModal, scoreModal } = this.props;

    if (!isShowModal) {
      return null;
    }

    return (
      <div>
        <h2>score anda adalah {scoreModal}</h2>
        <h2>anda kalah masukan nama</h2>

        <Form.Control
          type="text"
          onChange={(event) => {
            this.setState({
              name: event.target.value,
            });
          }}
        />

        <button onClick={() => this.handlePost()}>sudah masuk nama</button>
      </div>
    );
  }
}
