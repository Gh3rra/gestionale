import { useEffect, useState } from "react";
import {
  DeleteIcon,
  DropDownArrowIcon,
  OtherExpensesIcon,
  TravelExpensesIcon,
  WorkExpensesIcon,
} from "../../../Icon";
import Button from "../../../components/Button/Button";
import { useFieldArray, useFormContext } from "react-hook-form";
import MyTextField from "../../../components/TextField/TextField";
import { checkValueDecimal } from "../../../common/utils";

function ExpensesStep() {
  return (
    <div className="flex flex-col gap-5 h-full max-h-full justify-start  pr-5 mb-5">
      <p className="form-title">Spese</p>
      <WorkExpensesAccordion />
      <TravelExpensesAccordion />
      <OtherExpensesAccordion />
    </div>
  );
}

function WorkExpensesAccordion() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `workExpenses`,
    control,
  });
  const [opened, setOpened] = useState<boolean>(false);

  const handleOpen = () => {
    setOpened((prev) => !prev);
  };
  return (
    <div className="accordion-container">
      <div className="header-container" onClick={handleOpen}>
        <div className="info-container">
          <WorkExpensesIcon />
          <p>LAVORO</p>
        </div>
        <div className="button-container">
          <DropDownArrowIcon
            size={40}
            style={{ transition: "all 0.3s ease" }}
            className={opened ? "rotate-180" : ""}
          />
        </div>
      </div>{" "}
      <div className={`fullWidth ${opened ? "open" : "closed"}`}>
        <div style={{ overflow: "hidden" }}>
          <div className="goods-body-container">
            {fields.map((_, i) => (
              <WorkExpensesInput key={_.id} fieldIndex={i} remove={remove} />
            ))}

            <div className="buttons-container">
              <Button
                onClick={() => {
                  append({
                    worker: "",
                    workHours: "",
                    costPerHour: "",
                    total: "",
                  });
                }}
                height={"40px"}
              >
                Aggiungi Dipendente
              </Button>
              <Button height={"40px"}>Carica fattura/e</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkExpensesInput({
  fieldIndex,
  remove,
}: {
  fieldIndex: number;
  remove: (index?: number | number[]) => void;
}) {
  const { setValue, getValues } = useFormContext();

  const [workHours, setWorkHours] = useState<number | undefined>(undefined);
  const [costPerHour, setCostPerHour] = useState<number | undefined>(undefined);

  useEffect(() => {
    const currentCostPerHour = getValues(
      `workExpenses.${fieldIndex}.costPerHour`
    );
    const currentWorkHours = getValues(`workExpenses.${fieldIndex}.workHours`);

    if (currentWorkHours !== "") {
      setWorkHours(currentWorkHours);
    }
    if (currentCostPerHour !== "") {
      setCostPerHour(currentCostPerHour);
    }
    if (workHours !== undefined && costPerHour !== undefined) {
      const sum = workHours * costPerHour;

      setValue(
        `workExpenses.${fieldIndex}.total`,
        checkValueDecimal(sum.toString())
      );
    }
  }, [workHours, costPerHour]);
  return (
    <div className="goods-input-text-container">
      <MyTextField
        className="!mt-[10px]"
        labelText="Dipendente"
        name={`workExpenses.${fieldIndex}.worker`}
      />
      <MyTextField
        className="!mt-[10px]"
        name={`workExpenses.${fieldIndex}.workHours`}
        labelText="Ore di lavoro"
        currency="€"
        onChange={(e) => {
          setWorkHours(Number(e.target.value.replace(",", ".")));
        }}
        datatype="number"
      />
      <MyTextField
        className="!mt-[10px]"
        name={`workExpenses.${fieldIndex}.costPerHour`}
        labelText="Costo orario"
        currency="€/h"
        onChange={(e) => {
          setCostPerHour(Number(e.target.value.replace(",", ".")));
        }}
        datatype="decimal"
      />
      <MyTextField
        className="!mt-[10px]"
        name={`workExpenses.${fieldIndex}.total`}
        labelText="Totale"
        currency="€"
        datatype="decimal"
      />

      <div className="flexRow justifyCenter alignEnd">
        <Button
          onClick={() => {
            remove(fieldIndex);
          }}
        >
          {" "}
          <DeleteIcon size={37} />
        </Button>
      </div>
    </div>
  );
}

function TravelExpensesAccordion() {
  const [opened, setOpened] = useState<boolean>(false);

  const handleOpen = () => {
    setOpened((prev) => !prev);
  };
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `travelExpenses`,
    control,
  });

  return (
    <div className="accordion-container">
      <div className="header-container" onClick={handleOpen}>
        <div className="info-container">
          <TravelExpensesIcon />
          <p>VIAGGIO</p>
        </div>
        <div className="button-container">
          <DropDownArrowIcon
            size={40}
            style={{ transition: "all 0.3s ease" }}
            className={opened ? "rotate-180" : ""}
          />
        </div>
      </div>{" "}
      <div className={`fullWidth ${opened ? "open" : "closed"}`}>
        <div style={{ overflow: "hidden" }}>
          <div className="goods-body-container">
            {fields.map((_, i) => (
              <div key={_.id} className="goods-input-text-container">
                <MyTextField
                  className="!mt-[10px]"
                  labelText="Titolo"
                  name={`travelExpenses.${i}.title`}
                />
                <MyTextField
                  className="!mt-[10px]"
                  name={`travelExpenses.${i}.amount`}
                  labelText="Importo"
                  currency="€"
                  datatype="decimal"
                />

                <div className="flexRow justifyCenter alignEnd">
                  <Button
                    onClick={() => {
                      remove(i);
                    }}
                  >
                    {" "}
                    <DeleteIcon size={37} />
                  </Button>
                </div>
              </div>
            ))}
            <div className="buttons-container">
              <Button
                onClick={() => {
                  append({ title: "", amount: "" });
                }}
                height={"40px"}
              >
                Aggiungi Spesa
              </Button>
              <Button height={"40px"}>Carica fattura/e</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OtherExpensesAccordion() {
  const [opened, setOpened] = useState<boolean>(false);

  const handleOpen = () => {
    setOpened((prev) => !prev);
  };
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `otherExpenses`,
    control,
  });
  return (
    <div className="accordion-container">
      <div className="header-container" onClick={handleOpen}>
        <div className="info-container">
          <OtherExpensesIcon size={30} />
          <p>ALTRO</p>
        </div>
        <div className="button-container">
          <DropDownArrowIcon
            size={40}
            style={{ transition: "all 0.3s ease" }}
            className={opened ? "rotate-180" : ""}
          />
        </div>
      </div>{" "}
      <div className={`fullWidth ${opened ? "open" : "closed"}`}>
        <div style={{ overflow: "hidden" }}>
          <div className="goods-body-container">
            {fields.map((_, i) => (
              <div key={_.id} className="goods-input-text-container">
                <MyTextField
                  className="!mt-[10px]"
                  labelText="Titolo"
                  name={`otherExpenses.${i}.title`}
                />
                <MyTextField
                  className="!mt-[10px]"
                  name={`otherExpenses.${i}.amount`}
                  labelText="Importo"
                  currency="€"
                  datatype="decimal"
                />

                <div className="flexRow justifyCenter alignEnd">
                  <Button
                    onClick={() => {
                      remove(i);
                    }}
                  >
                    {" "}
                    <DeleteIcon size={37} />
                  </Button>
                </div>
              </div>
            ))}
            <div className="buttons-container">
              <Button
                onClick={() => {
                  append({ title: "", amount: "" });
                }}
                height={"40px"}
              >
                Aggiungi Spesa
              </Button>{" "}
              <Button height={"40px"}>Carica fattura/e</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensesStep;
