import FilmList from "./FilmList";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router";

function BookmarkedPage() {
  const location = useLocation();
  return (
    <div>
      <SearchBar />
      {location.search ? (
        <FilmList category={""} />
      ) : (
        <div>
          <h1 className="trending--heading--text  py-6 md:pt-[2.06rem] xl:pt-[2.13rem] xl:pb-[2.38rem]">Bookmarked Movies</h1>
          <FilmList category={"Movie"} />
          <h1 className="trending--heading--text  py-6 md:pt-[2.06rem] xl:pt-[2.13rem] xl:pb-[2.38rem]">Bookmarked TV Series</h1>
          <FilmList category={"TV Series"} />
        </div>
      )}
    </div>
  );
}

export default BookmarkedPage;
