import React, { useState } from "react";
import Modal from "react-modal";
import "../../style/modal-delete.css";
import { ReactModal } from "react-modal";

Modal.setAppElement("#root");

const DeleteAccountModal = ({ isOpen, closeModal, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
    closeModal();
  };

  return (
    <Modal className="delete-modal" isOpen={isOpen} onRequestModal={closeModal}>
      <div className="delete-modal-container">
        <h1>Are you sure you want to delete your account?</h1>
        <p> This action cannot be undone.</p>
        <div className="delete-modal-buttons">
          <button onClick={closeModal} className="delete-modal-cancel-button">Cancel</button>
          <button onClick={handleDelete} disabled={isDeleting} className="delete-modal-submit-button">
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
