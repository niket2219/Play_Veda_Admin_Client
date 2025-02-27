import React, { useState } from "react";
import SessionModal from "./SessionModal";
import EditSessionModal from "./EditSessionModal";
import axios from "axios";

const SessionCard = ({ session, refresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  const handleEditModalToggle = () => {
    setShowEditModal(!showEditModal);
  };

  const deleteSession = async (sessionId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/sessions/${sessionId}`
      );
      console.log("Session deleted:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting session:", error);
    }
    refresh();
  };

  return (
    <div className="col-md-4">
      <div className="card shadow-lg border-light-subtle rounded-3">
        <div className="card-body">
          <h5 className="card-title mb-3">{session.theme}</h5>
          <span className="badge bg-primary mb-2">{session.location}</span>

          <ul className="list-group list-group-flush small">
            <li className="list-group-item">
              <strong>Month:</strong> {session.month}
            </li>
            <li className="list-group-item">
              <strong>Week:</strong> {session.week}
            </li>
            <li className="list-group-item">
              <strong>Day:</strong> {session.day}
            </li>
            <li className="list-group-item">
              <strong>Date:</strong> {session.date}
            </li>
            <li className="list-group-item">
              <strong>Time:</strong> {session.time}
            </li>
          </ul>

          <div className="d-flex justify-content-flex-start gap-2 mt-4">
            <button
              className="btn btn-success btn-sm"
              onClick={handleModalToggle}
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleEditModalToggle}
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteSession(session.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <SessionModal session={session} onClose={handleModalToggle} />
      )}
      {showEditModal && (
        <EditSessionModal
          session={session}
          onClose={handleEditModalToggle}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default SessionCard;
