import React from "react";
import { Modal, Button } from "react-bootstrap";
import AddProduct from "../../Container/Inventory/AddProduct/AddProduct";
export default props => {
  return (
    <Modal show={props.show} onHide={props.close} size="lg">
      <Modal.Header closeButton>Add Product</Modal.Header>
      <Modal.Body>
        {/* sidebar and navbar indicate they should be removed */}
        <AddProduct sidebar navbar />
      </Modal.Body>
    </Modal>
  );
};
