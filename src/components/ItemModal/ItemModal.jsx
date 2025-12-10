import { useState, useEffect } from "react";
import "./ItemModal.css";

function ItemModal({ card, isOpen, handleCloseItemModal, handleDeleteItem }) {
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  // whenever the modal closes, reset back to normal view mode
  useEffect(() => {
    if (!isOpen) {
      setIsConfirmMode(false);
    }
  }, [isOpen]);

  function handleClose() {
    setIsConfirmMode(false);
    handleCloseItemModal();
  }

  function handleDeleteClick() {
    // switch to confirm screen
    setIsConfirmMode(true);
  }

  function handleConfirmDelete() {
    // actually delete the item (App.jsx will remove it + call the API)
    handleDeleteItem(card);
  }

  function handleCancelConfirm() {
    setIsConfirmMode(false);
  }

  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-btn"
          onClick={handleClose}
        >
          X
        </button>

        {/* Normal view: image + info + delete */}
        {!isConfirmMode && (
          <>
            <img src={card.imageUrl} alt={card.name} className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__text">{card.name}</h2>
              <p className="modal__text">Weather: {card.weather}</p>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="modal__delete-btn"
              >
                Delete item
              </button>
            </div>
          </>
        )}

        {/* Confirm view: “Are you sure… Yes / Cancel” */}
        {isConfirmMode && (
          <div className="modal__confirm">
            <p className="modal__confirm-title">
              Are you sure you want to delete this item?
            </p>
            <p className="modal__confirm-subtitle">
              This action is irreversible.
            </p>

            <button
              type="button"
              className="modal__confirm-delete"
              onClick={handleConfirmDelete}
            >
              Yes, delete item
            </button>

            <button
              type="button"
              className="modal__confirm-cancel"
              onClick={handleCancelConfirm}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
