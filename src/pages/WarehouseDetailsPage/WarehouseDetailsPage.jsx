import React from "react";
import { useParams } from "react-router-dom";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import "./WarehouseDetailsPage.scss";

export default function WarehouseDetailsPage() {
  const { id } = useParams();
  return (
    <section className="warehouse-inventory">
      <WarehouseDetails warehouseId={id} />
      <WarehouseInventoryList warehouseId={id} />
    </section>
  );
}
