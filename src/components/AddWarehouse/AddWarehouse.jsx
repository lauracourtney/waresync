import axios from "axios";
import { useState } from "react";
import "./AddWarehouse.scss";
import { validEmailFormat, validPhoneFormat } from "../../../utils";
import errorIcon from "../../assets/imgs/error.svg";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../../assets/imgs/arrow_back.svg";

export default function AddWareHouse() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    if (!validPhoneFormat.test(formData.contact_phone)) {
      setPhoneError(
        <div className="error">
          <img className="error__icon" src={errorIcon} />
          <h3>Please enter a valid phone number</h3>
        </div>
      );
      setIsFormValid(false);
      return;
    }

    if (!validEmailFormat.test(formData.contact_email)) {
      setEmailError(
        <>
          <img className="error__icon" src={errorIcon} />
          Please enter a valid email
        </>
      );
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);

    await createWarehouse();
  };

  const createWarehouse = async () => {
    try {
      await axios.post("http://localhost:3000/api/warehouses", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setFormData({
        warehouse_name: "",
        address: "",
        city: "",
        country: "",
        contact_name: "",
        contact_position: "",
        contact_phone: "",
        contact_email: "",
      });

      navigate("/warehouses", { state: { refresh: true }, replace: true });
    } catch (error) {
      console.error("Request failed:", error.response?.data || error.message);
      setEmptyError(
        error.response?.data?.message ||
          "Failed to create warehouse. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      warehouse_name: "",
      address: "",
      city: "",
      country: "",
      contact_name: "",
      contact_position: "",
      contact_phone: "",
      contact_email: "",
    });
    setIsFormValid(true);
    setEmptyError("");
    setEmailError("");
    setPhoneError("");
    navigate("/warehouses", { state: { refresh: true }, replace: true });
  };

  return (
    <section className="add-warehouse">
      <div className="add-warehouse__header">
        <Link className="add-warehouse__arrow" to="/">
          <img src={backArrow}></img>
        </Link>
        <h1 className="add-warehouse__title">Add New Warehouse</h1>
      </div>

      <div className="add-warehouse__border"></div>

      <form className="add-warehouse__form" onSubmit={handleSubmit}>
        <div className="add-warehouse__middle">
          <div className="add-warehouse__details">
            <h2 className="add-warehouse__subheader">Warehouse Details</h2>
            <div className="add-warehouse__item">
              <label className="add-warehouse__label">
                <h3 className="add-warehouse__subtitle">Warehouse Name:</h3>
                <input
                  className={`add-warehouse__input ${
                    !isFormValid && !formData.warehouse_name
                      ? "add-warehouse__input--error"
                      : ""
                  }`}
                  name="warehouse_name"
                  type="text"
                  placeholder="Warehouse Name"
                  value={formData.warehouse_name}
                  onChange={handleChange}
                />
              </label>
              {!formData.warehouse_name && (
                <p className="error">{emptyError}</p>
              )}
            </div>

            <div className="add-warehouse__item">
              <label className="add-warehouse__label">
                <h3 className="add-warehouse__subtitle">Street Address</h3>
                <input
                  className={`add-warehouse__input ${
                    !isFormValid && !formData.address
                      ? "add-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </label>
              {!formData.address && <p className="error">{emptyError}</p>}
            </div>

            <div className="add-warehouse__item">
              <label className="add-warehouse__label">
                <h3 className="add-warehouse__subtitle">City</h3>
                <input
                  className={`add-warehouse__input ${
                    !isFormValid && !formData.city
                      ? "add-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </label>
              {!formData.city && <p className="error">{emptyError}</p>}
            </div>

            <div className="add-warehouse__item">
              <label className="add-warehouse__label">
                <h3 className="add-warehouse__subtitle">Country</h3>
                <input
                  className={`add-warehouse__input ${
                    !isFormValid && !formData.country
                      ? "add-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </label>
              {!formData.country && <p className="error">{emptyError}</p>}
            </div>
          </div>

          <div className="add-warehouse__contact">
            <h2 className="add-warehouse__subheader">Contact Details</h2>

            <div className="add-warehouse__item">
              <label className="add-warehouse__label">
                <h3 className="add-warehouse__subtitle">Contact Name</h3>
                <input
                  className={`add-warehouse__input ${
                    !isFormValid && !formData.contact_name
                      ? "add-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="contact_name"
                  placeholder="Contact Name"
                  value={formData.contact_name}
                  onChange={handleChange}
                />
              </label>
              {!formData.contact_name && <p className="error">{emptyError}</p>}
            </div>

            <div className="add-warehouse__item">
              <label className="add-warehouse__label">
                <h3 className="add-warehouse__subtitle">Position</h3>
                <input
                  className={`add-warehouse__input ${
                    !isFormValid && !formData.contact_position
                      ? "add-warehouse__input--error"
                      : ""
                  }`}
                  type="text"
                  name="contact_position"
                  placeholder="Position"
                  value={formData.contact_position}
                  onChange={handleChange}
                />
              </label>
              {!formData.contact_position && (
                <p className="error">{emptyError}</p>
              )}
            </div>

            <div className="add-warehouse__item">
              <label className="add-warehouse__label">
                <h3 className="add-warehouse__subtitle">Phone Number</h3>
                <input
                  className={`add-warehouse__input ${
                    !isFormValid ? "add-warehouse__input--error" : ""
                  }`}
                  type="text"
                  name="contact_phone"
                  placeholder="Phone Number"
                  value={formData.contact_phone}
                  onChange={handleChange}
                />
              </label>
              {!formData.contact_phone && <p className="error">{emptyError}</p>}
              {phoneError && <p className="error">{phoneError}</p>}
            </div>

            <div className="add-warehouse__item">
              <label className="add-warehouse__label">
                <h3 className="add-warehouse__subtitle">Email</h3>
                <input
                  className={`add-warehouse__input ${
                    !isFormValid ? "add-warehouse__input--error" : ""
                  }`}
                  type="text"
                  name="contact_email"
                  placeholder="Email"
                  value={formData.contact_email}
                  onChange={handleChange}
                />
              </label>
              {!formData.contact_email && <p className="error">{emptyError}</p>}
              {emailError && <p className="error">{emailError}</p>}
            </div>
          </div>
        </div>

        <div className="add-warehouse__bottom">
          <div className="add-warehouse__buttons">
            <button
              onClick={handleCancel}
              className="add-warehouse__button add-warehouse__button--cancel"
              type="button"
            >
              <h3>Cancel</h3>
            </button>
            <button className="add-warehouse__button" type="submit">
              <h3>+ Add Warehouse</h3>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
