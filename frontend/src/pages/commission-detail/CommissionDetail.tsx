import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../../supabase-client";
import GeneralDetail from "./GeneralDetail";
import CustomerDetail from "./CustomerDetail";
import SuppliersDetail from "./SuppliersDetail";
import DocumentsDetail from "./DocumentsDetail";
import Button from "../../components/Button/Button";

export interface CommissionModel {
  id: number;
  title: string;
  state: number;
  address: string;
  city: string;
  cap: string;
  province: string;
  request_date: Date;
  start_work_date: string;
  end_work_date: string;
}
export interface PrivateCustomer {
  id: number;
  name: string;
  surname: string;
  gender: string;
  cf: string;
  address: string;
  city: string;
  cap: string;
  province: string;
  email: string;
  phone: string;
  pec: string;
  profile_img: string | null;
  created_at: string;
  updated_at: string;
}

export interface JuridicalCustomer {
  id: number;
  name: string;
  iva_code: string;
  address: string;
  city: string;
  cap: string;
  province: string;
  email: string;
  phone: string;
  pec: string;
  profile_img: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupplierModel {
  id: number;
  name: string;
  ivaCode: string;
  address: string;
  city: string;
  cap: string;
  province: string;
  email: string;
  phone: string;
  pec: string;
  profileImg: string | null;
  goods: {
    title: string;
    quantity: number | null;
    unitPrice: number | null;
    price: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

function CommissionDetail() {
  const [commission, setCommission] = useState<CommissionModel | null>(null);
  const [privateCustomer, setPrivateCustomer] =
    useState<PrivateCustomer | null>(null);
  const [juridicalCustomer, setJuridicalCustomer] =
    useState<JuridicalCustomer | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);

    const { data: commissionData, error: commissionError } = await supabase
      .from("commissions")
      .select("*,private_customers(*),juridical_customers(*)")
      .eq("id", id)
      .single();
    if (commissionError) {
      setError(true);
      throw new Error(commissionError.message);
    }

    setCommission({
      id: commissionData.id,
      title: commissionData.title,
      state: commissionData.state,
      address: commissionData.address,
      city: commissionData.city,
      cap: commissionData.cap,
      province: commissionData.province,
      request_date: new Date(commissionData.request_date),
      start_work_date: commissionData.start_work_date,
      end_work_date: commissionData.end_work_date,
    });
    if (commissionData.private_customers.length > 0) {
      const customer = commissionData.private_customers[0];
      setPrivateCustomer({
        id: customer.id,
        name: customer.name,
        surname: customer.surname,
        gender: customer.gender,
        cf: customer.cf,
        address: customer.address,
        city: customer.city,
        cap: customer.cap,
        province: customer.province,
        email: customer.email,
        phone: customer.phone,
        pec: customer.pec,
        profile_img: customer.profile_img,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
      });
    } else if (commissionData.juridical_customers.length > 0) {
      const customer = commissionData.juridical_customers[0];
      setJuridicalCustomer({
        id: customer.id,
        name: customer.name,
        iva_code: customer.iva_code,
        address: customer.address,
        city: customer.city,
        cap: customer.cap,
        province: customer.province,
        email: customer.email,
        phone: customer.phone,
        pec: customer.pec,
        profile_img: customer.profile_img,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
      });
    }

    const { data: goodsData, error: goodsError } = await supabase
      .from("commissions_goods")
      .select("quantity,unit_price,total_price,goods(*, suppliers(*))")
      .eq("commission_id", id);

    console.log(goodsData);

    if (goodsError) {
      console.log(goodsError);
    }

    /*  const fornitori = Array.from(
      new Map(
        goodsData?.map((e) => [e.goods.id e.goods.suppliers.name])
      )
    ); */

    setLoading(false);
    setError(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const switchPages = () => {
    switch (page) {
      case 0:
        return (
          <GeneralDetail
            commission={commission}
            juridicalCustomer={juridicalCustomer}
            privateCustomer={privateCustomer}
          />
        );
      case 1:
        return (
          <CustomerDetail
            juridicalCustomer={juridicalCustomer}
            privateCustomer={privateCustomer}
          />
        );
      case 2:
        return <SuppliersDetail />;

      case 3:
        return <DocumentsDetail />;
      /* case 4:
        return <ExpensesDetail />; */

      default:
        break;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="flex flex-col w-full mt-[84px] ml-[346px]">
      <div className="flex flex-col gap-5 pt-[40px] px-[60px] pb-[20px]">
        <div className="flex justify-between">
          <h1 className="font-medium !text-[35px]">{commission?.title}</h1>
          <Button height="40px" onClick={() => navigate(-1)}>
            <p>Indietro</p>
          </Button>
        </div>
        <div className="flex gap-5 relative">
          <div
            className={`text-secondary-text relative cursor-pointer hover:after:content-['']
               hover:after:absolute hover:after:-bottom-5 hover:after:w-full hover:after:h-[2px] hover:after:bg-primary-text ${
                 page === 0
                   ? 'text-primary-text  after:content-[""] after:absolute after:-bottom-5 after:w-full after:h-[2px] after:bg-primary-text'
                   : ""
               }`}
            onClick={() => {
              setPage(0);
            }}
          >
            <p>Generale</p>
          </div>
          <div
            className={`text-secondary-text relative cursor-pointer hover:after:content-['']
               hover:after:absolute hover:after:-bottom-5 hover:after:w-full hover:after:h-[2px] hover:after:bg-primary-text ${
                 page === 1
                   ? 'text-primary-text  after:content-[""] after:absolute after:-bottom-5 after:w-full after:h-[2px] after:bg-primary-text'
                   : ""
               }`}
            onClick={() => {
              setPage(1);
            }}
          >
            <p>Cliente</p>
          </div>
          <div
            className={`text-secondary-text relative cursor-pointer hover:after:content-['']
               hover:after:absolute hover:after:-bottom-5 hover:after:w-full hover:after:h-[2px] hover:after:bg-primary-text ${
                 page === 2
                   ? 'text-primary-text  after:content-[""] after:absolute after:-bottom-5 after:w-full after:h-[2px] after:bg-primary-text'
                   : ""
               }`}
            onClick={() => {
              setPage(2);
            }}
          >
            <p>Fornitori</p>
          </div>
          <div
            className={`text-secondary-text relative cursor-pointer hover:after:content-['']
               hover:after:absolute hover:after:-bottom-5 hover:after:w-full hover:after:h-[2px] hover:after:bg-primary-text ${
                 page === 3
                   ? 'text-primary-text  after:content-[""] after:absolute after:-bottom-5 after:w-full after:h-[2px] after:bg-primary-text'
                   : ""
               }`}
            onClick={() => {
              setPage(3);
            }}
          >
            <p>Documenti</p>
          </div>
          <div
            className={`text-secondary-text relative cursor-pointer hover:after:content-['']
               hover:after:absolute hover:after:-bottom-5 hover:after:w-full hover:after:h-[2px] hover:after:bg-primary-text ${
                 page === 4
                   ? 'text-primary-text  after:content-[""] after:absolute after:-bottom-5 after:w-full after:h-[2px] after:bg-primary-text'
                   : ""
               }`}
            onClick={() => {
              setPage(4);
            }}
          >
            <p>Spese</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-fourtiary"></div>

      <div className="flex flex-col py-5 px-15 gap-6 [&_h1]:text-[20px]">
        {switchPages()}
      </div>
    </div>
  );
}

export default CommissionDetail;
