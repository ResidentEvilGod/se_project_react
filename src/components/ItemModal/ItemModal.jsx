import { useState, useEffect, useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ card, isOpen, handleCloseItemModal, handleDeleteItem }) {
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const ownerId =
    typeof card?.owner === "string" ? card.owner : card?.owner?._id;

  const isOwn =
    Boolean(ownerId) &&
    Boolean(currentUser?._id) &&
    ownerId === currentUser._id;

  useEffect(() => {
    if (!isOpen) {
      setIsConfirmMode(false);
      return;
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  function handleClose() {
    setIsConfirmMode(false);
    handleCloseItemModal();
  }

  function handleOverlayMouseDown(e) {
    if (e.target === e.currentTarget) handleClose();
  }

  function handleDeleteClick() {
    setIsConfirmMode(true);
  }

  function handleConfirmDelete() {
    handleDeleteItem(card);
  }

  function handleCancelConfirm() {
    setIsConfirmMode(false);
  }

  return (
    <div
      className={`preview-modal ${isOpen ? "preview-modal_is-opened" : ""}`}
      onMouseDown={handleOverlayMouseDown}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div className="preview-modal__container">
        <button
          type="button"
          className="preview-modal__close-btn"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {!isConfirmMode && (
          <>
            <img
              src={card?.imageUrl}
              alt={card?.name || "Item"}
              className="preview-modal__image"
            />

            <div className="preview-modal__footer">
              <div className="preview-modal__caption">
                <h2 className="preview-modal__title">{card?.name}</h2>
                <p className="preview-modal__weather">
                  Weather: {card?.weather}
                </p>
              </div>

              {isOwn && (
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="preview-modal__delete-btn"
                >
                  Delete item
                </button>
              )}
            </div>
          </>
        )}

        {isConfirmMode && (
          <div className="preview-modal__confirm">
            <p className="preview-modal__confirm-title">
              Are you sure you want to delete this item?
            </p>
            <p className="preview-modal__confirm-subtitle">
              This action is irreversible.
            </p>

            <button
              type="button"
              className="preview-modal__confirm-delete"
              onClick={handleConfirmDelete}
            >
              Yes, delete item
            </button>

            <button
              type="button"
              className="preview-modal__confirm-cancel"
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



