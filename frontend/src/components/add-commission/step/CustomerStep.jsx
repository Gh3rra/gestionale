import React, { useEffect, useState } from "react";
import { NextArrowIcon } from "../../../Icon";
import Fuse from "fuse.js";
import { customers } from "../../../data";

function CustomerStep() {
  const [searchText, setSearchText] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [listToSearch, setListToSearch] = useState(customers);

  const fuse = new Fuse(listToSearch, {
    threshold: 0.4,
    keys: ["name", "surname"],
  });

  const search = () => {
    const newList = fuse.search(searchText).map((result) => result.item);
    if (searchText !== "") {
      setCustomerList(newList);
    } else {
      setCustomerList([]);
    }
  };

  useEffect(() => {
    console.log(customerList);
  }, [customerList]);

  useEffect(() => {
    search();
  }, [searchText,listToSearch]);

  const selectCustomer = (customer) => {
    setSelectedCustomer((prev) => {
      if (prev !== null && prev.id === customer.id) {
        setListToSearch([...listToSearch, customer]);
        return null;
      } else {
        setListToSearch(listToSearch.filter((e) => e.id !== customer.id));
        return customer;
      }
    });
  };

  return (
    <div className="form-container">
      <div className="form-row">
        <div className="form-row-input-search">
          <div className="input-text-container">
            <label htmlFor="title">Cliente</label>
            <div className="form-input-container">
              <div className="input-container">
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  id="title"
                  type="text"
                />
                <button className="search-button">
                  <NextArrowIcon size={30} />
                </button>
              </div>
              <button className="create-button">
                <p>Nuovo Cliente</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {(customerList.length != 0 || selectedCustomer !== null) && (
        <div className="results-container">
          <div className="scrollable-container">
            {selectedCustomer !== null && (
              <div
                className="item-container selected"
                onClick={() => {
                  selectCustomer(selectedCustomer);
                }}
              >
                <div className="profile-container">
                  <img
                    className="img-container"
                    src={selectedCustomer.profileImg}
                    alt=""
                  />
                  <div className="name-container">
                    <p> {selectedCustomer.name}</p>
                    <p> {selectedCustomer.phone}</p>
                  </div>
                </div>
                <div className="info-container">
                  <div className="info">
                    <p className="title">Indirizzo</p>
                    <p className="subtitle">{`${selectedCustomer.address}, ${selectedCustomer.city} ${selectedCustomer.cap} ${selectedCustomer.province}`}</p>
                  </div>
                  <div className="info">
                    <p className="title">Lavori Effettuati</p>
                    <p className="subtitle">{selectedCustomer.worksDone}</p>
                  </div>
                </div>
                <div className="selected-hover">
                  <p>SELEZIONATO</p>
                </div>
              </div>
            )}
            {customerList.map((customer, index) => (
              <div
                key={index}
                className={`item-container ${
                  selectedCustomer !== null &&
                  selectedCustomer.id === customer.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => {
                  selectCustomer(customer);
                }}
              >
                <div className="profile-container">
                  <img
                    className="img-container"
                    src={customer.profileImg}
                    alt=""
                  />
                  <div className="name-container">
                    <p> {customer.name}</p>
                    <p> {customer.phone}</p>
                  </div>
                </div>
                <div className="info-container">
                  <div className="info">
                    <p className="title">Indirizzo</p>
                    <p className="subtitle">{`${customer.address}, ${customer.city} ${customer.cap} ${customer.province}`}</p>
                  </div>
                  <div className="info">
                    <p className="title">Lavori Effettuati</p>
                    <p className="subtitle">{customer.worksDone}</p>
                  </div>
                </div>
                <div className="selected-hover">
                  <p>
                    {selectedCustomer !== null &&
                    customer.id === selectedCustomer.id
                      ? "SELEZIONATO"
                      : "SELEZIONA"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerStep;
