import { useEffect, useRef } from "react";

import TrendingRow from "./TrendingRow";
import { handleMouseDrag } from "../helpers/handleMouseDrag";
import { useOutletContext } from "react-router";

const Trending = () => {
  const carouselRef = useRef(null);

  const { allFilms } = useOutletContext();
  const trendingItems = allFilms.filter((item) => item.isTrending);

  useEffect(() => {
    handleMouseDrag(carouselRef);
  }, []);

  return (
    <section>
      <h1 className="trending--heading--text flex-row pt-6 md:pt-[2.06rem] xl:pt-[2.13rem] pb-4 md:pb-[1.56rem]">
        Trending
      </h1>
      <div>
        <div
          ref={carouselRef}
          className="carousel overflow-hidden whitespace-nowrap"
        >
          {trendingItems.map((trending, index) => (
            <TrendingRow key={index} trending={trending} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
