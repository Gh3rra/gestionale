import { useEffect, useState } from "react";
import { DeleteIcon, DropDownArrowIcon } from "../../../Icon";
import Button from "../../../components/Button/Button";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { CommissionStepFields, SupplierFormModel } from "./hookForm";
import { supabase } from "../../../supabase-client";
import { SupplierModel } from "../../commission-detail/CommissionDetail";
import MyTextField from "../../../components/TextField/TextField";
import { checkValueDecimal } from "../../../common/utils";

function GoodsStep() {
  const [openIndex, setOpenIndex] = useState<number[]>([]);
  const { control } = useFormContext<CommissionStepFields>();
  const selectedSuppliers =
    (useWatch<CommissionStepFields>({
      control,
      name: "suppliers",
    }) as SupplierFormModel[]) ?? [];
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);

  const fetchSuppliers = async () => {
    let suppliersData: SupplierModel[] = [];
    if (selectedSuppliers.length > 0) {
      const { data, error } = await supabase
        .from("suppliers")
        .select("*")
        .in(
          "id",
          selectedSuppliers.map((e) => e.id)
        );

      if (data) {
        suppliersData = data.map((e) => ({
          id: e.id,
          name: e.name,
          ivaCode: e.iva_code,
          address: e.address,
          city: e.city,
          cap: e.cap,
          province: e.province,
          email: e.email,
          pec: e.pec,
          createdAt: e.created_at,
          updatedAt: e.updated_at,
          phone: e.phone,
          profileImg: e.profile_img,
          goods: [],
        }));
        setSuppliers(suppliersData);
      }
      if (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (index: number) => {
    if (openIndex.includes(index)) {
      setOpenIndex((prev) => prev.filter((e) => e !== index));
    } else {
      setOpenIndex((prev) => [...prev, index]);
    }
  };
  return (
    <div className="flex flex-col gap-5 h-full max-h-full justify-start  pr-5 mb-5">
      <p className="font-semibold !text-[25px]">Merci</p>

      {suppliers.map((supplier, index) => {
        return (
          <div
            key={index}
            className=" flex flex-col w-full justify-between items-center bg-white rounded-[20px] border-1 border-fourtiary px-[20px]"
          >
            <div
              className="flex flex-row w-full justify-between"
              onClick={() => handleOpen(index)}
            >
              <div className="flex flex-row items-center gap-5">
                <img
                  src={supplier.profileImg ?? ""}
                  alt=""
                  className="object-contain h-[60px] w-[60px]"
                />
                <p>{supplier.name}</p>
              </div>
              <div className="flex items-center">
                <DropDownArrowIcon
                  size={40}
                  className={`p-[8px] w-[50px] h-[50px] rounded-full  transition-all duration-300 ease-in-out ${
                    openIndex.includes(index) ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>{" "}
            <div
              className={`grid transition-grid-template-rows duration-300 ease-in-out w-full ${
                openIndex.includes(index)
                  ? "grid-rows-[1fr] "
                  : "grid-rows-[0fr]"
              }`}
            >
              <GoodsInput supplier={supplier} index={index} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GoodsInput({ index }: { supplier: SupplierModel; index: number }) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `suppliers.${index}.goods`,
    control,
  });

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col items-center w-full">
        {fields.map((_, i) => (
          <FieldsInput
            fieldIndex={i}
            supplierIndex={index}
            remove={remove}
            key={_.id}
          />
        ))}

        <div className="flex gap-[20px] pt-[20px] pb-[30px]">
          <Button
            onClick={() => {
              append({
                title: "",
                quantity: "",
                unitPrice: "",
                totalPrice: "",
              });
            }}
            height={"40px"}
          >
            Aggiungi Merce
          </Button>
          <Button onClick={async () => {}} height={"40px"}>
            Carica fattura/e
          </Button>
        </div>
      </div>
    </div>
  );
}

function FieldsInput({
  supplierIndex,
  fieldIndex,
  remove,
}: {
  supplierIndex: number;
  fieldIndex: number;
  remove: (index?: number | number[]) => void;
}) {
  const { setValue, getValues } = useFormContext();
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [unitPrice, setUnitPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    const currentUnitPrice = getValues(
      `suppliers.${supplierIndex}.goods.${fieldIndex}.unitPrice`
    );
    const currentQuantity = getValues(
      `suppliers.${supplierIndex}.goods.${fieldIndex}.quantity`
    );
    if (currentUnitPrice !== "") {
      setUnitPrice(currentUnitPrice);
    }
    if (currentQuantity !== "") {
      setQuantity(currentQuantity);
    }
    if (quantity !== undefined && unitPrice !== undefined) {
      const sum = quantity * unitPrice;

      setValue(
        `suppliers.${supplierIndex}.goods.${fieldIndex}.totalPrice`,
        checkValueDecimal(sum.toString())
      );
    }
  }, [quantity, unitPrice]);

  return (
    <div className="w-full flex justify-between px-[30px] gap-[30px] mb-[20px] ">
      <MyTextField
        className="!mt-[10px]"
        name={`suppliers.${supplierIndex}.goods.${fieldIndex}.title`}
        labelText={"Merce"}
      />
      <MyTextField
        className="!mt-[10px]"
        name={`suppliers.${supplierIndex}.goods.${fieldIndex}.quantity`}
        labelText={"Quantità"}
        onChange={(e) => {
          setQuantity(Number(e.target.value.replace(",", ".")));
        }}
        datatype="number"
      />
      <MyTextField
        className="!mt-[10px]"
        name={`suppliers.${supplierIndex}.goods.${fieldIndex}.unitPrice`}
        labelText={"Importo unitario"}
        onChange={(e) => {
          setUnitPrice(Number(e.target.value.replace(",", ".")));
        }}
        datatype="decimal"
        currency="€/pz"
      />
      <MyTextField
        className="!mt-[10px]"
        name={`suppliers.${supplierIndex}.goods.${fieldIndex}.totalPrice`}
        labelText={"Importo totale"}
        datatype="decimal"
        currency="€"
      />

      <div className="flex-row flex justify-center items-end">
        <Button
          onClick={() => {
            remove(fieldIndex);
          }}
        >
          <DeleteIcon size={37} />
        </Button>
      </div>
    </div>
  );
}

export default GoodsStep;
