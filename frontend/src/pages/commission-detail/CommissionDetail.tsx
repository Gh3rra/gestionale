import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GeneralDetail from "./GeneralDetail";
import CustomerDetail from "./CustomerDetail";
import SuppliersDetail from "./SuppliersDetail";
import DocumentsDetail from "./DocumentsDetail";
import Button from "../../components/Button/Button";
import React from "react";
import { useCommission } from "../../hooks/useCommission";
import { Customer, CustomerType } from "../../types/customer";
import { Commission } from "../../types/commission";
import { useCustomer } from "../../hooks/useCustomer";

const TABS = [
  { id: 0, label: "Generale" },
  { id: 1, label: "Cliente" },
  { id: 2, label: "Fornitori" },
  { id: 3, label: "Documenti" },
  {
    id: 4,
    label: "Spese",
  },
] as const;

function CommissionDetail() {
  const [page, setPage] = useState(0);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSetPage = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const {
    data: commissionData,
    isLoading,
    error,
  } = useCommission(id ? parseInt(id) : 0);

  const {
    data: customerData,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useCustomer(
    Number(commissionData?.customer?.id),
    commissionData?.customer?.type as CustomerType,
  );

  if (isLoading || isCustomerLoading) return <div>Loading...</div>;
  if (error || customerError) return <div>Error</div>;
  if (!commissionData || !customerData) return <div>Commissione non trovata</div>;

  return (
    <div className="mt-[84px] ml-[346px] flex w-full flex-col">
      <div className="flex flex-col gap-5 px-[60px] pt-[40px] pb-[20px]">
        <div className="flex justify-between">
          <h1 className="!text-[35px] font-medium">{commissionData?.title}</h1>
          <Button onClick={() => navigate(-1)}>
            <p>Indietro</p>
          </Button>
        </div>
        <div className="relative flex gap-5">
          {TABS.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              isActive={page === tab.id}
              onClick={() => handleSetPage(tab.id)}
            />
          ))}
        </div>
      </div>
      <div className="bg-fourtiary h-[1px] w-full"></div>

      <div className="flex flex-col gap-6 px-15 py-5 [&_h1]:text-[20px]">
        <TabContent
          page={page}
          customer={customerData as Customer}
          commission={commissionData as Commission}
          commissionsLoading={isCustomerLoading}
        />
      </div>
    </div>
  );
}

// Componente dedicato per gestire il rendering dei tab
interface TabContentProps {
  page: number;
  customer: Customer;
  commission: Commission;
  commissionsLoading: boolean;
}

const TabContent = ({ page, customer, commission }: TabContentProps) => {
  // Mapping esplicito e chiaro
  const tabComponents = {
    0: <GeneralDetail commission={commission} customer={customer} />,
    1: <CustomerDetail customer={customer} />,
    2: <SuppliersDetail />,
    3: <DocumentsDetail />,
    /* 4: (
      <ExpenseDetail
        customerId={customer.id}
        customerType={customer.type}
        customerName={customer.name}
      />
    ), */
  };

  return tabComponents[page as keyof typeof tabComponents] || null;
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => (
  <div
    className={`text-secondary-text hover:after:bg-primary-text relative cursor-pointer hover:after:absolute hover:after:-bottom-5 hover:after:h-[2px] hover:after:w-full hover:after:content-[''] ${
      isActive
        ? 'text-primary-text after:bg-primary-text after:absolute after:-bottom-5 after:h-[2px] after:w-full after:content-[""]'
        : ""
    }`}
    onClick={onClick}
  >
    <p>{label}</p>
  </div>
);

export default CommissionDetail;
