import React, { useState } from "react";
import { Modal, Button, Form, Table, Spinner } from "react-bootstrap";
import axios from "axios";

const EditSessionModal = ({ session = {}, onClose, refresh }) => {
  const [formData, setFormData] = useState({ ...session });
  const [uploading, setUploading] = useState(false);

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

  const uploadImg = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("sttps://www.example.com");
      }, 3000);
    });
  };

  const handleImageUpload = async (index, files) => {
    if (files.length > 0) {
      const file = files[0];

      setUploading(true);

      try {
        const uploadedUrl = await uploadImg(file);

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

  const updateSession = async (sessionId, updatedData) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/sessions/update/${sessionId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating session:", error);
      throw error;
    }
    refresh();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = updateSession(session.id, formData);
    console.log(res);
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Session</Modal.Title>
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
              type="theme"
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

          {/* Session Activities */}
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
                {formData.sessionActivities?.map((activity, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Activity Name"
                        value={activity.name}
                        onChange={(e) =>
                          handleActivityChange(index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Icon (URL or class)"
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

          {/* Benefits List */}
          <Form.Group className="mb-3">
            <Form.Label>Benefits</Form.Label>
            {formData.benefits?.map((benefit, index) => (
              <div key={index} className="d-flex gap-2 mb-2 align-items-center">
                <Form.Control
                  type="text"
                  placeholder="Benefit"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeBenefit(index)}
                >
                  -
                </Button>
              </div>
            ))}
            <Button variant="success" size="sm" onClick={addBenefit}>
              + Add Benefit
            </Button>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditSessionModal;
