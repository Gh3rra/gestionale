import styles from "./CommissionDetail.module.css";
import { SupplierIcon } from "../../Icon";

function SuppliersDetail() {
  return (
    <>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex gap-4">
          <SupplierIcon size={22} />
          <h1 className="!text-[20px]  font-medium">Fornitori</h1>
        </div>
      </div>
    </>
  );
}

export default SuppliersDetail;
