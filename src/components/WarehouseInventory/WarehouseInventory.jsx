import "./WarehouseInventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Chevron from "../../assets/imgs/chevron_right.svg";
import EditIconBlue from "../../assets/imgs/edit-blue.svg";
import { formatStatus } from "../../../utils";
// import InventoryModal from "../InventoryModal/InventoryModal";

export default function WarehouseInventoryList({ warehouseId }) {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [orderBy, setOrderBy] = useState("asc");
  const [openInvModal, setOpenInvModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const apiPath = `http://localhost:3000/api/warehouses/${warehouseId}/inventories`;

  // Fetch Inventories
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(apiPath);
        setInventory(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
        setError("Failed to fetch inventory data.");
      }
    };

    fetchInventory();
  }, [warehouseId]);

  // Fetch Sorted Inventories
  const fetchSortedInventory = async () => {
    try {
      let url = apiPath;
      if (sortBy) {
        url += `?sort_by=${sortBy}&order_by=${orderBy}`;
      }

      const response = await axios.get(url);
      setInventory(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sorted inventory data:", error);
      setError("Failed to fetch sorted inventory data.");
    }
  };

  // Handle Sorting
  const handleSort = (column) => {
    setSortBy(column);
    setOrderBy((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    fetchSortedInventory(); // Explicitly trigger the sorted fetch
  };

  // Open Delete Modal
  const openDeleteModal = (item) => {
    setSelectedInventory(item); // Store the selected inventory item
    setOpenInvModal(true); // Open the modal
  };

  // Close Modal and Refresh Inventories
  const closeInvModal = () => {
    setOpenInvModal(false);
    fetchSortedInventory(); // Refresh the inventory after deletion
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (inventory.length === 0) {
    return <p className="loading-message">Loading inventory...</p>;
  }

  return (
    <section className="wareouse-inventory">
      <div className="warehouse-inventory__component">
        <div className="warehouse-inventory__categories">
          <h4
            className="categories__item"
            onClick={() => handleSort("item_name")}
          >
            INVENTORY ITEM
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="categories__icon"
            >
              <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41 7.59L8.83 9L12 5.83ZM12 18.17L8.83 15L7.42 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
            </svg>
          </h4>
          <h4
            className="categories__category"
            onClick={() => handleSort("category")}
          >
            CATEGORY{" "}
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="categories__icon"
            >
              <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41 7.59L8.83 9L12 5.83ZM12 18.17L8.83 15L7.42 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
            </svg>
          </h4>
          <h4
            className="categories__status"
            onClick={() => handleSort("status")}
          >
            STATUS{" "}
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="categories__icon"
            >
              <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41 7.59L8.83 9L12 5.83ZM12 18.17L8.83 15L7.42 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
            </svg>
          </h4>
          <h4
            className="categories__quantity"
            onClick={() => handleSort("quantity")}
          >
            QUANTITY{" "}
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="categories__icon"
            >
              <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41 7.59L8.83 9L12 5.83ZM12 18.17L8.83 15L7.42 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
            </svg>
          </h4>
          <h4 className="categories__actions">ACTIONS</h4>
        </div>

        {inventory.map((item) => (
          <div className="inventories__details" key={item.id}>
            <div className="inventories__item">
              <div className="inventories__left">
                <div className="ware-inventory">
                  <h4 className="ware-inventory__heading">INVENTORY ITEM</h4>
                  <Link
                    to={`/inventory/${item.id}`}
                    className="ware-inventory__link"
                  >
                    <p className="ware-inventory__name">{item.item_name}</p>
                    <img
                      src={Chevron}
                      alt="Chevron"
                      className="ware-inventory__icon"
                    />
                  </Link>
                </div>

                <div className="category">
                  <h4 className="category__heading">CATEGORY</h4>
                  <p className="category__name">{item.category}</p>
                </div>
              </div>

              <div className="inventories__right">
                <div className="inv-statuses">
                  <h4 className="inv-statuses__heading">STATUS</h4>
                  <p
                    className={`inv--statuses__value ${
                      formatStatus(item.status) === "IN STOCK"
                        ? "inv-statuses__value--in"
                        : "inv-statuses__value--out"
                    }`}
                  >
                    {formatStatus(item.status)}
                  </p>
                </div>

                <div className="quantity">
                  <h4 className="quantity__heading">QUANTITY</h4>
                  <p className="quantity__value">{item.quantity}</p>
                </div>
              </div>
            </div>

            <div className="inv-icons">
              <Link
                to={`/inventory/edit/${item.id}`}
                className="inv-icons__button inv-icons__edit"
              >
                <img src={EditIconBlue} alt="Edit" />
              </Link>
              <Link
                to={`/inventory/edit/${item.id}`}
                className="inv-icons__button inv-icons__edit"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inv-icons__button inv-icons__delete"
                  onClick={() => openDeleteModal(item)}
                >
                  <path
                    d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                    fill="#C94515"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}

        {openInvModal && (
          <>
            <div className="modal-background"></div>
            <InventoryModal
              inventory={selectedInventory}
              closeInvModal={closeInvModal}
              fetchInventories={fetchSortedInventory}
            />
          </>
        )}
      </div>
    </section>
  );
}
