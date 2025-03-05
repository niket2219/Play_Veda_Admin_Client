import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import CardItem from "./CardItem";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import CreateModal from "./CreateModal";
import ScaleLoader from "react-spinners/ScaleLoader";

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  const [loadingData, setloadingData] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    setloadingData(true);
    axios
      .get(`${process.env.REACT_APP_SERVER}/api/cards`)
      .then((response) => {
        setCards(response.data?.cards || []);
        setloadingData(false);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
        setloadingData(false);
      });
  };

  const handleEdit = (card) => {
    setEditedCard(card);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER}/api/cards/${id}`)
      .then(() => fetchCards())
      .catch((error) => console.error("Error deleting card:", error));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Card Template 1</h2>
      <Row className="g-4">
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
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onView={() => {
              setSelectedCard(card);
              setShowViewModal(true);
            }}
            onEdit={() => handleEdit(card)}
            onDelete={() => handleDelete(card.id)}
          />
        ))}
      </Row>

      <Button
        variant="primary"
        className="position-fixed bottom-0 end-0 m-3 p-3 rounded-circle"
        onClick={() => setShowCreateModal(true)}
      >
        <FaPlus size={24} />
      </Button>

      <ViewModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        card={selectedCard}
      />
      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        card={editedCard}
        refresh={fetchCards}
      />
      <CreateModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        refresh={fetchCards}
      />
    </Container>
  );
};

export default CardList;
