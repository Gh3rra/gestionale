import { useEffect, useState } from "react";
import {
  FilterSettingsIcon,
  SearchIcon,
  SelectedIcon,
  SelectIcon,
  UnselectedIcon,
} from "../../../Icon";
import "../List.css";
import { suppliers } from "../../../data";

function Suppliers() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [suppliersList] = useState(suppliers);

  const handleSelectItems = (id) => {
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
    <div className="body-container suppliers-page">
      <div className="header">
        <div className="title-container">
          <p className="title">Elenco Fornitori</p>
          <p className="subtitle">
            Visualizza tutte le informazioni sui tuoi fornitori.
          </p>
        </div>
        <div className="add-button-container"></div>
      </div>
      <div className="content">
        <div className="filter-container">
          <div className="search-filter-container">
            <SearchIcon size={20} className="search-lens" />
            <input
              type="text"
              className="search-filter"
              placeholder="Cerca clienti"
            />
          </div>
          <div className="filter-icon">
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
              <th>Fornitore</th>
              <th>Indirizzo</th>
              <th>Telefono</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {suppliersList.map((value, index) => {
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
    </div>
  );
}

export default Suppliers;
