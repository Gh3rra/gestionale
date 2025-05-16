import { useEffect, useState } from "react";
import { supabase } from "../../supabase-client";
import { commissions, customers, suppliers } from "../../data";
import { getFormattedTimestamp } from "../../common/utils";
import axios from "axios";

function Dashboard() {
  const [insertLoading, setInsertLoading] = useState(false);
  const [insertExcelLoading, setInsertExcelLoading] = useState(false);

  const handleSend = async () => {
    setInsertLoading(true);
    try {
      customers.forEach(async (e) => {
        if (e.type === 0) {
          const res = await axios.post(
            "http://localhost:3000/api/customers/private-customer",
            {
              name: e.name,
              surname: e.surname,
              gender: e.gender,
              cf: e.fiscalCode,
              address: e.address,
              city: e.city,
              cap: e.cap,
              province: e.province,
              phone: e.phone,
              email: e.email,
              pec: e.pec,
              profileImg: e.profileImg,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            throw new Error("Error inserting customer");
          }
        } else {
          const res = await axios.post(
            "http://localhost:3000/api/customers/juridical-customer",
            {
              name: e.name,
              ivaCode: e.ivaCode,
              address: e.address,
              city: e.city,
              cap: e.cap,
              province: e.province,
              phone: e.phone,
              email: e.email,
              pec: e.pec,
              profileImg: e.profileImg,
            },
            { withCredentials: true }
          );
          if (res.status !== 201) {
            throw new Error("Error inserting customer");
          }
        }
      });
    } catch (error) {
      console.log(error);

      setInsertLoading(false);
    }
    console.log("Customers inserted successfully");
    setInsertLoading(false);
  };

  const handleSendSuppliers = () => {
    setInsertSuppliersLoading(true);
    try {
      suppliers.forEach(async (e) => {
        const res = await axios.post(
          "http://localhost:3000/api/suppliers",
          {
            name: e.name,
            ivaCode: e.ivaCode,
            address: e.address,
            city: e.city,
            cap: e.cap,
            province: e.province,
            phone: e.phone,
            email: e.email,
            pec: e.pec,
            profileImg: e.profileImg,
          },
          { withCredentials: true }
        );

        if (res.status !== 201) {
          throw new Error("Error inserting supplier");
        }
      });
    } catch (error) {
      console.log(error);
      setInsertSuppliersLoading(false);
    }
    console.log("Suppliers inserted successfully");
    setInsertSuppliersLoading(false);
  };

  const handleCommission = async () => {
    setInsertCommissionsLoading(true);
    const fixedCommissions = commissions.map((e) => ({
      title: e.title,
      private_customers: e.privateCustomers,
      suppliers: e.suppliers.map((s) => ({
        id: s.id,
        goods: s.goods.map((g) => ({
          title: g.title,
          quantity: g.quantity,
          unit_price: g.unitPrice,
          price: g.totalPrice,
        })),
      })),
      juridical_customers: e.juridicalCustomers,
      state: e.state,
      address: e.address,
      city: e.city,
      cap: e.cap,
      province: e.province,
      request_date: getFormattedTimestamp(e.dateRequest),
      start_work_date: null,
      end_work_date: null,
    }));

    const { data, error } = await supabase.rpc("insert_initial_commissions", {
      commissions: fixedCommissions,
    });
    if (error) console.error(error);

    if (error) {
      console.log(error);
      setInsertCommissionsLoading(false);

      throw new Error(error.message);
    }
    setInsertCommissionsLoading(false);
  };

  const handleCane = async () => {
    const { data, error } = await supabase.functions.invoke("add-commission", {
      body: {
        commission: {
          title: "Cancellata",
          state: 0,
          address: "Via di sta minchia",
          cap: "83031",
          province: "AV",
          city: "Baiano",
          request_date: new Date(),
          start_work_date: null,
          end_work_date: null,
        },
      },
    });
    console.log(data);
    console.log(error);
  };

  useEffect(() => {
    fetchData();
  });
  async function fetchData() {
    const commissions = (await supabase.from("commissions").select()).data;
  }

  return (
    <div className="px-15 py-10 w-full mt-20 ml-85">
      {/* {insertLoading ? <div>Loading...</div> : <div></div>}
      <Button width="200px" height="100px" onClick={handleSend}>
        SCHIACCIA 
      </Button> */}

    </div>
  );
}

export default Dashboard;
