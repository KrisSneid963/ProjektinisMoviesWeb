import movieIcon from "../assets/icon-category-movie.svg"
import seriesIcon from "../assets/icon-category-tv.svg"


// Reusable component meant for Povilas and Jaroslav (and potentially others)
function Category({ category }) {
  const categoryIcon = (category === "Movie" ? movieIcon : seriesIcon)
  return (
    <div className="flex items-center gap-1 md:gap-[0.375rem]">
      <img className="block w-[0.625rem] md:w-3" src={categoryIcon} alt={category} />
      <p>{category}</p>
    </div>
  )
}

export default Category;
