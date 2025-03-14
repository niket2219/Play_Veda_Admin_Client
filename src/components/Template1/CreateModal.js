import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import UploadImage from "../../Services/Cloudinary";

const CreateModal = ({ show, onHide, refresh }) => {
  const [uploading, setuploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isComingSoon: false,
    imgUrl: "",
    display: "",
    order: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setuploading(true);
      const dummyUrl = await UploadImage(file);
      setFormData((prev) => ({ ...prev, imgUrl: dummyUrl }));
      setuploading(false);
    }
  };

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/api/cards`, formData)
      .then(() => {
        refresh();

        onHide();
      })
      .catch((error) => console.error("Error creating card:", error));
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Card</Modal.Title>
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
            <Form.Label>Display Type</Form.Label>
            <Form.Control
              type="text"
              name="display"
              value={formData.display}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Screen Order</Form.Label>
            <Form.Control
              type="number"
              name="order"
              value={formData.order}
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
        <Button variant="success" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;
