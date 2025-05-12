import { useEffect, useState } from "react";
import MyTextField from "../../../components/TextField/TextField";
import MyAutocomplete, {
  Option,
} from "../../../components/Autocomplete/Autocomplete";
import MyDatePicker from "../../../components/Autocomplete copy/DatePicker";

function CommissionStep() {
  const [provinceList, setProvinceList] = useState<Option[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const fetchProvinceData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://axqvoqvbfjpaamphztgd.functions.supabase.co/province`,
        { method: "GET", headers: { accept: "application/json" } }
      );
      const data = (await response.json()) as Record<string, string>[];

      setProvinceList(data?.map((c) => ({ label: c.sigla, value: c.sigla })));
      //console.log(data);
    } catch (error) {
      console.error("Errore nel recupero dei dati della provincia:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProvinceData();
  }, []);

  // Effettuare la chiamata quando cambia la provincia
  const handleChange = () => {
    fetchProvinceData();
  };

  return (
    <div className="flex flex-col gap-[50px]  justify-start pr-5 mb-5">
      <div className="flex flex-1 flex-col w-full gap-5 justify-evenly">
        <div className="text-secondary-text font-semibold">Descrizione</div>
        <div className="flex flex-1 px-[15px] gap-5">
          <MyTextField
            name="title"
            labelText={"Titolo"}
            placeHolder={"Ringhiera in acciaio per Paolo Rossi"}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full gap-5 justify-evenly">
        <div className="text-secondary-text font-semibold">Luogo</div>
        <div className="flex flex-1 px-[15px] gap-5">
          <MyTextField
            name="address"
            labelText={"Indirizzo"}
            placeHolder={"Via Roma 12"}
          />
          <MyTextField
            name="city"
            width="200px"
            labelText={"Città"}
            placeHolder={"Milano"}
          />
          <MyTextField
            name={"cap"}
            width="150px"
            labelText={"CAP"}
            placeHolder={"81100"}
            onChange={(e) => {
              const val = e.target.value;
              e.target.value = val.replace(/[^\d]/g, "");
              if (e.target.value.length > 5) {
                e.target.value = e.target.value.slice(0, 5);
              }
            }}
          />
          <MyAutocomplete
            name={"province"}
            width="150px"
            labelText={"Provincia"}
            options={provinceList}
            onChange={handleChange}
            placeHolder={"MI"}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full gap-5 justify-evenly">
        <div className="text-secondary-text font-semibold">Date</div>
        <div className="flex flex-1 px-[15px] gap-5">
          <MyDatePicker name={"requestDate"} labelText="Data richiesta" />
          <MyDatePicker name={"startWorkDate"} labelText="Data Inizio Lavori" />
          <MyDatePicker name={"endWorkDate"} labelText="Data Fine Lavori" />
          {/*       <MyTextField
            name={"requestDate"}
            labelText={"Data Richiesta"}
            placeHolder={"01/02/2025"}
          />
 */}
          {/* <MyTextField name={"startDate"} labelText={"Data Inizio Lavori"} />
          <MyTextField name={"endDate"} labelText={"Data Fine Lavori"} /> */}
        </div>
      </div>
    </div>
  );
}

export default CommissionStep;
