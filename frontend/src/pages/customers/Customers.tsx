import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  FilterSettingsIcon,
  SearchIcon,
  SelectedIcon,
  SelectIcon,
  UnselectedIcon,
} from "../../Icon";
import Fuse from "fuse.js";
import IconButton from "../../components/IconButton/IconButton";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import { CircularProgress } from "@mui/material";
import { formatAddress } from "../../common/utils";
import { useNavigate } from "react-router";
import { useCustomers } from "../../hooks/useCustomer";
import { Customer, isPrivateCustomer } from "../../types/customer";
import React from "react";
import MyButton from "../../components/Button/Button";
import FormDialog from "../add-customer/FormDialog";

const FilterType = [
  { customerType: null },
  { customerType: "private" },
  { customerType: "juridical" },
] as const;

function Customers() {
  const [resultList, setResultList] = useState<Customer[]>([]);
  const [listToSearch, setListToSearch] = useState<Customer[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const {
    data: customersList = [],
    isLoading,
    error,
    //refetch,
  } = useCustomers();
  useEffect(() => {
    if (customersList.length > 0) {
      setResultList(customersList);
      setListToSearch(customersList);
    }
  }, [customersList]);

  const fuse = useMemo(
    () =>
      new Fuse(listToSearch, {
        threshold: 0.4,

        keys: ["name", "surname", "cf", "ivaCode"],
      }),
    [listToSearch],
  );

  useEffect(() => {
    if (searchText === "") {
      setResultList(listToSearch);
    } else {
      const results = fuse.search(searchText).map((result) => result.item);
      setResultList(results);
    }
  }, [searchText, listToSearch, fuse]);

  const handleClick = useCallback((filterType: number) => {
    setSelectedType(filterType);
  }, []);

  const filterCustomersList = useCallback(() => {
    let filtered: Customer[];
    switch (selectedType) {
      case 0:
        filtered = customersList;
        break;
      case 1:
        filtered = customersList.filter(
          (customer) => customer.type === FilterType[selectedType].customerType,
        );
        break;
      case 2:
        filtered = customersList.filter(
          (customer) => customer.type === FilterType[selectedType].customerType,
        );
        break;
      default:
        filtered = customersList;
        break;
    }
    setListToSearch(filtered);
    setSelectedItems([]);
  }, [selectedType, customersList]);

  useEffect(() => {
    filterCustomersList();
  }, [filterCustomersList]);

  const handleSelectItems = useCallback((id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedItems(
      selectedItems.length !== 0 ? [] : resultList.map((value) => value.id),
    );
  }, [selectedItems.length, resultList]);

  const selectedAll = useMemo(
    () => selectedItems.length === resultList.length && resultList.length !== 0,

    [selectedItems.length, resultList.length],
  );

  const handleNavigateToDetail = useCallback(
    (id: number, type: string) => {
      navigate(`/customers/${id}/${type}`);
    },
    [navigate],
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [],
  );

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Errore: {error.message}</div>;

  return (
    <div className="mt-[84px] ml-[346px] w-full px-[60px] py-[40px]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2.5">
          <p className="!text-[30px] font-semibold">Elenco Clienti</p>
          <p>Visualizza tutte le informazioni sui tuoi clienti.</p>
        </div>
        <div>
          <MyButton variant="secondary" onClick={handleOpen}>
            Aggiungi Cliente
          </MyButton>
          {open && <FormDialog closeFn={handleClose} />}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <ToggleButton
          onButtonClick={handleClick}
          buttons={["Tutti", "Privato", "Giuridico"]}
          selectedButtonIndex={selectedType}
        />

        <div className="flex items-center gap-2.5">
          <div className="border-secondary-text relative flex h-[45px] w-[480px] items-center gap-[7px] rounded-[10px] border-[0.5px] px-[15px]">
            <SearchIcon className="text-secondary h-5 w-5 overflow-visible" />
            <input
              value={searchText}
              onChange={handleSearchChange}
              type="text"
              className="text-secondary-text h-full w-full border-none bg-transparent font-[Inter] !text-[17px] outline-none"
              placeholder="Cerca clienti"
            />
          </div>
          <IconButton>
            <FilterSettingsIcon size={20} />
          </IconButton>
        </div>

        <table className="border-fourtiary mt-[50px] w-full border-separate border-spacing-0 overflow-hidden rounded-[10px] border-1">
          <colgroup>
            <col style={{ minWidth: "auto" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr className="[&_th]:bg-hover [&_th]:text-secondary-text [&_th]:p-2.5 [&_th]:!pr-0 [&_th]:text-left [&_th]:align-middle [&_th]:font-normal">
              <th>
                <button
                  className="flex items-center justify-center border-none bg-transparent outline-none hover:cursor-pointer"
                  onClick={handleSelectAll}
                >
                  {selectedAll ? (
                    <SelectedIcon className="h-5 w-5" />
                  ) : selectedItems.length !== 0 ? (
                    <UnselectedIcon className="h-5 w-5" />
                  ) : (
                    <SelectIcon className="h-5 w-5" />
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
            {resultList &&
              resultList.map((value) => {
                return (
                  <CustomerRow
                    key={`${value.type}-${value.id}`}
                    customer={value}
                    isSelected={selectedItems.includes(value.id)}
                    onSelect={handleSelectItems}
                    onNavigate={handleNavigateToDetail}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface CustomerRowProps {
  customer: Customer;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onNavigate: (id: number, type: string) => void;
}

const CustomerRow = memo<CustomerRowProps>(
  ({ customer, isSelected, onSelect, onNavigate }) => (
    <tr className="hover:bg-hover [&_td]:text-primary-text [&_td]:border-t-fourtiary bg-white [&_td]:border-t-[1px] [&_td]:p-2.5 [&_td]:!pr-0 [&_td]:text-left [&_td]:font-normal">
      <td>
        <button
          onClick={() => onSelect(customer.id)}
          className="text-secondary-text flex items-center justify-center border-none bg-transparent outline-none hover:cursor-pointer"
        >
          {isSelected ? (
            <SelectedIcon className="h-5 w-5" />
          ) : (
            <SelectIcon className="h-5 w-5" />
          )}
        </button>
      </td>
      <td
        className="hover:cursor-pointer hover:!underline"
        onClick={() => onNavigate(customer.id, customer.type)}
      >
        <div className="flex items-center justify-start gap-[15px]">
          <img
            src={customer.profileImg}
            alt=""
            className="max-h-11 min-h-11 max-w-11 min-w-11 overflow-hidden rounded-full"
            loading="lazy"
          />
          <p className="overflow-ellipsis">
            {customer.name}{" "}
            {isPrivateCustomer(customer) ? customer.surname : ""}
          </p>
        </div>
      </td>
      <td>
        {formatAddress(
          customer.address,
          customer.city,
          customer.cap,
          customer.province,
        )}
      </td>
      <td>{customer.phone}</td>
      <td>0</td>
      <td>0 €</td>
    </tr>
  ),
);

export default Customers;
