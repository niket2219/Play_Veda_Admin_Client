import React from "react";

const SessionModal = ({ session, onClose }) => {
  if (!session) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{session.theme}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Date:</strong> {session.date} ({session.day})
            </p>
            <p>
              <strong>Time:</strong> {session.time}
            </p>
            <p>
              <strong>Location:</strong> {session.location}
            </p>
            <p>
              <strong>Week:</strong> {session.week} | <strong>Month:</strong>{" "}
              {session.month}
            </p>
            <p>
              <strong>Description:</strong> {session.desc}
            </p>

            <h6>Benefits:</h6>
            <ul>
              {session.benefits?.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>

            <h6>Activities:</h6>
            <div className="row">
              {session.sessionActivities?.map((activity, index) => (
                <div
                  key={index}
                  className="col-md-6 p-2 d-flex flex-column align-items-center text-center"
                >
                  <div
                    className="p-3 rounded d-flex flex-column align-items-center"
                    style={{ background: activity.color, width: "100%" }}
                  >
                    <img
                      src={activity.icon}
                      alt={activity.name}
                      style={{ width: "40px", marginBottom: "10px" }}
                    />
                    <strong style={{ color: activity.titleColor }}>
                      {activity.name}
                    </strong>
                    <p>{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose} // Close the modal when clicked
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
