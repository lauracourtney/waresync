import { useParams } from "react-router-dom";
import WarehouseDetails from "../components/WarehouseDetails/WarehouseDetails";
// import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";

export default function WarehouseDetailsPage() {
  const { id } = useParams();
  return (
    <section className="warehouse-details">
      <WarehouseDetails warehouseId={id} />
      {/* <WarehouseInventoryList warehouseId={id} /> */}
    </section>
  );
}
