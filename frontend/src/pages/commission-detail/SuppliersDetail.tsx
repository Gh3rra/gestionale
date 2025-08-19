import { SupplierIcon } from "../../Icon";
import React from "react";

function SuppliersDetail() {
  return (
    <>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex gap-4">
          <SupplierIcon className="w-5 h-5" />
          <h1 className="!text-[20px]  font-medium">Fornitori</h1>
        </div>
      </div>
    </>
  );
}

export default SuppliersDetail;
