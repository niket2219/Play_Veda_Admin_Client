import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import CreateModal from "./CreateModal";

const CardItem = ({ data, refresh }) => {
  const { details_button, location } = data;
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="col-md-4">
      <Card style={{ borderRadius: "10px" }} className="shadow-sm p-3">
        <Card.Body>
          <Card.Text>
            <strong>Location:</strong> {location}
          </Card.Text>
          <Card.Text>
            <strong>Details Button:</strong>{" "}
            {details_button === "true" ? "✅" : "❌"}
          </Card.Text>
        </Card.Body>

        <Card.Body className="d-flex justify-content-start gap-3">
          <Button variant="light" size="sm" onClick={() => setShowView(true)}>
            <i className="bi bi-eye"></i>
          </Button>
          <Button variant="warning" size="sm" onClick={() => setShowEdit(true)}>
            <i className="bi bi-pencil"></i>
          </Button>
          <Button variant="danger" size="sm">
            <i className="bi bi-trash"></i>
          </Button>
        </Card.Body>
      </Card>

      <ViewModal
        show={showView}
        handleClose={() => setShowView(false)}
        data={data}
        refresh={refresh}
      />
      <EditModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        data={data}
        refresh={refresh}
      />
    </div>
  );
};

export default CardItem;
