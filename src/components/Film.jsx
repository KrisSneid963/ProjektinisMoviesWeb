import { useLocation } from "react-router";
import oval from "../assets/oval.svg";
import Bookmark from "./Bookmark";
import Category from "./Category";
import PlayButton from "./PlayButton";
//import DeleteButton from "./DeleteButton";
//import EditButton from "./EditButton";
import ControlPanel from "./ControlPanel";

function Film({ film }) {
  const { title, year, category, rating, thumbnail } = film;
  const location = useLocation();

  let str = "";

  if (thumbnail.regular.large.startsWith("https")) { 
    str = thumbnail.regular.large;
  } else {
    str = "src/" + thumbnail.regular.large.slice(2);
  }

  return (
    <div className="film-card">
      <div className="film-container">
        <Bookmark film={film} />
        {location.pathname === "/admin" ? (
          <>
            <ControlPanel film={film}/>
          </>
        ) : (
          ""
        )}

        <img className="film-thumbnail" src={str} alt={title} />
        <PlayButton />
      </div>
      <div className="card-description-top">
        <p>{year}</p>
        <img className="block" src={oval} alt="oval separator" />
        <Category category={category} />
        <img className="block" src={oval} alt="oval separator" />
        <p>{rating}</p>
      </div>
      <p className="card-description-bottom">{title}</p>
    </div>
  );
}

export default Film;
