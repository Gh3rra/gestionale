import { useState } from "react";
import { NextArrowIcon, SelectedIcon, SelectIcon } from "../../../Icon.tsx";
import { suppliers } from "../../../data";
import Button from "../../../components/Button/Button";
import { CommissionStepFields } from "./hookForm.ts";
import { useFormContext } from "react-hook-form";

function SuppliersStep() {
  const [searchText, setSearchText] = useState("");
  const [resultList, setResultList] = useState(suppliers);
  const { watch, setValue, getValues } = useFormContext<CommissionStepFields>();
  const selectedSuppliers = watch("suppliers") ?? [];

  const isSelected = (supplierId: number) => {
    return selectedSuppliers.some((s) => s.id === supplierId);
  };

  const search = (newText: string) => {
    const fuse = new Fuse(suppliers, {
      threshold: 0.4,
      keys: ["name", "surname"],
    });
    setSearchText(newText);
    const newList = fuse.search(newText).map((result) => result.item);
    if (newText !== "") {
      setResultList(newList);
    } else {
      setResultList(suppliers);
    }
  };

  const selectSuppliers = (supplierId: number) => {
    const current = getValues("suppliers") ?? [];
    const updated = current.some((s) => supplierId === s.id)
      ? current.filter((s) => supplierId !== s.id)
      : [...current, { id: supplierId, goods: [] }];
    setValue("suppliers", updated);
  };

  return (
    <div className="flex flex-col w-full gap-5 justify-evenly">
      <div className="flex flex-col w-full gap-5 justify-evenly">
        <div className="flex gap-5">
          <div className="flex flex-col items-start justify-center gap-[10px] h-full w-full">
            <label htmlFor="title">Fornitore</label>
            <div className="flex h-[37px] w-full gap-5">
              <div className="relative w-full flex items-center justify-center px-[5px] bg-hover border-1 border-fourtiary rounded-[5px] focus-within:border-black">
                <input
                  className="w-full h-full border-none outline-none px-[5px] bg-none text-primary-text"
                  value={searchText}
                  onChange={(e) => search(e.target.value)}
                  id="title"
                  type="text"
                  placeholder="Cerca..."
                />
                <button className="outline-none border-none flex justify-center items-center rounded-[5px] px-[2px]   hover:bg-fourtiary">
                  <NextArrowIcon size={30} />
                </button>
              </div>
              <Button height={"100%"}>Nuovo Fornitore</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-y-scroll mb-[20px] custom-scrollbar">
        <table className="mr-5 border-spacing-0 border-separate rounded-[10px] border-1 border-fourtiary bg-white overflow-hidden">
          <tbody>
            {resultList.map((supplier, index) => (
              <tr
                key={index}
                className={`w-full max-h-[80px] first:[&_td]:border-none  [&_td]:border-t-[1px] [&_td]:border-t-fourtiary hover:bg-hover  ${
                  isSelected(supplier.id) && "bg-hover"
                }`}
                onClick={() => {
                  selectSuppliers(supplier.id);
                }}
              >
                <td className=" px-[20px] py-[10px]">
                  <div className="flex flex-row items-center gap-5">
                    <img
                      className="w-[50px] h-[50px] object-contain rounded-full"
                      src={supplier.profileImg}
                      alt=""
                    />
                    <div>
                      <p>{supplier.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-[20px] py-[10px]">
                  <div className="flex flex-col gap-5 h-full justify-center">
                    <div className="flex flex-col">
                      <p className="text-secondary-text font-semibold">
                        Telefono
                      </p>
                      <p className="text-primary-text font-medium">
                        {supplier.phone}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-[20px] py-[10px]">
                  <div className="flex flex-col gap-5 h-full justify-center">
                    <div className="flex flex-col">
                      <p className="text-secondary-text font-semibold">
                        Indirizzo
                      </p>
                      <p className="text-primary-text font-medium">{`${supplier.address}, ${supplier.city} ${supplier.cap} ${supplier.province}`}</p>
                    </div>
                  </div>
                </td>
                <td>
                  {isSelected(supplier.id) ? (
                    <SelectedIcon size={22} />
                  ) : (
                    <SelectIcon size={22} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SuppliersStep;
