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
import { supabase } from "../../supabase-client.js";
import Icon from "../../components/Icon/Icon.js";

interface GoodModel {
  title: string;
  quantity: number;
  unit_price: number;
  price: number;
}

interface SupplierModel {
  id: number;
  goods: GoodModel[];
}

interface CommissionModel {
  id: number;
  title: string;
  customer?: { name: string; surname?: string };
  suppliers?: SupplierModel[];
  state: number;
  address: string;
  city: string;
  cap: string;
  province: string;
  request_date: Date;
  start_work_date: string;
  end_work_date: string;
}
enum StateText {
  "Inizializzata",
  "Da riscuotere",
  "Terminata",
}
enum FilterType {
  INIZIALIZED = 0,
  TOCASHIN = 1,
  COMPLETED = 2,
}

function Commissions() {
  const [selectedType, setSelectedType] = useState<FilterType | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [commissions, setCommissions] = useState<CommissionModel[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const commissionsData = (
      await supabase
        .from("commissions")
        .select("*, private_customers(name,surname), juridical_customers(name)")
    ).data;
    console.log(commissionsData);

    setCommissions(
      commissionsData !== null
        ? commissionsData?.map((c) => {
            return {
              id: c.id,
              title: c.title,
              customer:
                c.private_customers.length > 0
                  ? {
                      name: c.private_customers[0].name,
                      surname: c.private_customers[0].surname,
                    }
                  : c.juridical_customers.length > 0
                  ? { name: c.juridical_customers[0].name }
                  : null,

              state: c.state,
              address: c.address,
              city: c.city,
              cap: c.cap,
              province: c.province,
              request_date: new Date(c.request_date),
              start_work_date: c.start_work_date,
              end_work_date: c.end_work_date,
            } as CommissionModel;
          })
        : null
    );

    //setCommissionsList(data);
    setLoading(false);
  };

  /*   const search = () => {
    const fuse = new Fuse(listToSearch!, { threshold: 0.4, keys: ["title"] });
    const newList = fuse.search(searchText).map((result) => result.item);
    if (searchText !== "") {
      setCommissionsList(newList);
    } else {
      setCommissionsList(listToSearch);
    }
  }; */

  const filteredCommissions = useMemo(() => {
    if (!commissions) return [];
    console.log(commissions);

    let newList = [...commissions];
    // 🟢 Applica il filtro per stato
    if (selectedType !== null) {
      newList = newList.filter((c) => c.state === selectedType);
    }

    // 🔍 Applica la ricerca con Fuse.js
    if (searchText.trim() !== "") {
      const fuse = new Fuse(newList, { keys: ["title"], threshold: 0.4 });
      newList = fuse.search(searchText).map((r) => r.item);
    }

    return newList;
  }, [selectedType, searchText, commissions]);

  const handleClick = (filterType: FilterType) => {
    setSelectedType(selectedType === filterType ? null : filterType);
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length !== 0
        ? []
        : filteredCommissions!.map((value) => value.id)
    );
  };

  useEffect(() => {
    if (filteredCommissions.length !== 0) {
      setSelectedAll(selectedItems.length === filteredCommissions.length);
    } else {
      setSelectedAll(false);
    }
  }, [selectedItems, filteredCommissions]);

  const handleSelectItems = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full mt-[84px] ml-[346px] py-[40px] px-[60px]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[30px] font-semibold">Elenco Commesse</p>
          <p>Visualizza tutte le informazioni sulle tue commesse.</p>
        </div>
        <div>
          <Link to={"/add-commission"}>
            <Button height={"40px"}>Aggiungi Commessa</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-5 py-5">
          {" "}
          <Button
            height={"40px"}
            onClick={() => handleClick(FilterType.INIZIALIZED)}
            active={selectedType === FilterType.INIZIALIZED}
          >
            {" "}
            Commissioni inizializzate
          </Button>
          <Button
            height={"40px"}
            onClick={() => handleClick(FilterType.TOCASHIN)}
            active={selectedType === FilterType.TOCASHIN}
          >
            {" "}
            Commissioni da riscuotere
          </Button>
          <Button
            height={"40px"}
            onClick={() => handleClick(FilterType.COMPLETED)}
            active={selectedType === FilterType.COMPLETED}
          >
            {" "}
            Commissioni terminate
          </Button>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center px-[15px] gap-[7px] border-[0.5px] border-secondary-text w-[480px] h-[45px] rounded-[10px]">
            <SearchIcon size={20} />
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              type="text"
              className="bg-transparent outline-none w-full h-full border-none text-secondary-text font-[Inter] !text-[17px]"
              placeholder="Cerca commesse"
            />
          </div>
          <Icon>
            <FilterSettingsIcon size={20} />
          </Icon>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="border-spacing-0 border-separate border-1 border-fourtiary w-full mt-[50px] rounded-[10px] overflow-hidden">
            <thead>
              <tr className="[&_th]:bg-hover [&_th]:align-middle [&_th]:text-left [&_th]:p-2.5 [&_th]:!pr-0 [&_th]:text-secondary-text [&_th]:font-normal">
                <th>
                  <button
                    className="flex justify-center border-none outline-none items-center bg-transparent hover:cursor-pointer"
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
              {filteredCommissions!.map((commission, index) => {
                return (
                  <tr
                    className="bg-white hover:bg-hover [&_td]:p-2.5 [&_td]:!pr-0 [&_td]:text-left [&_td]:text-primary-text [&_td]:font-normal [&_td]:border-t-[1px] [&_td]:border-t-fourtiary "
                    key={index}
                    onClick={() => {
                      handleSelectItems(commission.id);
                    }}
                  >
                    <td>
                      <button
                        onClick={() => {
                          handleSelectItems(commission.id);
                        }}
                        className="flex justify-center border-none outline-none items-center bg-transparent hover:cursor-pointer"
                      >
                        {selectedItems.length !== 0 &&
                        selectedItems.includes(commission.id) ? (
                          <SelectedIcon size={25} />
                        ) : (
                          <SelectIcon size={25} />
                        )}
                      </button>
                    </td>

                    <td>
                      <Link
                        to={`/commission-detail/${commission.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="!font-medium text-primary-text hover:!underline">
                          {commission.title}
                        </p>{" "}
                      </Link>
                    </td>

                    <td>{commission.request_date.toLocaleDateString()}</td>
                    <td>
                      {commission.customer !== null
                        ? `${commission.customer!.name} ${
                            commission.customer!.surname || ""
                          }`
                        : ""}
                    </td>

                    <td>{StateText[commission.state]}</td>
                    <td>
                      {formatAmount(0)} €
                      {/* {commission.totalExpenses !== 0
                        ? `${formatImport(commission.totalExpenses)} €`
                        : "-"} */}
                    </td>
                    <td>
                      {formatAmount(0)} €
                      {/* {commission.totalIncomes !== 0
                        ? `${formatImport(commission.totalIncomes)} €`
                        : "-"} */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Commissions;
