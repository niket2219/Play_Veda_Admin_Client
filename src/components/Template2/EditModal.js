import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from "axios";
import UploadImage from "../../Services/Cloudinary";

const EditModal = ({ show, handleClose, data, refresh }) => {
  const [uploading, setuploading] = useState(false);
  const [formData, setFormData] = useState({
    location: data.location,
    details_button: data.details_button === "true",
    images: data.images || [],
  });

  const handleImageUpload = (file, index) => {
    setuploading(true);
    UploadImage(file).then((newUrl) => {
      const newImages = [...formData.images];
      newImages[index] = newUrl;
      setFormData({ ...formData, images: newImages });
    });
    setuploading(false);
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
    e.preventDefault();
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/cards2/${data.id}`,
      formData
    );
    console.log(res);
    refresh();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Details</Modal.Title>
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
          {/* Location Input */}
          <Form.Group controlId="location">
            <Form.Label>
              <strong>Location</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Details Button Checkbox */}
          <Form.Group controlId="details_button" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Details Button Available"
              name="details_button"
              checked={formData.details_button}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Images Table */}
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
                  {/* Image URL Column */}
                  <td>
                    <Form.Control type="text" value={img} readOnly />
                  </td>

                  {/* File Upload Column */}
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

                  {/* Delete Button Column */}
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveImage(index)}
                    >
                      -
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
              ✅ Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
