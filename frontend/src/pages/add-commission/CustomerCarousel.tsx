import React, { useEffect, useState } from "react";
import { InfoToolIcon, MouseWheelIcon, NextArrowNoPathIcon } from "../../Icon";
import { AnimatePresence, motion } from "framer-motion";
import DraggableScroll from "../../components/DraggableScroll/DraggableScroll";
import axios from "axios";
import {
  Customer,
  CustomerType,
  isPrivateCustomer,
} from "../../types/customer";

const CustomerCarousel = ({
  customers: customersList,
  handleCustomerSelect,
  selectedCustomer,
}: {
  customers: [];
  handleCustomerSelect: (id: number, type: CustomerType) => void;
  selectedCustomer?: { id: number; type: CustomerType } | null;
}) => {
  const [toolTip, setToolTip] = React.useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const fetchCustomerData = async () => {
    if (selectedCustomer) {
      try {
        // Fetch customer data based on the type

        if (selectedCustomer.type === "private") {
          const response = await axios.get(
            `http://localhost:3000/api/customers/private-customer/${selectedCustomer.id}`,
            { withCredentials: true },
          );
          if (response.status === 200 || response.status === 304) {
            setCustomer(response.data.customer);
          } else {
            console.error(
              "Failed to fetch customer data:",
              response.statusText,
            );
          }
        } else {
          const response = await axios.get(
            `http://localhost:3000/api/customers/juridical-customer/${selectedCustomer.id}`,
            { withCredentials: true },
          );
          if (response.status === 200 || response.status === 304) {
            console.log(response.data.customer);

            setCustomer(response.data.customer);
          } else {
            console.error(
              "Failed to fetch customer data:",
              response.statusText,
            );
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [selectedCustomer]);

  return (
    <div className="relative flex w-full flex-col">
      <DraggableScroll
        onScrollChange={(e) => {
          setShowScroll(e);
        }}
      >
        {" "}
        {selectedCustomer && (
          <CustomerCard
            selected
            key={0}
            customer={customer}
            onClick={(id, type) => handleCustomerSelect(id, type)}
          />
        )}
        {customersList.map((customer, index) => (
          <CustomerCard
            key={index + 1}
            customer={customer}
            onClick={(id, type) => handleCustomerSelect(id, type)}
          />
        ))}
      </DraggableScroll>

      {showScroll && (
        <div className="mt-5 flex w-full justify-end">
          <div
            className="relative"
            onMouseOver={() => setToolTip(true)}
            onMouseLeave={() => setToolTip(false)}
          >
            <InfoToolIcon className="relative h-5" />

            <AnimatePresence>
              {toolTip && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-fourtiary absolute -right-15 bottom-8 flex h-20 w-35 flex-col items-center justify-center rounded border-1 bg-white px-5 py-2 text-sm shadow-lg"
                >
                  <span className="flex w-full flex-1 flex-row items-center justify-start gap-2">
                    {" "}
                    Maiusc + <MouseWheelIcon className="h-7" />
                  </span>
                  <span className="flex w-full flex-1 items-center justify-start">
                    {" "}
                    per scrollare
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomerCard = ({
  customer,

  onClick,
  selected,
}: {
  customer: Customer | null;
  onClick: (id: number, type: CustomerType) => void;
  selected?: boolean;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    customer && (
      <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          onClick(customer.id, customer.type);
        }}
        key={customer.id}
        className={`${selected ? "border-primary-text" : "border-fourtiary"} mb-2 flex w-80 shrink-0 flex-col items-center justify-between overflow-hidden rounded-lg border-1 shadow-lg transition-all duration-100 hover:cursor-pointer active:scale-99`}
      >
        <div className="flex w-full justify-start px-4 py-3">
          <div className="flex gap-3">
            <div className="flex items-center justify-center">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={customer.profileImg}
                alt=""
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className="text-base font-medium">
                {customer.name}{" "}
                {isPrivateCustomer(customer) ? customer.surname : ""}
              </p>
              <p className="text-sm text-gray-500">
                {isPrivateCustomer(customer) ? customer.cf : customer.ivaCode}
              </p>
            </div>
          </div>
        </div>
        <div className="border-fourtiary grid w-full grid-cols-2 gap-5 border-t-1 px-4 py-3">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Tipo</p>
            <p className="text-base font-medium">
              {isPrivateCustomer(customer) ? "Privato" : "Azienda"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Totale Lavori</p>
            <p className="text-base font-medium">€15.000</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Tipo</p>
            <p className="text-base font-medium">
              {isPrivateCustomer(customer) ? "Privato" : "Azienda"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Tipo</p>
            <p className="text-base font-medium">
              {isPrivateCustomer(customer) ? "Privato" : "Azienda"}
            </p>
          </div>
        </div>
        {selected ? (
          <div
            className={`flex w-full items-center justify-center gap-2 bg-black px-4 py-3 text-sm text-white inset-shadow-white transition-all duration-200 ${hovered ? "shadow-[inset_0_0_6px_#fff]" : ""}`}
          >
            <span className="h-fit leading-none">Selezionato</span>
          </div>
        ) : (
          <div
            className={`flex w-full items-center justify-center gap-2 bg-black px-4 py-3 text-sm text-white inset-shadow-white transition-all duration-200 ${hovered ? "shadow-[inset_0_0_6px_#fff]" : ""}`}
          >
            <span className="h-fit leading-none">Seleziona</span>
            <NextArrowNoPathIcon className="h-[14px]" />
          </div>
        )}
      </div>
    )
  );
};

export default CustomerCarousel;
