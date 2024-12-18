import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";
import Category from "./Category";
import PlayButton from "./PlayButton";

const TrendingRow = ({ trending }) => {
  const { title, thumbnail, year, category, rating, isBookmarked } = trending;

  let oval = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3"
      height="3"
      viewBox="0 0 3 3"
      fill="none"
    >
      <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white" />
    </svg>
  );

  const getThumbnailSrc = () => {
    const thumbnailSrc = thumbnail.trending.large;
    return `src/${thumbnailSrc.slice(2)}`;
  };

  return (
    <div className="inline-block trending--main--container">
      <div className="">
        <div className="trending--thumbnail rounded-full">
          <Bookmark film={{ ...trending, isBookmarked }} />
            <div className="trending--image-container">
              <img
                className="trending--image rounded-[0.5rem]"
                src={getThumbnailSrc()}
                alt={title}
              />
              <div className="trending--image-gradient"></div>
            </div>
          <PlayButton />
        </div>
        <div className="trending--absolute">
          <div className="trending--text--image text-white">
            {year} {oval}{" "}
            <span className="flex">
              <Category film={trending} />
              {category}
            </span>{" "}
            {oval} {rating}
          </div>
          <h3 className="trending--title--image">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default TrendingRow;
