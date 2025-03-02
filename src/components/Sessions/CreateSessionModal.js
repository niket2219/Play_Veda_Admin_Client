import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from "axios";
import UploadImage from "../../Services/Cloudinary";

const CreateSessionModal = ({ onClose, refresh }) => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    theme: "",
    benefitsDesc: "",
    location: "",
    date: "",
    month: "",
    day: "",
    time: "",
    week: "",
    sessionActivities: [],
    benefits: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleActivityChange = (index, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      sessionActivities: prevData.sessionActivities.map((activity, i) =>
        i === index ? { ...activity, [field]: value } : activity
      ),
    }));
  };

  const handleImageUpload = async (index, files) => {
    if (files.length > 0) {
      const file = files[0];

      setUploading(true);

      try {
        const uploadedUrl = await UploadImage(file);

        setFormData((prevData) => ({
          ...prevData,
          sessionActivities: prevData.sessionActivities.map((activity, i) =>
            i === index ? { ...activity, icon: uploadedUrl } : activity
          ),
        }));
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const addActivity = () => {
    setFormData((prevData) => ({
      ...prevData,
      sessionActivities: [
        ...prevData.sessionActivities,
        {
          name: "",
          icon: "",
          color: "#000000",
          backgroundColor: "#ffffff",
          image: null,
        },
      ],
    }));
  };

  const removeActivity = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      sessionActivities: prevData.sessionActivities.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleBenefitChange = (index, value) => {
    setFormData((prevData) => ({
      ...prevData,
      benefits: prevData.benefits.map((benefit, i) =>
        i === index ? value : benefit
      ),
    }));
  };

  const addBenefit = () => {
    setFormData((prevData) => ({
      ...prevData,
      benefits: [...prevData.benefits, ""],
    }));
  };

  const removeBenefit = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      benefits: prevData.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/api/sessions`,
        formData
      );
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating session:", error);
    }
    // console.log(formData);
    refresh();
  };

  return (
    <Modal show onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Session</Modal.Title>
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
          <Form.Group className="mb-3">
            <Form.Label>Theme</Form.Label>
            <Form.Control
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="benefitsDesc"
              value={formData.benefitsDesc}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Month</Form.Label>
            <Form.Control
              type="text"
              name="month"
              value={formData.month}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Day</Form.Label>
            <Form.Control
              type="text"
              name="day"
              value={formData.day}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Week</Form.Label>
            <Form.Control
              type="text"
              name="week"
              value={formData.week}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Benefits</Form.Label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  type="text"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeBenefit(index)}
                  className="ms-2"
                >
                  -
                </Button>
              </div>
            ))}
            <Button variant="success" size="sm" onClick={addBenefit}>
              + Add Benefit
            </Button>
          </Form.Group>

          {/* Session Activities Section */}
          <Form.Group className="mb-3">
            <Form.Label>Session Activities</Form.Label>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Icon</th>
                  <th>Color</th>
                  <th>Background</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.sessionActivities.map((activity, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type="text"
                        value={activity.name}
                        onChange={(e) =>
                          handleActivityChange(index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={activity.icon}
                        onChange={(e) =>
                          handleActivityChange(index, "icon", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="color"
                        value={activity.color}
                        onChange={(e) =>
                          handleActivityChange(index, "color", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="color"
                        value={activity.backgroundColor}
                        onChange={(e) =>
                          handleActivityChange(
                            index,
                            "backgroundColor",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(index, e.target.files)
                        }
                        disabled={uploading}
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeActivity(index)}
                      >
                        -
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="success" size="sm" onClick={addActivity}>
              + Add Activity
            </Button>
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Session
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSessionModal;
