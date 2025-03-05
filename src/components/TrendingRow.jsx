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

  let str = "";
  if (thumbnail.regular.large.startsWith("https")) {
    str = thumbnail.regular.large;
  } else {
    str = "src/" + thumbnail.regular.large.slice(2);
  }

  return (
    <div className="inline-block trending--main--container ">
      <div className="">
        <div className="trending--thumbnail">
          <Bookmark film={{ ...trending, isBookmarked }} />
          <div className="trending--image-container">
            <img
              className="trending--image rounded-[0.5rem]"
              src={str}
              alt={title}
            />
            <div className="trending--image-gradient"></div>
          </div>
          <PlayButton />
        </div>
        <div className="trending--absolute">
          <div className="trending--text--image text-white">
            {year} {oval}
            <span className="flex">
              <Category category={category} />
            </span>
            {oval} {rating}
          </div>
          <h3 className="trending--title--image">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default TrendingRow;
