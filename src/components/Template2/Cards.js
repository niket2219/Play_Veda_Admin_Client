import React, { useState, useEffect } from "react";
import axios from "axios";
import CardItem from "./Card";
import CreateModal from "./CreateModal";

const LilaCardList = () => {
  const [sessions, setSessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleModalToggle = () => {
    setShowAddModal(!showAddModal);
  };

  useEffect(() => {
    fetchLilaCards();
  }, []);

  const fetchLilaCards = () => {
    axios
      .get("http://127.0.0.1:5000/api/cards2")
      .then((response) => {
        console.log("Cards Data:", response.data);
        setSessions(response.data);
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
            <CardItem
              key={session.id}
              data={session}
              refresh={fetchLilaCards}
            />
          ))}
        </div>
        {showAddModal && (
          <CreateModal
            show={showAddModal}
            handleClose={handleModalToggle}
            refresh={fetchLilaCards}
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

export default LilaCardList;
