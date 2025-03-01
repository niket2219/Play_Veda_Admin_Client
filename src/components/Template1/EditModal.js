import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditModal = ({ show, onHide, card, refresh }) => {
  const [uploading, setuploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isComingSoon: false,
    imgUrl: "",
  });

  useEffect(() => {
    if (card) {
      setFormData({
        title: card.title || "",
        description: card.description || "",
        isComingSoon: card.comingSoon || false,
        imgUrl: card.imgUrl || "",
      });
    }
  }, [card]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImg = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("https://via.placeholder.com/150");
      }, 2000);
    });
  };

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setuploading(true);
      const dummyUrl = await handleImg(file);
      setFormData((prev) => ({ ...prev, imgUrl: dummyUrl }));
      setuploading(false);
    }
  };

  const handleSubmit = () => {
    axios
      .put(`${process.env.REACT_APP_SERVER}/api/cards/${card.id}`, formData)
      .then(() => {
        refresh();
        onHide();
      })
      .catch((error) => console.error("Error updating card:", error));
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {uploading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1050,
            }}
          >
            <div
              className="spinner-border text-light"
              style={{ width: "4rem", height: "4rem" }}
            ></div>
          </div>
        )}
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Check
              type="checkbox"
              label="Coming Soon"
              name="isComingSoon"
              checked={formData.isComingSoon}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImgUpload}
            />
            {formData.imgUrl && (
              <img
                src={formData.imgUrl}
                alt="Preview"
                className="mt-2 img-thumbnail"
                width="100"
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
