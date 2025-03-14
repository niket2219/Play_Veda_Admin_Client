import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewModal = ({ show, handleClose, data }) => {
  const { details_button, images, location, display, order, title, subtitle } =
    data;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Title : </strong> {title ? title : "N/A"}
        </p>
        <p>
          <strong>SubTitle : </strong> {subtitle ? subtitle : "N/A"}
        </p>
        <p>
          <strong>Location : </strong> {location ? location : "N/A"}
        </p>
        <p>
          <strong>Display Type : </strong> {display ? display : "N/A"}
        </p>
        <p>
          <strong>Order : </strong> {order ? order : "N/A"}
        </p>
        <p>
          <strong>Details Button : </strong>{" "}
          {details_button === "true" ? "✅" : "❌"}
        </p>
        <div className="d-flex flex-wrap gap-2">
          {images.map((img, index) => (
            <div key={index} className="w-45 p-2">
              <img
                src={img}
                alt={`Image ${index}`}
                className="w-100"
                style={{ borderRadius: "5px" }}
              />
            </div>
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
