import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const CardItem = ({ card, onView, onEdit, onDelete }) => (
  <Col md={4} sm={6} xs={12}>
    <Card className="shadow-sm" style={{ height: "250px" }}>
      <Card.Img
        variant="top"
        src={card?.imgUrl ?? "https://via.placeholder.com/150"}
        alt={"No Image Uploaded"}
        style={{ height: "120px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column justify-content-start">
        <Card.Title className="text-truncate">
          {card?.title ?? "No Title"}
        </Card.Title>
        <Card.Text>
          {card?.isComingSoon ? (
            <span className="text-warning">🚀 Coming Soon</span>
          ) : (
            <span className="text-success">✅ Available</span>
          )}
        </Card.Text>
        <div className="d-flex justify-content-start gap-2">
          <Button variant="info" size="sm" onClick={onView}>
            <FaEye />
          </Button>
          <Button variant="primary" size="sm" onClick={onEdit}>
            <FaEdit />
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            <FaTrash />
          </Button>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

export default CardItem;
