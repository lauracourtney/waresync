import "../WarehouseModal/WarehouseModal.scss";
import { useState } from "react";
import axios from "axios";

export default function WarehouseModal({
  warehouse,
  closeModal,
  fetchWarehouses,
}) {
  const [error, setError] = useState(null);

  const clickHandler = async () => {
    const apiPath = `http://localhost:3000/api/warehouses/${warehouse.id}`;
    try {
      await axios.delete(apiPath); // Wait for the API call to resolve
      await fetchWarehouses(); // Refresh the warehouse list
      closeModal(); // Close the modal after a successful refresh
    } catch (error) {
      console.error("❌ Error deleting warehouse:", error);
      setError("Failed to delete the warehouse. Please try again.");
    }
  };

  return (
    <div className="warehouse-modal">
      <section className="warehouse-modal__component">
        <svg
          viewBox="0 0 24 24"
          className="warehouse-modal__close"
          xmlns="http://www.w3.org/2000/svg"
          onClick={closeModal}
        >
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            fill="#13182C"
          />
        </svg>
        <h1 className="warehouse-modal__header">
          Delete {warehouse.warehouse_name} warehouse?
        </h1>
        <p className="warehouse-modal__details">
          Please confirm that you'd like to delete the{" "}
          {warehouse.warehouse_name} warehouse from the list of warehouses. You
          won't be able to undo this action.
        </p>
        {error && <p className="warehouse-modal__error">{error}</p>}
        <div className="warehouse-modal__button">
          <button className="warehouse-modal__cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="warehouse-modal__delete" onClick={clickHandler}>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
