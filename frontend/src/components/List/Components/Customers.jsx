import { useEffect, useState } from "react";
import {
  FilterSettingsIcon,
  SearchIcon,
  SelectedIcon,
  SelectIcon,
  UnselectedIcon,
} from "../../../Icon";
import "../List.css";
import { customers } from "../../../data";
import Fuse from "fuse.js";

const FilterType = {
  NONE: null,
  PRIVATE: 0,
  JURIDICAL: 1,
};

function Customers() {
  const [selectedType, setSelectedType] = useState(FilterType.NONE);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [customersList, setCustomersList] = useState(customers);
  const [listToSearch, setListToSearch] = useState(customers);
  const [searchText, setSearchText] = useState("");

  const fuse = new Fuse(listToSearch, {
    keys: ["name", "surname"],
  });

  const search = () => {
    const newList = fuse.search(searchText).map((result) => result.item);
    if (searchText === "") {
      console.log("ciao");

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
    var newCustomersList = [];
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
    <div className="body-container">
      <div className="header">
        <div className="title-container">
          <p className="title">Elenco Clienti</p>
          <p className="subtitle">
            Visualizza tutte le informazioni sui tuoi clienti.
          </p>
        </div>
        <div className="add-button-container"></div>
      </div>
      <div className="content">
        <div className="type-container">
          <button
            onClick={() => handleClick(FilterType.PRIVATE)}
            className={`type-button ${
              selectedType === FilterType.PRIVATE ? "active" : ""
            }`}
          >
            Privato
          </button>
          <button
            onClick={() => handleClick(FilterType.JURIDICAL)}
            className={`type-button ${
              selectedType === FilterType.JURIDICAL ? "active" : ""
            }`}
          >
            Giuridico
          </button>
        </div>
        <div className="filter-container">
          <div className="search-filter-container">
            <SearchIcon size={20} className="search-lens" />
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              type="text"
              className="search-filter"
              placeholder="Cerca clienti"
            />
          </div>
          <div className="filter-icon icon-container">
            <FilterSettingsIcon size={20} />
          </div>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <th className="check-header">
                <button
                  className="check-button"
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
                <tr key={index} className="customer-row">
                  <td className="check-column">
                    <button
                      onClick={() => {
                        handleSelectItems(value.id);
                      }}
                      className="check-button"
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
                    <div className="name-column">
                      <div className="profile-img-container">
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
