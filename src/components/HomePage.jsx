import FilmList from "./FilmList";
import Trending from "./Trending";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router";

function HomePage() {
  const location = useLocation();
  return (
    <>
      <SearchBar />
      {!location.search && (
        <div className="overflow-auto">
          <Trending/>
          <div className="trending-full">
          <h1 className="flex-row py-6 md:pt-[2.44rem] xl:pt-10 tracking-[-0.03125rem] md:tracking-[-0.0195rem] pb-6 xl:pb-8 text-white text-[1.25rem] md:text-[2rem] font-[400];">Recommended for you</h1>
          </div>
        </div>
      )}
      <FilmList category={""} />
    </>
  );
}

export default HomePage;
