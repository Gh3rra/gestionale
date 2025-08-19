import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button/Button";
import GeneralDetail from "./GeneralDetail";
import { useSupplier } from "../../hooks/useSupplier";

const TABS = [
  { id: 0, label: "Generale", component: GeneralDetail },
  // { id: 1, label: "Cliente", component: CustomerDetail },
  // { id: 2, label: "Fornitori", component: SuppliersDetail },
  // { id: 3, label: "Documenti", component: DocumentsDetail },
  // { id: 4, label: "Spese", component: ExpensesDetail },
] as const;

function SupplierDetail() {
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: supplier, isLoading, error } = useSupplier(Number(id));

  const handleSetPage = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const renderTabContent = useCallback(() => {
    const currentTab = TABS.find((tab) => tab.id === page);
    if (!currentTab) return null;

    const TabComponent = currentTab.component;
    return <TabComponent supplier={supplier} />;
  }, [page, supplier]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!supplier) return <div>Fornitore non trovato</div>;

  return (
    <div className="mt-[84px] ml-[346px] flex w-full flex-col">
      <div className="flex flex-col gap-5 px-[60px] pt-[40px] pb-[20px]">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <h1 className="!text-[35px] font-medium">{supplier.name}</h1>

            <img
              src={supplier.profileImg}
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

export default SupplierDetail;
