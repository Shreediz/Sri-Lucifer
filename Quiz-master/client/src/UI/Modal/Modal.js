import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import ViewUser from "../../Container/Users/User/ViewUser";
const UserModal = props => (
  <Modal show={props.show} onHide={props.close}>
    <Modal.Header closeButton>
      {console.log(props)}
      <Modal.Title style={{ fontSize: "18px" }}>User Details</Modal.Title>
    </Modal.Header>

    <Modal.Body style={{ padding: "0" }}>
      {props.action === "View" ? (
        <ViewUser id={props.id} />
      ) : (
        <Spinner animation="border" />
      )}
    </Modal.Body>
    <Modal.Footer style={{ padding: "8px" }}>
      <Button size="sm" variant="secondary" onClick={props.close}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default UserModal;
