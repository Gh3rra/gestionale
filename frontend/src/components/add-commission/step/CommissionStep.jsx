import React from "react";

function CommissionStep() {
  return (
    <div className="form-container">
      <div className="form-row">
        <div className="form-row-title-container">Descrizione</div>
        <div className="form-row-input-text">
          <div className="input-text-container">
            <label htmlFor="title">Titolo</label>
            <div className="form-input-container">
              <input id="title" type="text" className="form-input" />
            </div>
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-row-title-container">Luogo</div>
        <div className="form-row-input-text">
          <div className="input-text-container flex-2">
            <label htmlFor="title">Indirizzo</label>
            <div className="form-input-container">
              <input id="title" type="text" className="form-input" />
            </div>
          </div>
          <div className="input-text-container flex-1-5">
            <label htmlFor="title">Città</label>
            <div className="form-input-container">
              <input id="title" type="text" className="form-input" />
            </div>
          </div>
          <div className="input-text-container flex-0-5">
            <label htmlFor="title">CAP</label>
            <div className="form-input-container">
              <input id="title" type="text" className="form-input" />
            </div>
          </div>
          <div className="input-text-container flex-0-5">
            <label htmlFor="title">Provincia</label>
            <div className="form-input-container">
              <input id="title" type="text" className="form-input" />
            </div>
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-row-title-container">Date</div>
        <div className="form-row-input-text">
          <div className="input-text-container">
            <label htmlFor="title">Data Richiesta</label>
            <div className="form-input-container">
              <input id="title" type="text" className="form-input" />
            </div>
          </div>
          <div className="input-text-container">
            <label htmlFor="title">Data Inizio Lavori</label>
            <div className="form-input-container">
              <input id="title" type="text" className="form-input" />
            </div>
          </div>
          <div className="input-text-container">
            <label htmlFor="title">Data Fine Lavori</label>
            <div className="form-input-container">
              <input id="title" type="text" className="form-input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommissionStep;
