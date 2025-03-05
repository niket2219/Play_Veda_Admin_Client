import React, { useState, useEffect } from "react";
import axios from "axios";
import CardItem from "./Card";
import CreateModal from "./CreateModal";
import ScaleLoader from "react-spinners/ScaleLoader";

const LilaCardList = () => {
  const [sessions, setSessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingData, setloadingData] = useState(false);

  const handleModalToggle = () => {
    setShowAddModal(!showAddModal);
  };

  useEffect(() => {
    fetchLilaCards();
  }, []);

  const fetchLilaCards = () => {
    setloadingData(true);
    axios
      .get(`${process.env.REACT_APP_SERVER}/api/cards2`)
      .then((response) => {
        console.log("Cards Data:", response.data);
        setSessions(response.data);
        setloadingData(false);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        setloadingData(false);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER}/api/cards2/${id}`)
      .then(() => fetchLilaCards())
      .catch((error) => console.error("Error deleting card:", error));
  };
  return (
    <>
      <div className="container mt-4 mb-4">
        <h2 className="mb-3">Card Template 2</h2>
        <div className="row gy-4">
          {loadingData && (
            <div
              className="loader-container"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                zIndex: 9999,
              }}
            >
              <ScaleLoader
                color={"black"}
                loading={loadingData}
                size={150}
                aria-label="Loading Sessions"
              />
            </div>
          )}
          {sessions.map((session) => (
            <CardItem
              key={session.id}
              data={session}
              refresh={fetchLilaCards}
              handleDelete={handleDelete}
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
