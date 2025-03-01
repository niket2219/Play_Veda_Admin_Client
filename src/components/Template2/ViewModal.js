import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewModal = ({ show, handleClose, data }) => {
  const { details_button, images, location } = data;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Details Button:</strong>{" "}
          {details_button === "true" ? "✅" : "❌"}
        </p>
        <div className="d-flex flex-column gap-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index}`}
              className="w-100"
              style={{ borderRadius: "5px" }}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
