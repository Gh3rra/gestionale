import React from "react";
import { CrossIcon, PrevArrowNoPathIcon } from "./Icon";

function Cane() {
  return (
    <div className="h-100">
      <div className="flex h-full max-h-full max-w-full flex-col px-5 pt-4 pb-10">
        <div className="flex w-full justify-end">
          <button
            onClick={() => {}}
            className="hover:[&_svg]:!fill-primary-text rounded-lg border-none bg-white px-2 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-sm hover:shadow-black active:translate-y-0 active:shadow-none"
          >
            <CrossIcon className="fill-secondary-text w-6 transition-all duration-200" />
          </button>
        </div>

        <div onSubmit={() => {}} className="flex h-full flex-col">
          {/*  {steps[step]} */}
          <div className="h-full overflow-y-auto">
            {Array.from({ length: 50 }).map(() => (
              <p>dadasdasasdasd</p>
            ))}
          </div>
          <div className={`flex w-full justify-start gap-5`}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="text-primary-text flex items-center gap-2 rounded-2xl bg-transparent px-4 py-1.5 text-sm inset-shadow-white transition-all duration-200 hover:cursor-pointer hover:shadow-[inset_0_0_6px_#000]"
            >
              <PrevArrowNoPathIcon className="h-3.5" />

              <p>Indietro</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cane;
