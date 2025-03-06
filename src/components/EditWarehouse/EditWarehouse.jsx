import axios from "axios";
import { useState, useEffect } from "react";
import "./EditWarehouse.scss";
import { validEmailFormat, validPhoneFormat } from "../../../utils";
import errorIcon from "../../assets/imgs/error.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import backArrow from "../../assets/imgs/arrow_back.svg";

export default function EditWareHouse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emptyError, setEmptyError] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [warehouseDetails, setWarehouseDetails] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/warehouses/${id}`
        );
        setWarehouseDetails(response.data);
        setError(null);
        setIsFormValid(true);
        setFormData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Warehouse not found. Please check the ID and try again.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    };
    fetchWarehouseDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact_phone") {
      if (!validPhoneFormat.test(value) && value !== "") {
        setPhoneError(
          <>
            <img className="error__icon" src={errorIcon} />
            Please enter a valid phone number (e.g., +1 (123) 456-7890)
          </>
        );
        setIsFormValid(false);
      } else {
        setPhoneError("");
        setIsFormValid(true);
      }
    }

    if (name === "contact_email") {
      if (!validEmailFormat.test(value) && value !== "") {
        setEmailError(
          <>
            <img className="error__icon" src={errorIcon} />
            Please enter a valid email (e.g., example@example.com)
          </>
        );
        setIsFormValid(false);
      } else {
        setEmailError("");
        setIsFormValid(true);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmptyError("");
    setEmailError("");
    setPhoneError("");

    if (
      !formData.warehouse_name ||
      !formData.address ||
      !formData.city ||
      !formData.country ||
      !formData.contact_name ||
      !formData.contact_position ||
      !formData.contact_phone ||
      !formData.contact_email
    ) {
      setIsFormValid(false);
      setEmptyError(
        <>
          <img className="error__icon" src={errorIcon} /> This field is required
        </>
      );
      return;
    }

    if (
      formData.contact_phone &&
      !validPhoneFormat.test(formData.contact_phone)
    ) {
      setPhoneError(
        <>
          <img className="error__icon" src={errorIcon} />
          Please enter a valid phone number
        </>
      );
      setIsFormValid(false);
      return;
    }

    if (
      formData.contact_email &&
      !validEmailFormat.test(formData.contact_email)
    ) {
      setEmailError(
        <>
          <img className="error__icon" src={errorIcon} />
          Please enter a valid email
        </>
      );
      setIsFormValid(false);
      return;
    }

    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = formData;
    const updatedFormData = {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    };

    try {
      await axios.put(
        `http://localhost:3000/api/warehouses/${id}`,
        updatedFormData
      );
      navigate(`/warehouses`, { state: { refresh: true } });
    } catch (error) {
      console.error("Failed to update warehouse:", error.message);
      setError("Failed to update warehouse. Please try again later.");
    }
  };

  const handleCancel = () => {
    navigate(`/warehouses`);
  };

  if (warehouseDetails === null) {
    if (error) {
      return <>{error}</>;
    }
    return <>Loading...</>;
  }

  return (
    <section className="edit-warehouse">
      <div className="edit-warehouse__header">
        <Link className="edit-warehouse__arrow" to={`/warehouses`}>
          <img src={backArrow}></img>
        </Link>
        <h1 className="edit-warehouse__title">Edit Warehouse</h1>
      </div>

      <div className="edit-warehouse__border"></div>

      <form className="edit-warehouse__form" onSubmit={handleSubmit}>
        <div className="edit-warehouse__middle">
          <div className="edit-warehouse__details">
            <h2 className="edit-warehouse__subheader">Warehouse Details</h2>
            <div className="edit-warehouse__item">
              <label className="edit-warehouse__label">
                <h3 className="edit-warehouse__subtitle">Warehouse Name</h3>
                <input
                  className={`edit-warehouse__input ${
                    !isFormValid && !formData.warehouse_name
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                  name="warehouse_name"
                  type="text"
                  placeholder={formData.warehouse_name}
                  value={formData.warehouse_name}
                  onChange={handleChange}
                />
              </label>
              {!formData.warehouse_name && (
                <p className="error">{emptyError}</p>
              )}
            </div>

            <div className="edit-warehouse__item">
              <label className="edit-warehouse__label">
                <h3 className="edit-warehouse__subtitle">Street Address</h3>
                <input
                  className={`edit-warehouse__input ${
                    !isFormValid && !formData.address
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="address"
                  placeholder={formData.address}
                  value={formData.address}
                  onChange={handleChange}
                />
              </label>
              {!formData.address && <p className="error">{emptyError}</p>}
            </div>

            <div className="edit-warehouse__item">
              <label className="edit-warehouse__label">
                <h3 className="edit-warehouse__subtitle">City</h3>
                <input
                  className={`edit-warehouse__input ${
                    !isFormValid && !formData.city
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="city"
                  placeholder={formData.city}
                  value={formData.city}
                  onChange={handleChange}
                />
              </label>
              {!formData.city && <p className="error">{emptyError}</p>}
            </div>

            <div className="edit-warehouse__item">
              <label className="edit-warehouse__label">
                <h3 className="edit-warehouse__subtitle">Country</h3>
                <input
                  className={`edit-warehouse__input ${
                    !isFormValid && !formData.country
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="country"
                  placeholder={formData.country}
                  value={formData.country}
                  onChange={handleChange}
                />
              </label>
              {!formData.country && <p className="error">{emptyError}</p>}
            </div>
          </div>

          <div className="edit-warehouse__contact">
            <h2 className="edit-warehouse__subheader">Contact Details</h2>

            <div className="edit-warehouse__item">
              <label className="edit-warehouse__label">
                <h3 className="edit-warehouse__subtitle">Contact Name</h3>
                <input
                  className={`edit-warehouse__input ${
                    !isFormValid && !formData.contact_name
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="contact_name"
                  placeholder={formData.contact_name}
                  value={formData.contact_name}
                  onChange={handleChange}
                />
              </label>
              {!formData.contact_name && <p className="error">{emptyError}</p>}
            </div>

            <div className="edit-warehouse__item">
              <label className="edit-warehouse__label">
                <h3 className="edit-warehouse__subtitle">Position</h3>
                <input
                  className={`edit-warehouse__input ${
                    !isFormValid && !formData.contact_position
                      ? "edit-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="contact_position"
                  placeholder={formData.contact_position}
                  value={formData.contact_position}
                  onChange={handleChange}
                />
              </label>
              {!formData.contact_position && (
                <p className="error">{emptyError}</p>
              )}
            </div>

            <div className="edit-warehouse__item">
              <label className="edit-warehouse__label">
                <h3 className="edit-warehouse__subtitle">Phone Number</h3>
                <input
                  className={`edit-warehouse__input ${
                    !isFormValid ? "edit-warehouse__input--error" : ""
                  }`}
                  type="text"
                  name="contact_phone"
                  placeholder={formData.contact_phone}
                  value={formData.contact_phone}
                  onChange={handleChange}
                />
              </label>
              {!formData.contact_phone && <p className="error">{emptyError}</p>}
              {phoneError && <p className="error">{phoneError}</p>}
            </div>

            <div className="edit-warehouse__item">
              <label className="edit-warehouse__label">
                <h3 className="edit-warehouse__subtitle">Email</h3>
                <input
                  className={`edit-warehouse__input ${
                    !isFormValid ? "edit-warehouse__input--error" : ""
                  }`}
                  type="text"
                  name="contact_email"
                  placeholder={formData.contact_email}
                  value={formData.contact_email}
                  onChange={handleChange}
                />
              </label>
              {!formData.contact_email && <p className="error">{emptyError}</p>}
              {emailError && <p className="error">{emailError}</p>}
            </div>
          </div>
        </div>

        <div className="edit-warehouse__bottom">
          <div className="edit-warehouse__buttons">
            <button
              onClick={handleCancel}
              className="edit-warehouse__button edit-warehouse__button--cancel"
              type="button"
            >
              <h3>Cancel</h3>
            </button>
            <button className="edit-warehouse__button" type="submit">
              <h3>Save</h3>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
