import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from "axios";
import UploadImage from "../../Services/Cloudinary";

const CreateModal = ({ show, handleClose, refresh }) => {
  const [uploading, setuploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    location: "",
    details_button: false,
    images: [],
    display: "",
    order: 0,
  });

  const handleImageUpload = (file, index) => {
    setuploading(true);
    UploadImage(file).then((newUrl) => {
      const newImages = [...formData.images];
      newImages[index] = newUrl;
      setFormData({ ...formData, images: newImages });
      setuploading(false);
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/cards2`,
        formData
      );
      console.log("New Entry Added:", res.data);
      refresh();
      handleClose();
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Entry</Modal.Title>
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>
              <strong>Title</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="subtitle" className="mt-3">
            <Form.Label>
              <strong>SubTitle</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="location" className="mt-3">
            <Form.Label>
              <strong>Location</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="display" className="mt-3">
            <Form.Label>
              <strong>Display Type</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="display"
              value={formData.display}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="order" className="mt-3">
            <Form.Label>
              <strong>Screen Order</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="details_button" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Details Button Available"
              name="details_button"
              checked={formData.details_button}
              onChange={handleInputChange}
            />
          </Form.Group>

          <h5 className="mt-4">Images</h5>
          <Table bordered className="mt-2">
            <thead>
              <tr>
                <th>Image URL</th>
                <th>Upload New Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.images.map((img, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control type="text" value={img} readOnly />
                  </td>

                  <td>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files.length > 0) {
                          handleImageUpload(e.target.files[0], index);
                        }
                      }}
                    />
                  </td>

                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ❌
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Add More Images Button */}
          <Button
            variant="primary"
            className="mt-2 mb-3 w-100"
            onClick={handleAddImage}
          >
            ➕ Add More Images
          </Button>

          {/* Modal Footer */}
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              ❌ Cancel
            </Button>
            <Button variant="success" type="submit">
              ✅ Add Entry
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateModal;
