import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button/Button";
import GeneralDetail from "./GeneralDetail";
import { useCustomer } from "../../hooks/useCustomer";
import { CircularProgress } from "@mui/material";
import React from "react";
import { CustomerType, isPrivateCustomer } from "../../types/customer";

const TABS = [{ id: 0, label: "Generale", component: GeneralDetail }] as const;

function CustomerDetail() {
  const [page, setPage] = useState(0);
  const { id, type } = useParams<{ id: string; type: CustomerType }>();

  const { data: customer, isLoading, error } = useCustomer(Number(id), type!);

  const navigate = useNavigate();

  const handleSetPage = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const renderTabContent = useCallback(() => {
    const currentTab = TABS.find((tab) => tab.id === page);
    if (!currentTab || !customer) return null;

    const TabComponent = currentTab.component;
    return <TabComponent customer={customer} />;
  }, [page, customer]);

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Errore: {error.message}</div>;
  if (!customer) return <div>Cliente non trovato</div>;

  return (
    <div className="mt-[84px] ml-[346px] flex w-full flex-col">
      <div className="flex flex-col gap-5 px-[60px] pt-[40px] pb-[20px]">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <h1 className="!text-[35px] font-medium">
              {customer.name}{" "}
              {isPrivateCustomer(customer) ? customer.surname : ""}
            </h1>

            <img
              src={customer.profileImg}
              className="h-12 w-12 rounded-full object-cover"
              alt=""
            />
          </div>
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
        {renderTabContent()}
      </div>
    </div>
  );
}

// Componente separato per i tab button (più pulito)
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

export default CustomerDetail;
