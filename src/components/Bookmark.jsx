import { useOutletContext } from "react-router";
import BookmarkEmpty from "../assets/icon-bookmark-empty.svg";
import BookmarkFull from "../assets/icon-bookmark-full.svg";
import { getOne } from "../helpers/get";
import { updateOne } from "../helpers/update";

// reusable component meant for Povilas and Jaroslav
function Bookmark({ film }) {
  const {setAllFilms} = useOutletContext();
  const { id, isBookmarked } = film;

  const bookmarkHandler = async () => {
    const { isBookmarked } = await getOne(id);
    await updateOne(id, { isBookmarked: !isBookmarked });
    setAllFilms((prevState) => prevState.map((film) => film.id === id ? {...film, isBookmarked: !isBookmarked} : film ));
  };

  const bookmarkButton = isBookmarked ? BookmarkFull : BookmarkEmpty;

  return (
    <div className="bookmark-button">
      <button onClick={bookmarkHandler} className="circle-icon">
        <img src={bookmarkButton} alt={bookmarkButton} />
      </button>
    </div>
  );
}

export default Bookmark;
