import React, { useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import MyButtonFile from "../../components/InputFileButton/Button";

type TablesCount = {
  commission: boolean;
  commissionDiscounts: boolean;
  commissionIncomes: boolean;
  commissionJuridicalCustomer: boolean;
  commissionMaterial: boolean;
  commissionPrivateCustomer: boolean;
  ddt: boolean;
  expense: boolean;
  expenseType: boolean;
  juridicalCustomer: boolean;
  material: boolean;
  materialCategories: boolean;
  materialSubCategories: boolean;
  materialTypes: boolean;
  paymentMethods: boolean;
  paymentTerms: boolean;
  privateCustomer: boolean;
  purchase: boolean;
  purchaseDiscounts: boolean;
  purchaseInvoice: boolean;
  purchaseMaterial: boolean;
  state: boolean;
  supplier: boolean;
  unitMeasures: boolean;
  user: boolean;
  warehouseMaterial: boolean;
  worker: boolean;
  workerPresence: boolean;
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
        console.log(res.data.result.worker);

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
    e: React.ChangeEvent<HTMLInputElement>,
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
            { withCredentials: true },
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
    e: React.ChangeEvent<HTMLInputElement>,
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
            { withCredentials: true },
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
    e: React.ChangeEvent<HTMLInputElement>,
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
            { withCredentials: true },
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
            { withCredentials: true },
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
            { withCredentials: true },
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
    e: React.ChangeEvent<HTMLInputElement>,
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
            { withCredentials: true },
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

  const handleMaterialAndCategoriesExcel = async (
    e: React.ChangeEvent<HTMLInputElement>,
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

          const materialName = workbook.SheetNames[3];
          const materialSheet = workbook.Sheets[materialName];
          const materialJsonData = XLSX.utils.sheet_to_json(materialSheet);

          console.log(categoryJsonData);
          console.log(subCategoryJsonData);
          console.log(typeJsonData);
          console.log(materialJsonData);

          const res = await axios.post(
            "http://localhost:3000/api/import/material",
            {
              materialCategories: categoryJsonData,
              materialSubCategories: subCategoryJsonData,
              materialTypes: typeJsonData,
              material: materialJsonData,
            },
            { withCredentials: true },
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
    e: React.ChangeEvent<HTMLInputElement>,
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
            { withCredentials: true },
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
    e: React.ChangeEvent<HTMLInputElement>,
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
            { withCredentials: true },
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
    e: React.ChangeEvent<HTMLInputElement>,
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
            { withCredentials: true },
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
    e: React.ChangeEvent<HTMLInputElement>,
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
            { withCredentials: true },
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

  const handleIncomesExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            { withCredentials: true },
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

  return (
    <div className="mt-[84px] flex h-full w-full flex-wrap gap-2 p-10">
      {!loading && (
        <>
          <MyButtonFile
            className={`relative ${tables?.unitMeasures ? "!bg-green-600" : ""}`}
            accept=".xlsx, .xls"
            onChange={(e) => handleSendMeasuresExcel(e)}
            disabled={insertLoading || tables?.unitMeasures}
          >
            {" "}
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa Unità di misura</p>
            )}
          </MyButtonFile>

          <MyButtonFile
            disabled={insertLoading || tables?.worker}
            accept=".xlsx, .xls"
            onChange={(e) => handleWorkersExcel(e)}
            className={`relative ${tables?.worker ? "!bg-green-600" : ""}`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa Dipendenti</p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={insertLoading || tables?.paymentMethods}
            onChange={(e) => handleSendPaymentModeExcel(e)}
            accept=".xlsx, .xls"
            className={`relative ${tables?.paymentMethods ? "!bg-green-600" : ""}`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa modalità di pagamento</p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={insertLoading || tables?.paymentTerms}
            accept=".xlsx, .xls"
            onChange={(e) => handleSendPaymentTermsExcel(e)}
            className={`relative ${tables?.paymentTerms ? "!bg-green-600" : ""}`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa termini di pagamento</p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={insertLoading || tables?.state}
            accept=".xlsx, .xls"
            
            onChange={(e) => handleStatesExcel(e)}
            className={`relative ${tables?.state ? "!bg-green-600" : ""}`}
          >
           
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa stati commissioni</p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={
              insertLoading ||
              tables?.privateCustomer ||
              tables?.juridicalCustomer
            }
            accept=".xlsx, .xls"
            onChange={(e) => handleCustomerExcel(e)}
            className={`relative ${
              tables?.privateCustomer || tables?.juridicalCustomer
                ? "!bg-green-600"
                : ""
            }`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa clienti</p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={insertLoading || tables?.supplier}
            accept=".xlsx, .xls"
            onChange={(e) => handleSupplierExcel(e)}
            className={`relative ${tables?.supplier ? "!bg-green-600" : ""}`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa fornitori</p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={
              insertLoading ||
              tables?.materialCategories ||
              tables?.materialSubCategories ||
              tables?.materialTypes ||
              tables?.material
            }
            accept=".xlsx, .xls"
            onChange={(e) => handleMaterialAndCategoriesExcel(e)}
            className={`relative ${
              tables?.materialCategories ||
              tables?.materialSubCategories ||
              tables?.materialTypes ||
              tables?.material
                ? "!bg-green-600"
                : ""
            }`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa articoli e categorie</p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={insertLoading || tables?.commission}
            onChange={(e) => handleComissionExcel(e)}
            accept=".xlsx, .xls"
            className={`relative ${tables?.commission ? "!bg-green-600" : ""}`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa commissioni (dopo clienti)</p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={
              insertLoading ||
              tables?.commissionJuridicalCustomer ||
              tables?.commissionPrivateCustomer
            }
            accept=".xlsx, .xls"
            onChange={(e) => handleCommissionCustomerExcel(e)}
            className={`relative ${
              tables?.commissionJuridicalCustomer ||
              tables?.commissionPrivateCustomer
                ? "!bg-green-600"
                : ""
            }`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">
                Importa collegamenti commissioni clienti (dopo clienti e
                commissioni)
              </p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={insertLoading || tables?.commissionDiscounts}
            accept=".xlsx, .xls"
            onChange={(e) => handleDiscountsExcel(e)}
            className={`relative ${tables?.commissionDiscounts ? "!bg-green-600" : ""}`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa sconti (dopo commissioni)</p>
            )}
          </MyButtonFile>
          <MyButtonFile
            disabled={insertLoading || tables?.commissionIncomes}
            accept=".xlsx, .xls"
            onChange={(e) => handleIncomesExcel(e)}
            className={`relative ${tables?.commissionIncomes ? "!bg-green-600" : ""}`}
          >
            {insertLoading ? (
              <p className="text-wrap">Loading...</p>
            ) : (
              <p className="text-wrap">Importa incassi (dopo commissioni)</p>
            )}
          </MyButtonFile>
        </>
      )}
    </div>
  );
}

export default AdminPanel;
