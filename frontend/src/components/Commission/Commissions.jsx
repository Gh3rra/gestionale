import { FilterSettingsIcon, SearchIcon } from "../../Icon";
import "./Commissions.css";

function Commissions() {
  return (
    <div className="body-container">
      <div className="header"></div>
      <div className="content">
        <div className="commissions-type-container">
          <button className="commissions-type-button active">
            Commissioni da riscuotere
          </button>
          <button className="commissions-type-button">
            Commissioni terminate
          </button>
          <button className="commissions-type-button">
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
          <div className="filter">
            <FilterSettingsIcon size={20} />
          </div>
        </div>
        <div className="commissions-list"></div>
      </div>
    </div>
  );
}

export default Commissions;
