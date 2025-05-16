import React, { useEffect } from "react";
import Button from "../../components/Button/Button";
import * as XLSX from "xlsx";
import axios from "axios";

type TablesCount = {
  commission: boolean;
  commissionDiscounts: boolean;
  commissionIncomes: boolean;
  commissionJuridicalCustomer: boolean;
  commissionOtherExpenses: boolean;
  commissionPrivateCustomer: boolean;
  commissionTravelExpenses: boolean;
  commissionWorkerExpenses: boolean;
  ddt: boolean;
  item: boolean;
  itemCategories: boolean;
  itemSubCategories: boolean;
  itemTypes: boolean;
  juridicalCustomer: boolean;
  paymentMethods: boolean;
  paymentTerms: boolean;
  privateCustomer: boolean;
  purchase: boolean;
  purchaseDiscounts: boolean;
  purchaseInvoice: boolean;
  purchaseItem: boolean;
  state: boolean;
  supplier: boolean;
  unitMeasures: boolean;
  user: boolean;
  worker: boolean;
};

function AdminPanel() {
  const [insertLoading, setInsertLoading] = React.useState(false);
  const [tables, setTables] = React.useState<TablesCount | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/admin", {
        withCredentials: true,
      });
      if (res.status === 201) {
        setTables(res.data.result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleSendMeasuresExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/measures",
            {
              measures: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleSendPaymentModeExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/payment-mode",
            {
              paymentMethods: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleSendPaymentTermsExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/payment-terms",
            {
              paymentTerms: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleWorkersExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/worker",
            {
              workers: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleStatesExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/states",
            {
              states: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");
          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleSupplierExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/supplier",
            {
              suppliers: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleItemAndCategoriesExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });

          const categoryName = workbook.SheetNames[0];
          const categorySheet = workbook.Sheets[categoryName];
          const categoryJsonData = XLSX.utils.sheet_to_json(categorySheet);

          const subCategoryName = workbook.SheetNames[1];
          const subCategorySheet = workbook.Sheets[subCategoryName];
          const subCategoryJsonData =
            XLSX.utils.sheet_to_json(subCategorySheet);

          const typeName = workbook.SheetNames[2];
          const typeSheet = workbook.Sheets[typeName];
          const typeJsonData = XLSX.utils.sheet_to_json(typeSheet);

          const itemName = workbook.SheetNames[3];
          const itemSheet = workbook.Sheets[itemName];
          const itemJsonData = XLSX.utils.sheet_to_json(itemSheet);

          console.log(categoryJsonData);
          console.log(subCategoryJsonData);
          console.log(typeJsonData);
          console.log(itemJsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/item",
            {
              itemCategories: categoryJsonData,
              itemSubCategories: subCategoryJsonData,
              itemTypes: typeJsonData,
              item: itemJsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleCustomerExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/customer",
            {
              customers: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleComissionExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/commission",
            {
              commissions: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleCommissionCustomerExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/commission-customer",
            {
              data: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

  const handleDiscountsExcel = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsertLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        setInsertLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/discounts",
            {
              discounts: jsonData,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            setInsertLoading(false);
            window.alert("Error during import");
            return;
          }
          setInsertLoading(false);
          fetchTables();
        } catch (error) {
          console.log(error);
          window.alert("Error during import");

          setInsertLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
      setInsertLoading(false);
    } finally {
      e.target.value = "";
    }
  };

   const handleIncomesExcel = async (
     e: React.ChangeEvent<HTMLInputElement>
   ) => {
     setInsertLoading(true);
     try {
       const file = e.target.files?.[0];
       if (!file) {
         setInsertLoading(false);
         return;
       }
       const reader = new FileReader();
       reader.onload = async (e) => {
         try {
           const data = e.target?.result;
           const workbook = XLSX.read(data, { type: "array" });
           const sheetName = workbook.SheetNames[0];
           const worksheet = workbook.Sheets[sheetName];
           const jsonData = XLSX.utils.sheet_to_json(worksheet);
           console.log(jsonData);

           const res = await axios.post(
             "http://localhost:3000/api/import/incomes",
             {
               incomes: jsonData,
             },
             { withCredentials: true }
           );
           if (res.status !== 201) {
             setInsertLoading(false);
             window.alert("Error during import");
             return;
           }
           setInsertLoading(false);
           fetchTables();
         } catch (error) {
           console.log(error);
           window.alert("Error during import");

           setInsertLoading(false);
         }
       };

       reader.readAsArrayBuffer(file);
     } catch (error) {
       console.log(error);
       setInsertLoading(false);
     } finally {
       e.target.value = "";
     }
   };

  console.log("RENDER");

  return (
    <div className="mt-[84px] p-10 flex gap-2 w-full h-full flex-wrap">
      {!loading && (
        <>
          <Button
            style={{
              backgroundColor: tables?.unitMeasures ? "green" : "",
            }}
            width="200px"
            height="100px"
            className={`relative`}
          >
            <input
              disabled={insertLoading || tables?.unitMeasures}
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleSendMeasuresExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa Unità di misura</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor: tables?.worker ? "green" : "",
            }}
            width="200px"
            height="100px"
            className={`relative `}
          >
            <input
              disabled={insertLoading || tables?.worker}
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleWorkersExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa Dipendenti</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor: tables?.paymentMethods ? "green" : "",
            }}
            width="200px"
            height="100px"
            className={`relative`}
          >
            <input
              disabled={insertLoading || tables?.paymentMethods}
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleSendPaymentModeExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa modalità di pagamento</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor: tables?.paymentTerms ? "green" : "",
            }}
            width="200px"
            height="100px"
            className={`relative`}
          >
            <input
              disabled={insertLoading || tables?.paymentTerms}
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleSendPaymentTermsExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa termini di pagamento</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor: tables?.state ? "green" : "",
            }}
            width="200px"
            height="100px"
            className={`relative `}
          >
            <input
              disabled={insertLoading || tables?.state}
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleStatesExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa stati commissioni</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor:
                tables?.privateCustomer || tables?.juridicalCustomer
                  ? "green"
                  : "",
            }}
            width="200px"
            height="100px"
            className={`relative `}
          >
            <input
              disabled={
                insertLoading ||
                tables?.privateCustomer ||
                tables?.juridicalCustomer
              }
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleCustomerExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa clienti</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor: tables?.supplier ? "green" : "",
            }}
            width="200px"
            height="100px"
            className={`relative `}
          >
            <input
              disabled={insertLoading || tables?.supplier}
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleSupplierExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa fornitori</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor:
                tables?.itemCategories ||
                tables?.itemSubCategories ||
                tables?.itemTypes ||
                tables?.item
                  ? "green"
                  : "",
            }}
            width="200px"
            height="100px"
            className={`relative `}
          >
            <input
              disabled={
                insertLoading ||
                tables?.itemCategories ||
                tables?.itemSubCategories ||
                tables?.itemTypes ||
                tables?.item
              }
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleItemAndCategoriesExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa articoli e categorie</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor: tables?.commission ? "green" : "",
            }}
            width="200px"
            height="100px"
            className={`relative `}
          >
            <input
              disabled={insertLoading || tables?.commission}
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleComissionExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa commissioni (dopo clienti)</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor:
                tables?.commissionJuridicalCustomer ||
                tables?.commissionPrivateCustomer
                  ? "green"
                  : "",
            }}
            width="200px"
            height="100px"
            className={`relative `}
          >
            <input
              disabled={
                insertLoading ||
                tables?.commissionJuridicalCustomer ||
                tables?.commissionPrivateCustomer
              }
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleCommissionCustomerExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">
                Importa collegamenti commissioni clienti (dopo clienti e
                commissioni)
              </p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor: tables?.commissionDiscounts ? "green" : "",
            }}
            width="200px"
            height="100px"
            className={`relative `}
          >
            <input
              disabled={insertLoading || tables?.commissionDiscounts}
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleDiscountsExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa sconti (dopo commissioni)</p>
            )}
          </Button>
          <Button
            style={{
              backgroundColor: tables?.commissionIncomes ? "green" : "",
            }}
            width="200px"
            height="100px"
            className={`relative `}
          >
            <input
              disabled={insertLoading || tables?.commissionIncomes}
              accept=".xlsx, .xls"
              type="file"
              className="opacity-0 absolute w-full h-full top-0 left-0 hover:cursor-pointer"
              onChange={(e) => handleIncomesExcel(e)}
            />
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa incassi (dopo commissioni)</p>
            )}
          </Button>
        </>
      )}
    </div>
  );
}

export default AdminPanel;
