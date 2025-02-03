import { Routes, Route, Navigate } from "react-router-dom";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import "./App.scss";
import AddWareHouse from "./components/AddWarehouse/AddWarehouse";
import EditWareHouse from "./components/EditWarehouse/EditWarehouse";
import EditInventoryItem from "./components/EditInventoryItem/EditInventoryItem";
import InventoryDetailsPage from "./components/InventoryDetails/InventoryDetails";
import AddInventoryItem from "./components/AddInventoryItem/AddInventoryItem";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Redirect Home "/" to "/warehouses" */}
        <Route path="/" element={<Navigate to="/warehouses" replace />} />

        {/* Main Routes */}
        <Route path="/warehouses" element={<WarehousesPage />} />
        <Route path="/inventory/add" element={<AddInventoryItem />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/:id" element={<InventoryDetailsPage />} />
        <Route path="/inventory/edit/:id" element={<EditInventoryItem />} />
        <Route path="/add" element={<AddWareHouse />} />
        <Route path="/edit/:id" element={<EditWareHouse />} />
        <Route
          path="/warehousedetails/:id"
          element={<WarehouseDetailsPage />}
        />
      </Routes>
      <Footer />
    </>
  );
}
