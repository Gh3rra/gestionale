import { useEffect, useMemo, useState } from "react";
import {
  FilterSettingsIcon,
  SearchIcon,
  SelectedIcon,
  SelectIcon,
  UnselectedIcon,
} from "../../Icon.js";
import { formatAmount } from "../../common/utils.js";
import Fuse from "fuse.js";
import { Link } from "react-router";
import Button from "../../components/Button/Button.js";
import IconButton from "../../components/IconButton/IconButton.js";
import FormDialog from "../add-commission/FormDialog.js";
import { useCommissions } from "../../hooks/useCommission.js";
import { Commission } from "../../types/commission.js";
import React from "react";

function Commissions() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [resultList, setResultList] = useState<Commission[]>([]);
  const [listToSearch, setListToSearch] = useState<Commission[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { data: commissionsList = [], isLoading, error } = useCommissions();

  useEffect(() => {
    if (commissionsList.length > 0) {
      setResultList(commissionsList);
      setListToSearch(commissionsList);
    }
  }, [commissionsList]);

  const fuse = useMemo(
    () =>
      new Fuse(listToSearch, {
        threshold: 0.4,
        keys: ["title"],
      }),
    [listToSearch],
  );

  useEffect(() => {
    if (searchText === "") {
      setResultList(listToSearch);
    } else {
      const result = fuse.search(searchText).map((item) => item.item);
      setResultList(result);
    }
  }, [searchText, listToSearch, fuse]);

  const selectedAll = useMemo(
    () => selectedItems.length === resultList.length && resultList.length !== 0,

    [selectedItems.length, resultList.length],
  );

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length !== 0 ? [] : resultList.map((value) => value.id),
    );
  };

  const handleSelectItems = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!commissionsList || commissionsList.length === 0)
    return <div>Nessuna commessa trovata</div>;

  return (
    <div className="mt-[84px] ml-[346px] w-full px-[60px] py-[40px]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[30px] font-semibold">Elenco Commesse</p>
          <p>Visualizza tutte le informazioni sulle tue commesse.</p>
        </div>
        <div>
          <Button variant="secondary" onClick={handleOpen}>
            Aggiungi Commessa
          </Button>
          {open && <FormDialog closeFn={handleClose} />}
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="flex items-center gap-2.5">
          <div className="border-secondary-text relative flex h-[45px] w-[480px] items-center gap-[7px] rounded-[10px] border-[0.5px] px-[15px]">
            <SearchIcon className="text-secondary h-5 w-5 overflow-visible" />
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              type="text"
              className="text-secondary-text h-full w-full border-none bg-transparent font-[Inter] !text-[17px] outline-none"
              placeholder="Cerca commesse"
            />
          </div>
          <IconButton>
            <FilterSettingsIcon size={20} />
          </IconButton>
        </div>

        <table className="border-fourtiary mt-[50px] w-full border-separate border-spacing-0 overflow-hidden rounded-[10px] border-1">
          <thead>
            <tr className="[&_th]:bg-hover [&_th]:text-secondary-text [&_th]:p-2.5 [&_th]:!pr-0 [&_th]:text-left [&_th]:align-middle [&_th]:font-normal">
              <th>
                <button
                  className="flex items-center justify-center border-none bg-transparent outline-none hover:cursor-pointer"
                  onClick={() => handleSelectAll()}
                >
                  {selectedAll ? (
                    <SelectedIcon className={"h-5 w-5"} />
                  ) : selectedItems.length !== 0 ? (
                    <UnselectedIcon className={"h-5 w-5"} />
                  ) : (
                    <SelectIcon className={"h-5 w-5"} />
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
            {resultList.map((commission, index) => {
              return (
                <tr
                  className="hover:bg-hover [&_td]:text-primary-text [&_td]:border-t-fourtiary bg-white [&_td]:border-t-[1px] [&_td]:p-2.5 [&_td]:!pr-0 [&_td]:text-left [&_td]:font-normal"
                  key={index}
                >
                  <td>
                    <button
                      onClick={() => {
                        handleSelectItems(commission.id);
                      }}
                      className="text-secondary-text flex items-center justify-center border-none bg-transparent outline-none hover:cursor-pointer"
                    >
                      {selectedItems.length !== 0 &&
                      selectedItems.includes(commission.id) ? (
                        <SelectedIcon className={"h-5 w-5"} />
                      ) : (
                        <SelectIcon className={"h-5 w-5"} />
                      )}
                    </button>
                  </td>

                  <td>
                    <Link
                      to={`/commissions/${commission.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-primary-text !font-medium hover:!underline">
                        {commission.title}
                      </p>{" "}
                    </Link>
                  </td>

                  <td>{commission.requestDate.toLocaleDateString("it-IT")}</td>
                  <td>
                    {commission.customer !== null
                      ? `${commission.customer!.name} ${
                          commission.customer!.type === "private"
                            ? commission.customer!.surname
                            : ""
                        }`
                      : ""}
                  </td>

                  <td>-</td>
                  <td>
                    {formatAmount(0)} €
                  
                  </td>
                  <td>
                    {formatAmount(0)} €
                    
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
