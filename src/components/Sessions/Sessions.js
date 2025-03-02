import React, { useState, useEffect } from "react";
import SessionCard from "./SessionCard";
import axios from "axios";
import CreateSessionModal from "./CreateSessionModal";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingData, setloadingData] = useState(false);

  const handleModalToggle = () => {
    setShowAddModal(!showAddModal);
  };

  useEffect(() => {
    fetchSessions();
    console.log(`${process.env.REACT_APP_SERVER}/api/sessions`);
  }, []);

  const fetchSessions = () => {
    setloadingData(true);
    axios
      .get(`${process.env.REACT_APP_SERVER}/api/sessions`)
      .then((response) => {
        console.log("Sessions Data:", response.data.sessions);
        setSessions(response.data.sessions);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
    setloadingData(false);
  };
  return (
    <>
      <div className="container mt-4 mb-4">
        <h2 className="mb-3">Sessions</h2>

        <div className="row gy-4">
          {loadingData && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1050,
              }}
            >
              <div
                className="spinner-border text-primary"
                style={{ width: "4rem", height: "4rem" }}
              ></div>
            </div>
          )}
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
