import { useEffect, useState } from "react";
import {
  FilterSettingsIcon,
  SearchIcon,
  SelectedIcon,
  SelectIcon,
  UnselectedIcon,
} from "../../../Icon";
import "../List.css";
import { commissions, customers } from "../../../data";
import { formatImport } from "../../../common/utils.js";
import Fuse from "fuse.js";
import { Link } from "react-router";

const FilterType = {
  NONE: null,
  INIZIALIZED: 0,
  COMPLETED: 1,
  TOCASHIN: 2,
};

const StateText = {
  0: "Inizializzata",
  1: "Terminata",
  2: "Da riscuotere",
};

function Commissions() {
  const [selectedType, setSelectedType] = useState(FilterType.NONE);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [commissionsList, setCommissionsList] = useState(commissions);
  const [listToSearch, setListToSearch] = useState(commissionsList);
  const [searchText, setSearchText] = useState("");

  const fuse = new Fuse(listToSearch, { threshold: 0.4, keys: ["title"] });

  const search = () => {
    var newList = fuse.search(searchText).map((result) => result.item);
    if (searchText !== "") {
      setCommissionsList(newList);
    } else {
      setCommissionsList(listToSearch);
    }
  };

  useEffect(() => {
    search();
  }, [searchText, listToSearch]);
  useEffect(() => {}, [searchText]);

  const handleClick = (filterType) => {
    setSelectedType(selectedType === filterType ? FilterType.NONE : filterType);
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length !== 0 ? [] : commissionsList.map((value) => value.id)
    );
  };

  useEffect(() => {
    if (selectedItems.length === commissionsList.length) {
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }
  }, [selectedItems]);

  const handleSelectItems = (id) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((value) => value !== id)
        : [...selectedItems, id]
    );
  };

  useEffect(() => {
    var newList = [];
    if (selectedType !== null) {
      newList = commissions.filter((e) => e.state === selectedType);
      setCommissionsList(newList);
    } else {
      newList = commissions;
      setCommissionsList(newList);
    }
    setListToSearch(newList);
    setSelectedItems([]);
  }, [selectedType]);

  return (
    <div className="body-container ">
      <div className="header">
        <div className="title-container">
          <p className="title">Elenco Commesse</p>
          <p className="subtitle">
            Visualizza tutte le informazioni sulle tue commesse.
          </p>
        </div>
        <div className="add-button-container">
          <Link to={"/add-commission"}>
            <button className="add-button">Aggiungi Commessa</button>
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="type-container">
          <button
            onClick={() => handleClick(FilterType.TOCASHIN)}
            className={`type-button ${
              selectedType === FilterType.TOCASHIN ? "active" : ""
            }`}
          >
            Commissioni da riscuotere
          </button>
          <button
            onClick={() => handleClick(FilterType.COMPLETED)}
            className={`type-button ${
              selectedType === FilterType.COMPLETED ? "active" : ""
            }`}
          >
            Commissioni terminate
          </button>
          <button
            onClick={() => handleClick(FilterType.INIZIALIZED)}
            className={`type-button ${
              selectedType === FilterType.INIZIALIZED ? "active" : ""
            }`}
          >
            Commissioni inizializzate
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
              placeholder="Cerca commesse"
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
              <th>Titolo</th>
              <th>Data</th>
              <th>Cliente</th>
              <th>Stato</th>
              <th>Totale Spese</th>
              <th>Totale Entrate</th>
            </tr>
          </thead>
          <tbody>
            {commissionsList.map((commission, index) => {
              var customer = customers.find(
                (e) => e.id === commission.customerId
              );
              return (
                <tr key={index}>
                  <td className="check-column">
                    <button
                      onClick={() => {
                        handleSelectItems(commission.id);
                      }}
                      className="check-button"
                    >
                      {selectedItems.length !== 0 &&
                      selectedItems.includes(commission.id) ? (
                        <SelectedIcon size={25} />
                      ) : (
                        <SelectIcon size={25} />
                      )}
                    </button>
                  </td>
                  <td className="primary-column">{commission.title}</td>
                  <td>{commission.dateRequest.toLocaleDateString()}</td>
                  <td>{`${customer.name} ${customer.surname || ""}`}</td>
                  <td>{StateText[commission.state]}</td>
                  <td>
                    {commission.totalExpenses !== 0
                      ? `${formatImport(commission.totalExpenses)} €`
                      : "-"}
                  </td>
                  <td>
                    {commission.totalIncomes !== 0
                      ? `${formatImport(commission.totalIncomes)} €`
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Commissions;
