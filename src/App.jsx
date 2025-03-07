import "./styles/main.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import WarehousesPage from "./pages/WarehousesPage.jsx";
import EditWareHouse from "./components/EditWarehouse/EditWarehouse.jsx";
import AddWareHouse from "./components/AddWarehouse/AddWarehouse.jsx";
import WarehouseDetailsPage from "./pages/WarehousesDetailsPage.jsx";
import Footer from "./components/Footer/Footer";
// import InventoryPage from "./pages/InventoryPage/InventoryPage";
// import EditInventoryItem from "./components/EditInventoryItem/EditInventoryItem";
// import AddInventoryItem from "./components/AddInventoryItem/AddInventoryItem";
// import InventoryDetailsPage from "./components/InventoryDetails/InventoryDetails";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/warehouses" replace />} />
        <Route path="/warehouses" element={<WarehousesPage />} />
        <Route path="/edit/:id" element={<EditWareHouse />} />
        <Route path="/add" element={<AddWareHouse />} />
        <Route
          path="/warehousedetails/:id"
          element={<WarehouseDetailsPage />}
        />
      </Routes>
      <Footer />
    </>
  );
}
{
  /* <Route path="/inventory/add" element={<AddInventoryItem />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/:id" element={<InventoryDetailsPage />} />
        <Route path="/inventory/edit/:id" element={<EditInventoryItem />} />
      </Routes>
      {/* <Footer /> */
}
