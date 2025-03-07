import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import BackArrow from "../../assets/imgs/arrow_back.svg";
import EditIcon from "../../assets/imgs/edit-white.svg";
import "./WarehouseDetails.scss";

export default function WarehouseDetails() {
  const [warehouseDetails, setWarehouseDetails] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/warehouses/${id}`
        );
        setWarehouseDetails(response.data);
        setError(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Warehouse not found. Please check the ID and try again.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    };

    // Check if we need to force refresh
    if (!warehouseDetails || location.state?.refresh) {
      fetchWarehouseDetails();
    }
  }, [id, location.state]);

  if (warehouseDetails === null) {
    if (error) {
      return <>{error}</>;
    }
    return <>Loading...</>;
  }

  return (
    <section className="single-warehouse">
      <header className="single-warehouse__header">
        <div className="single-warehouse__container">
          <Link to="/">
            <img
              className="single-warehouse__arrow"
              src={BackArrow}
              alt="Back"
            />
          </Link>
          <h1 className="single-warehouse__name">
            {warehouseDetails.warehouse_name}
          </h1>
        </div>
        <Link
          to={`/edit/${id}`}
          className="single-warehouse__edit-link"
          state={{ refresh: true }}
        >
          <img
            src={EditIcon}
            className="single-warehouse__edit-icon"
            alt="Edit"
          />
          <p className="single-warehouse__edit">Edit</p>
        </Link>
      </header>
      <div className="single-warehouse__address-details">
        <div className="single-warehouse__small-container">
          <h4 className="single-warehouse__heading">WAREHOUSE ADDRESS:</h4>
          <p className="single-warehouse__address">
            {warehouseDetails.address}, {warehouseDetails.city},{" "}
            {warehouseDetails.country}
          </p>
        </div>
        <div className="single-warehouse__big-container">
          <article className="single-warehouse__contact">
            <h4 className="single-warehouse__heading">CONTACT NAME:</h4>
            <p>{warehouseDetails.contact_name}</p>
            <p>{warehouseDetails.contact_position}</p>
          </article>
          <article className="single-warehouse__information">
            <h4 className="single-warehouse__heading">CONTACT INFORMATION:</h4>
            <p>{warehouseDetails.contact_phone}</p>
            <p>{warehouseDetails.contact_email}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
