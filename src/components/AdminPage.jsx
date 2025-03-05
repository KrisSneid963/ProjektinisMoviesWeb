import CreateButton from "./CreateButton";
import FilmList from "./FilmList";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router";

function AdminPage() {
  const location = useLocation();

  return (
    <>
      <SearchBar />

      {!location.search && (
        <div className="overflow-auto">
          <div className="trending-full flex items-center">
            <h1 className="trending--heading--text mr-8 py-6 md:pt-[2.06rem] xl:pt-[2.13rem] xl:pb-[2.38rem]">
              Create | Edit | Delete
            </h1>

            <CreateButton /> 
          </div>
        </div>
      )}
      <FilmList category={""} />
    </>
  );
}

export default AdminPage;
