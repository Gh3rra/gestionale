import { useState } from "react";
import { NextArrowIcon, SelectedIcon, SelectIcon } from "../../../Icon.tsx";
import { customers } from "../../../data";
import Button from "../../../components/Button/Button";
import Fuse from "fuse.js";
import { useFormContext } from "react-hook-form";

function CustomerStep() {
  const [resultList, setResultList] = useState(customers);
  const [searchText, setSearchText] = useState("");
  const { setValue, watch } = useFormContext();
  const selectedCustomer = watch("customer");

  const isSelected = (customerId: number, type: number) => {
    if (!selectedCustomer) {
      return false;
    }
    return selectedCustomer.id === customerId && selectedCustomer.type === type;
  };

  const search = (newText: string) => {
    const fuse = new Fuse(customers, {
      threshold: 0.3,
      useExtendedSearch: true,
      keys: ["name", "surname"],
    });

    setSearchText(newText);
    const newList = fuse
      .search(newText.replace(" ", "|"))
      .map((result) => result.item);
    if (newText !== "") {
      setResultList(newList);
    } else {
      setResultList(customers);
    }
  };

  const selectCustomer = (customerId: number, type: number) => {
    const updated =
      selectedCustomer &&
      selectedCustomer.id === customerId &&
      selectedCustomer.type === type
        ? undefined
        : { id: customerId, type };

    setValue("customer", updated);
  };

  return (
    <div className="flex flex-col w-full h-full gap-5 justify-evenly">
      <div className="flex flex-col w-full gap-5 justify-evenly">
        <div className="flex flex-col items-start justify-center gap-[10px] h-full w-full">
          <label htmlFor="title">Cliente</label>
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
            <Button height={"100%"}>Nuovo Cliente</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full overflow-y-scroll mb-[20px] custom-scrollbar">
        {" "}
        <table className="mr-5 border-spacing-0 border-separate rounded-[10px] border-1 border-fourtiary bg-white overflow-hidden">
          <tbody>
            {resultList.map((customer, index) => (
              <tr
                key={index}
                className={`w-full max-h-[80px] first:[&_td]:border-none  [&_td]:border-t-[1px] [&_td]:border-t-fourtiary hover:bg-hover  ${
                  isSelected(customer.id, customer.type) ? "bg-hover" : ""
                }`}
                onClick={() => {
                  selectCustomer(customer.id, customer.type);
                }}
              >
                <td className=" px-[20px] py-[10px]">
                  <div className="flex flex-row items-center gap-5">
                    <img
                      className="w-[50px] h-[50px] object-contain rounded-full"
                      src={customer.profileImg}
                      alt=""
                    />
                    <div>
                      <p>
                        {" "}
                        {customer.name} {customer.surname || ""}{" "}
                      </p>
                      <p> {customer.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-[20px] py-[10px]">
                  <div className="flex flex-col gap-5 h-full justify-center">
                    <div className="flex flex-col">
                      <p className="text-secondary-text font-semibold">
                        Indirizzo
                      </p>
                      <p className="text-primary-text font-medium">{`${customer.address}, ${customer.city} ${customer.cap} ${customer.province}`}</p>
                    </div>
                  </div>
                </td>
                <td className="px-[20px] py-[10px]">
                  <div className="flex flex-col gap-5 h-full justify-center">
                    <div className="flex flex-col">
                      <p className="text-secondary-text font-semibold">
                        Lavori Effettuati
                      </p>
                      <p className="text-primary-text font-medium">
                        {customer.worksDone}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-[20px] py-[10px]">
                  {isSelected(customer.id, customer.type) ? (
                    <SelectedIcon size={22} />
                  ) : (
                    <SelectIcon size={22} />
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerStep;
