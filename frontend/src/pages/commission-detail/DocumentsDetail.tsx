import Icon from "../../components/Icon/Icon";
import { DocumentsIcon, FilterSettingsIcon, SearchIcon } from "../../Icon";

function DocumentsDetail() {
  return (
    <>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex gap-4">
          <DocumentsIcon size={22} />
          <h1 className="!text-[20px]  font-medium">Documenti</h1>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center px-4 gap-1.5 border-[0.5px] border-fourtiary relative w-120 h-11.5 rounded-xl ">
            <SearchIcon size={20} />
            <input
              /*  value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }} */
              type="text"
              className="w-full h-full border-none text-secondary-text text-[17px] outline-none bg-transparent"
              placeholder="Cerca commesse"
            />
          </div>
          <Icon>
            <FilterSettingsIcon size={20} />
          </Icon>
        </div>
      </div>
    </>
  );
}

export default DocumentsDetail;
