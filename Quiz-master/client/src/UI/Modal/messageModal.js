import React from "react";
import { Modal } from "react-bootstrap";

export default props => {
  let variant = props.variant;
  let bgColor = `bg-${variant}`;

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header className={bgColor} style={{ color: "white" }} closeButton>
        <Modal.Title style={{ fontSize: "18px"}}>
          {variant === "success" ? "Request Successful " : "Request Failed "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "10" }}>{props.message}</Modal.Body>
    </Modal>
  );
};
