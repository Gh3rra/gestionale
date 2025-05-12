import { useEffect, useState } from "react";
import {
  FilterSettingsIcon,
  SearchIcon,
  SelectedIcon,
  SelectIcon,
  UnselectedIcon,
} from "../../Icon";
import { customers } from "../../data";
import Fuse from "fuse.js";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import { supabase } from "../../supabase-client";

const FilterType = {
  NONE: null,
  PRIVATE: 0,
  JURIDICAL: 1,
};

interface PrivateCustomer {
  id: number;
  name: string;
  surname: string;
  cf: string;
  gender: string;
  address: string;
  cap: string;
  city: string;
  province: string;
  email: string;
  pec: string;
  phone: string;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
  totalAmount?: number;
  totalWorks?: number;
}

const mapPrivateCustomer = (row: any): PrivateCustomer => ({
  id: row.id,
  name: row.name,
  surname: row.surname,
  cf: row.cf,
  gender: row.gender,
  address: row.address,
  cap: row.cap,
  city: row.city,
  province: row.province,
  email: row.email,
  pec: row.pec,
  phone: row.phone,
  profileImg: row.profile_img,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

interface JuridicalCustomer {
  id: number;
  name: string;
  ivaCode: string;
  address: string;
  cap: string;
  city: string;
  province: string;
  email: string;
  pec: string;
  phone: string;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
  totalAmount?: number;
  totalWorks?: number;
}

const mapJuridicalCustomer = (row: any): JuridicalCustomer => ({
  id: row.id,
  name: row.name,
  ivaCode: row.iva_code,
  address: row.address,
  cap: row.cap,
  city: row.city,
  province: row.province,
  email: row.email,
  pec: row.pec,
  phone: row.phone,
  profileImg: row.profile_img,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

function Customers() {
  const [selectedType, setSelectedType] = useState(FilterType.NONE);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [customersList, setCustomersList] = useState(customers);
  const [listToSearch, setListToSearch] = useState(customers);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [privateData, juridicalData] = await Promise.all([
      await supabase.from("private_customers").select("*"),
      await supabase.from("juridical_customers").select("*"),
    ]);

    if (privateData.error) {
      console.log("Database error", privateData.error);
    }
    if (juridicalData.error) {
      console.log("Database error", juridicalData.error);
    }

    if (privateData.data) {
      privateData.data.map(mapPrivateCustomer);
    }
    if (juridicalData.data) {
      juridicalData.data.map(mapPrivateCustomer);
    }
    console.log(privateData);
    console.log(juridicalData);
  };

  const fuse = new Fuse(listToSearch, {
    threshold: 0.4,

    keys: ["name", "surname"],
  });

  const search = () => {
    const newList = fuse.search(searchText).map((result) => result.item);
    if (searchText === "") {
      setCustomersList(listToSearch);
    } else {
      setCustomersList(newList);
    }
  };

  useEffect(() => {
    search();
  }, [searchText, listToSearch]);

  const handleClick = (filterType) => {
    setSelectedType(selectedType === filterType ? FilterType.NONE : filterType);
  };

  useEffect(() => {
    filterCustomersList();
  }, [selectedType]);

  const filterCustomersList = () => {
    let newCustomersList = [];
    if (selectedType === FilterType.PRIVATE) {
      newCustomersList = customers.filter((customer) => customer.type === 0);
      setCustomersList(newCustomersList);
    } else if (selectedType === FilterType.JURIDICAL) {
      newCustomersList = customers.filter((customer) => customer.type === 1);
      setCustomersList(newCustomersList);
    } else {
      newCustomersList = customers;
      setCustomersList(newCustomersList);
    }
    setListToSearch(newCustomersList);
    setSelectedItems([]);
  };

  const handleSelectItems = (id) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((value) => value !== id)
        : [...selectedItems, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length !== 0 ? [] : customersList.map((value) => value.id)
    );
  };

  useEffect(() => {
    if (selectedItems.length === customersList.length) {
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }
  }, [selectedItems]);

  return (
    <div className="w-full mt-[84px] ml-[346px] py-[40px] px-[60px]">
      <div className="flex justify-between">
        <div className="flex gap-2.5">
          <p className="font-semibold !text-[30px]">Elenco Clienti</p>
          <p>Visualizza tutte le informazioni sui tuoi clienti.</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-5 py-5">
          <Button
            height={"40px"}
            onClick={() => handleClick(FilterType.PRIVATE)}
          >
            Privato
          </Button>
          <Button
            height={"40px"}
            onClick={() => handleClick(FilterType.JURIDICAL)}
          >
            Giuridico
          </Button>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="relative w-[480px] h-[45px] rounded-[10px] flex items-center px-[15px] gap-[7px] border-[0.5px] border-secondary-text">
            <SearchIcon size={20} />
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              type="text"
              className="bg-transparent w-full h-full border-none text-secondary-text !text-[17px] outline-none font-[Inter]"
              placeholder="Cerca clienti"
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
              <th>Cliente</th>
              <th>Indirizzo</th>
              <th>Telefono</th>
              <th>Lavori effettuati</th>
              <th>Totale importo lavori</th>
            </tr>
          </thead>
          <tbody>
            {customersList.map((value, index) => {
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
                      <p>
                        {" "}
                        {value.name} {value.surname}
                      </p>
                    </div>
                  </td>
                  <td>
                    {value.address}, {value.city} {value.cap} {value.province}
                  </td>
                  <td>{value.phone}</td>
                  <td>{value.worksDone}</td>
                  <td>{value.totalValueWorks} €</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
