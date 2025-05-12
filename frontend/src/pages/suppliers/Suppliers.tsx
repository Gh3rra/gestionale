import { useEffect, useState } from "react";
import {
  FilterSettingsIcon,
  SearchIcon,
  SelectedIcon,
  SelectIcon,
  UnselectedIcon,
} from "../../Icon";
import { suppliers } from "../../data";
import Fuse from "fuse.js";
import Icon from "../../components/Icon/Icon";

function Suppliers() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [suppliersList, setSuppliersList] = useState(suppliers);
  const [listToSearch] = useState(suppliersList);
  const [searchText, setSearchText] = useState("");

  const fuse = new Fuse(listToSearch, {
    threshold: 0.4,
    keys: ["name"],
  });

  const search = () => {
    const newList = fuse.search(searchText).map((result) => result.item);
    if (searchText === "") {
      setSuppliersList(listToSearch);
    } else {
      setSuppliersList(newList);
    }
  };

  useEffect(() => {
    search();
  }, [searchText]);

  const handleSelectItems = (id: number) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((value) => value !== id)
        : [...selectedItems, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length !== 0 ? [] : suppliersList.map((value) => value.id)
    );
  };

  useEffect(() => {
    if (selectedItems.length === suppliersList.length) {
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }
  }, [selectedItems]);

  return (
    <div className="w-full mt-[84px] ml-[346px] py-[40px] px-[60px]">
      <div className="flex justify-between">
        <div className="flex gap-2.5">
          <p className="font-semibold !text-[30px]">Elenco Fornitori</p>
          <p>Visualizza tutte le informazioni sui tuoi fornitori.</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="relative w-[480px] h-[45px] rounded-[10px] flex items-center px-[15px] gap-[7px] border-[0.5px] border-secondary-text">
          <SearchIcon size={20} />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="bg-transparent w-full h-full border-none text-secondary-text !text-[17px] outline-none font-[Inter]"
            placeholder="Cerca Fornitori"
          />
        </div>
        <Icon>
          <FilterSettingsIcon size={20} />
        </Icon>
      </div>
      <table className="border-spacing-0 border-separate border-1 border-fourtiary w-full mt-[50px] rounded-[10px] overflow-hidden">
        <thead>
          <tr className="[&_th]:bg-hover [&_th]:align-middle [&_th]:text-left [&_th]:p-2.5 [&_th]:!pr-0 [&_th]:text-secondary-text [&_th]:font-normal">
            <th>
              <button
                className="flex justify-center border-none outline-none items-center bg-transparent hover:cursor-pointer"
                onClick={() => handleSelectAll()}
              >
                {selectedAll ? (
                  <SelectedIcon size={25} />
                ) : selectedItems.length !== 0 ? (
                  <UnselectedIcon size={25} />
                ) : (
                  <SelectIcon size={25} />
                )}
              </button>
            </th>
            <th>Fornitore</th>
            <th>Indirizzo</th>
            <th>Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {suppliersList.map((value, index) => {
            return (
              <tr
                className="bg-white hover:bg-hover [&_td]:p-2.5 [&_td]:!pr-0 [&_td]:text-left [&_td]:text-primary-text [&_td]:font-normal [&_td]:border-t-[1px] [&_td]:border-t-fourtiary "
                key={index}
              >
                <td>
                  <button
                    onClick={() => {
                      handleSelectItems(value.id);
                    }}
                    className="flex justify-center border-none outline-none items-center bg-transparent hover:cursor-pointer"
                  >
                    {selectedItems.length !== 0 &&
                    selectedItems.includes(value.id) ? (
                      <SelectedIcon size={25} />
                    ) : (
                      <SelectIcon size={25} />
                    )}
                  </button>
                </td>
                <td>
                  <div className="flex justify-start items-center gap-[15px]">
                    <div className="flex justify-center items-center rounded-full w-[45px] h-[45px] overflow-hidden border-1 border-fourtiary">
                      <img src={value.profileImg} alt="" />
                    </div>
                    <p> {value.name}</p>
                  </div>
                </td>
                <td>
                  {value.address}, {value.city} {value.cap} {value.province}
                </td>
                <td>{value.phone}</td>
                <td>{value.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;
