import "./WarehousesList.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import WarehouseModal from "../WarehouseModal/WarehouseModal";

export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [orderBy, setOrderBy] = useState("asc");

  const navigate = useNavigate();
  const apiPath = `http://localhost:3000/api/warehouses`;

  const handleClick = () => {
    navigate("/add");
  };

  // Fetch Warehouses
  const fetchWarehouses = async () => {
    try {
      let url = apiPath;

      // Add sorting only if sortBy is set
      if (sortBy) {
        url += `?sort_by=${sortBy}&order_by=${orderBy}`;
      }

      const response = await axios.get(url);
      setWarehouses(response.data);
      setFilteredWarehouses(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch warehouses");
    }
  };

  // Initial fetch without sorting
  useEffect(() => {
    fetchWarehouses();
  }, []);

  // Fetch when sorting changes
  useEffect(() => {
    if (sortBy) {
      fetchWarehouses();
    }
  }, [sortBy, orderBy]);

  // Search Functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = warehouses.filter(
      (warehouse) =>
        warehouse.warehouse_name.toLowerCase().includes(value) ||
        warehouse.address.toLowerCase().includes(value) ||
        warehouse.city.toLowerCase().includes(value) ||
        warehouse.country.toLowerCase().includes(value) ||
        warehouse.contact_name.toLowerCase().includes(value) ||
        warehouse.contact_email.toLowerCase().includes(value) ||
        warehouse.contact_phone.toLowerCase().includes(value)
    );

    setFilteredWarehouses(filtered);
  };

  // Handle Sorting
  const handleSort = (column) => {
    setSortBy((prevSortBy) => {
      if (prevSortBy === column) {
        // If clicking the same column, toggle order
        setOrderBy((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      } else {
        // If clicking a new column, set order to ascending
        setOrderBy("asc");
      }
      return column;
    });
  };

  if (warehouses.length === 0) {
    return <>Loading...</>;
  }

  const closeModal = async () => {
    await fetchWarehouses();
    setOpenModal(false);
  };

  const deleteWarehouse = (warehouse) => {
    setOpenModal(true);
    setSelectedWarehouse(warehouse);
  };

  return (
    <section className="warehouses">
      <div className="warehouses__component">
        <div className="warehouses__header">
          <h1 className="warehouses__title">Warehouses</h1>

          <div className="warehouses__top">
            <input
              placeholder="Search..."
              type="search"
              className="warehouses__search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={handleClick} className="warehouses__addition">
              + Add New Warehouse
            </button>
          </div>
        </div>

        {/* Sorting Headers */}
        <div className="warehouses-categories">
          <h4
            className="warehouses-categories__warehouse"
            onClick={() => handleSort("warehouse_name")}
          >
            WAREHOUSE
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="warehouses-categories__icon"
            >
              <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
            </svg>
          </h4>
          <h4
            className="warehouses-categories__address"
            onClick={() => handleSort("address")}
          >
            ADDRESS{" "}
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="warehouses-categories__icon"
            >
              <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
            </svg>
          </h4>
          <h4
            className="warehouses-categories__name"
            onClick={() => handleSort("contact_name")}
          >
            CONTACT NAME{" "}
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="warehouses-categories__icon"
            >
              <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
            </svg>
          </h4>
          <h4
            className="warehouses-categories__information"
            onClick={() => handleSort("contact_info")}
          >
            CONTACT INFORMATION{" "}
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="warehouses-categories__icon"
            >
              <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
            </svg>
          </h4>
          <h4 className="warehouses-categories__actions">ACTIONS</h4>
        </div>

        {filteredWarehouses.map((warehouse) => (
          <div className="warehouses__details" key={warehouse.id}>
            <div className="warehouses__info">
              <div className="warehouses__left">
                <div className="specific-warehouse">
                  <h4 className="specific-warehouse__heading">WAREHOUSE</h4>
                  <Link
                    to={`/warehousedetails/${warehouse.id}`}
                    className="specific-warehouse__link"
                  >
                    <p className="specific-warehouse__location">
                      {warehouse.warehouse_name}
                    </p>
                    <svg
                      className="specific-warehouse__icon"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z" />
                    </svg>
                  </Link>
                </div>

                <div className="location">
                  <h4 className="location__heading">ADDRESS</h4>
                  <p className="location__address">
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </p>
                </div>
              </div>

              <div className="warehouses__right">
                <div className="contact">
                  <h4 className="contact__heading">CONTACT NAME</h4>
                  <p className="contact__name">{warehouse.contact_name}</p>
                </div>

                <div className="info">
                  <h4 className="info__heading">CONTACT INFORMATION</h4>
                  <p className="info__phone">{warehouse.contact_phone}</p>
                  <p className="info__email">{warehouse.contact_email}</p>
                </div>
              </div>
            </div>

            <div className="icons">
              {/* Delete Icon */}
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="icons__left"
                onClick={() => {
                  deleteWarehouse(warehouse);
                }}
              >
                <path
                  d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                  fill="#C94515"
                />
              </svg>

              {/* Edit Icon */}
              <Link to={`/edit/${warehouse.id}`} className="icons__edit">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icons__right"
                >
                  <path
                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
                    fill="#2E66E6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <>
          <div className="modal-background"></div>
          <WarehouseModal
            warehouse={selectedWarehouse}
            closeModal={closeModal}
            fetchWarehouses={fetchWarehouses}
          />
        </>
      )}
    </section>
  );
}
