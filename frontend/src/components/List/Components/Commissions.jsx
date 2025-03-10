import { useState } from "react";
import { FilterSettingsIcon, SearchIcon } from "../../../Icon";
import "../List.css";

const FilterType = {
  NONE: null,
  INIZIALIZED: "initialized",
  COMPLETED: "completed",
  CASHIN: "cashin",
};

function Commissions() {
  const [selectedType, setSelectedType] = useState(FilterType.NONE);

  const handleClick = (filterType) => {
    setSelectedType(selectedType === filterType ? FilterType.NONE : filterType);
  };
  return (
    <div className="body-container">
      <div className="header">
        <div className="title-container">
          <p className="title">Elenco Commesse</p>
          <p className="subtitle">
            Visualizza tutte le informazioni sulle tue commesse.
          </p>
        </div>
        <div className="add-button-container"></div>
      </div>
      <div className="content">
        <div className="type-container">
          <button
            onClick={() => handleClick(FilterType.CASHIN)}
            className={`type-button ${
              selectedType === FilterType.CASHIN ? "active" : ""
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
              type="text"
              className="search-filter"
              placeholder="Cerca commesse"
            />
          </div>
          <div className="filter-icon icon-container">
            <FilterSettingsIcon size={20} />
          </div>
        </div>
        <div className="list-table"></div>
      </div>
    </div>
  );
}

export default Commissions;
