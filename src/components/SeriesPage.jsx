import FilmList from "./FilmList";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router";

function SeriesPage() {
  const location = useLocation();
  return (
    <>
      <SearchBar />
      {!location.search && <h1 className="trending--heading--text  py-6 md:pt-[2.06rem] xl:pt-[2.13rem] xl:pb-[2.38rem]">TV Series</h1>}
      <FilmList category={"TV Series"} />
    </>
  );
}

export default SeriesPage;
