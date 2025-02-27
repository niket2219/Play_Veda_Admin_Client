import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewModal = ({ show, onHide, card }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>Card Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {card ? (
        <>
          <p>
            <strong>Title:</strong> {card?.title ?? "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {card?.description ?? "N/A"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {card?.comingSoon ? "🚀 Coming Soon" : "✅ Available"}
          </p>
          {card?.imgUrl ? (
            <img src={card.imgUrl} alt="Card" className="img-thumbnail" />
          ) : (
            <p>No Image Available</p>
          )}
        </>
      ) : (
        <p>No details available.</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ViewModal;
