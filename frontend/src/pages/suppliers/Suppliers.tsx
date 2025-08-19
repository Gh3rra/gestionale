import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FilterSettingsIcon,
  SearchIcon,
  SelectedIcon,
  SelectIcon,
  UnselectedIcon,
} from "../../Icon";
import Fuse from "fuse.js";
import IconButton from "../../components/IconButton/IconButton";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import { useSuppliers } from "../../hooks/useSupplier";
import { Supplier } from "../../types/supplier";
import React from "react";

function Suppliers() {
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [resultList, setResultList] = useState<Supplier[]>([]);
  const [listToSearch, setListToSearch] = useState<Supplier[]>([]);

  const [searchText, setSearchText] = useState("");

  const {
    data: suppliersList = [],
    isLoading,
    error,
    refetch,
  } = useSuppliers();

  useEffect(() => {
    if (suppliersList.length > 0) {
      setResultList(suppliersList);
      setListToSearch(suppliersList);
    }
  }, [suppliersList]);

  const fuse = useMemo(
    () =>
      new Fuse(listToSearch, {
        threshold: 0.4,
        keys: ["name", "ivaCode"],
      }),
    [listToSearch],
  );

  const search = useCallback(() => {
    const newList = fuse.search(searchText).map((result) => result.item);
    if (searchText === "") {
      setResultList(listToSearch);
    } else {
      setResultList(newList);
    }
  }, [searchText, listToSearch, fuse]);

  useEffect(() => {
    search();
  }, [search]);

  const handleSelectItems = useCallback((id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  }, []);

  const selectedAll = useMemo(() => {
    return (
      selectedItems.length === resultList.length && resultList.length !== 0
    );
  }, [selectedItems, resultList]);

  const handleSelectAll = useCallback(() => {
    setSelectedItems(
      selectedItems.length !== 0 ? [] : resultList.map((value) => value.id),
    );
  }, [selectedItems.length, resultList]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [],
  );

  const handleNavigateToDetail = useCallback(
    (id: number) => {
      navigate(`/suppliers/${id}`);
    },
    [navigate],
  );
  if (isLoading) return <CircularProgress />;
  if (error) return <div>Errore: {error.message}</div>;
  if (suppliersList.length === 0)
    return (
      <div className="mt-[84px] ml-[346px] w-full px-[60px] py-[40px]">
        Nessun fornitore trovato.
      </div>
    );

  return (
    <div className="mt-[84px] ml-[346px] w-full px-[60px] py-[40px]">
      <div className="flex flex-col gap-2.5">
        <p className="!text-[30px] font-semibold">Elenco Fornitori</p>
        <p>Visualizza tutte le informazioni sui tuoi fornitori.</p>
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <div className="border-secondary-text relative flex h-[45px] w-[480px] items-center gap-[7px] rounded-[10px] border-[0.5px] px-[15px]">
          <SearchIcon className="text-secondary h-5 w-5 overflow-visible" />
          <input
            value={searchText}
            onChange={handleSearchChange}
            type="text"
            className="text-secondary-text h-full w-full border-none bg-transparent font-[Inter] !text-[17px] outline-none"
            placeholder="Cerca Fornitori"
          />
        </div>
        <IconButton>
          <FilterSettingsIcon size={20} />
        </IconButton>
      </div>

      <table className="border-fourtiary mt-[50px] w-full border-separate border-spacing-0 overflow-hidden rounded-[10px] border-1">
        <colgroup>
          <col style={{ minWidth: "auto" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "35%" }} />
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
            <th>Fornitore</th>
            <th>Indirizzo</th>
            <th>Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {resultList.map((value) => {
            return (
              <tr
                className="hover:bg-hover [&_td]:text-primary-text [&_td]:border-t-fourtiary bg-white [&_td]:border-t-[1px] [&_td]:p-2.5 [&_td]:pr-0 [&_td]:text-left [&_td]:font-normal"
                key={value.id}
              >
                <td>
                  <button
                    onClick={() => handleSelectItems(value.id)}
                    className="flex items-center justify-center border-none bg-transparent outline-none hover:cursor-pointer"
                  >
                    {selectedItems.includes(value.id) ? (
                      <SelectedIcon className="text-secondary-text h-5 w-5" />
                    ) : (
                      <SelectIcon className="text-secondary-text h-5 w-5" />
                    )}
                  </button>
                </td>
                <td
                  className="hover:cursor-pointer hover:[&_p]:!underline"
                  onClick={() => handleNavigateToDetail(value.id)}
                >
                  <div className="flex items-center justify-start gap-[15px]">
                    <img
                      loading="lazy"
                      src={value.profileImg}
                      alt=""
                      className="max-h-11 min-h-11 max-w-11 min-w-11 overflow-hidden rounded-full"
                    />

                    <p> {value.name}</p>
                  </div>
                </td>
                <td>
                  {value.address}, {value.city} {value.cap} {value.province}
                </td>
                <td>{value.phone}</td>
                <td className="!pr-5">{value.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;
