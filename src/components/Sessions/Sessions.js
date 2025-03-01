import React, { useState, useEffect } from "react";
import SessionCard from "./SessionCard";
import axios from "axios";
import EditSessionModal from "./EditSessionModal";
import CreateSessionModal from "./CreateSessionModal";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleModalToggle = () => {
    setShowAddModal(!showAddModal);
  };

  useEffect(() => {
    fetchSessions();
    console.log(`${process.env.REACT_APP_SERVER}/api/sessions`);
  }, []);

  const fetchSessions = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/api/sessions`)
      .then((response) => {
        console.log("Sessions Data:", response.data.sessions);
        setSessions(response.data.sessions);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  };
  return (
    <>
      <div className="container mt-4 mb-4">
        <h2 className="mb-3">Sessions</h2>
        <div className="row gy-4">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              refresh={fetchSessions}
            />
          ))}
        </div>
        {showAddModal && (
          <CreateSessionModal
            onClose={handleModalToggle}
            refresh={fetchSessions}
          />
        )}
      </div>

      <button
        className="btn btn-primary rounded-circle shadow-lg"
        style={{
          width: "60px",
          height: "60px",
          fontSize: "24px",
          zIndex: 1050,
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        onClick={() => setShowAddModal(true)}
      >
        <i className="bi bi-plus-lg"></i>
      </button>
    </>
  );
};

export default Sessions;
