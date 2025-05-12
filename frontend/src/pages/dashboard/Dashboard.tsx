import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { supabase } from "../../supabase-client";
import { commissions, customers, suppliers } from "../../data";
import { getFormattedTimestamp } from "../../common/utils";

function Dashboard() {
  const [insertLoading, setInsertLoading] = useState(false);
  const [insertSuppliersLoading, setInsertSuppliersLoading] = useState(false);
  const [insertCommissionsLoading, setInsertCommissionsLoading] =
    useState(false);
  const handleSend = () => {
    setInsertLoading(true);
    customers.forEach(async (e) => {
      if (e.type === 0) {
        const { error } = await supabase.from("private_customers").insert({
          name: e.name,
          surname: e.surname,
          gender: "M",
          profile_img: e.profileImg,
          cf: e.fiscalCode,
          address: e.address,
          city: e.city,
          cap: e.cap,
          province: e.province,
          phone: e.phone,
          email: e.email,
          pec: e.pec,
        });
        if (error) {
          console.log(error);

          throw new Error(error.message);
        }
      } else {
        const { error } = await supabase.from("juridical_customers").insert({
          name: e.name,
          profile_img: e.profileImg,
          iva_code: e.ivaCode,
          address: e.address,
          city: e.city,
          cap: e.cap,
          province: e.province,
          phone: e.phone,
          email: e.email,
          pec: e.pec,
        });
        if (error) {
          console.log(error);

          throw new Error(error.message);
        }
      }
    });
    setInsertLoading(false);
  };

  const handleSendSuppliers = () => {
    setInsertSuppliersLoading(true);
    suppliers.forEach(async (e) => {
      const { data, error } = await supabase
        .from("suppliers")
        .insert({
          name: e.name,
          iva_code: e.ivaCode,
          address: e.address,
          city: e.city,
          cap: e.cap,
          province: e.province,
          phone: e.phone,
          email: e.email,
          pec: e.pec,
          profile_img: e.profileImg,
        })
        .select();
      if (error) {
        console.log(error);

        throw new Error(error.message);
      }
      console.log(data);
    });
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
    else console.log(data);

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
    console.log(commissions);
  }

  return (
    <div className="px-15 py-10 w-full mt-20 ml-85">
      <Button width="200px" height="100px" onClick={handleCane}>
        DIO MIO
      </Button>
      {insertLoading ? <div>Loading...</div> : <div>INSERIMENTO CUSTOMERS</div>}
      <Button width="200px" height="100px" onClick={handleSend}>
        SCHIACCIA
      </Button>
      {insertSuppliersLoading ? (
        <div>Loading...</div>
      ) : (
        <div>INSERIMENTO SUPPLIERS</div>
      )}
      <Button width="200px" height="100px" onClick={handleSendSuppliers}>
        SCHIACCIA
      </Button>

      {insertCommissionsLoading ? (
        <div>Loading...</div>
      ) : (
        <div>INSERIMENTO COMMISSIONS</div>
      )}
      <Button width="200px" height="100px" onClick={handleCommission}>
        SCHIACCIA
      </Button>
    </div>
  );
}

export default Dashboard;
