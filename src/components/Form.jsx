import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { post } from "../helpers/post";
import { updateOne } from "../helpers/update";
import { useOutletContext } from "react-router";
import { v4 as uuidv4 } from "uuid";

function Form({ film }) {
  const { allFilms, setAllFilms } = useOutletContext();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const isTrending = watch("isTrending");
  const thumbnail = watch("thumbnail");

  useEffect(() => {
    if (film) {
      const { title, thumbnail, year, category, rating, isTrending } = film;

      setValue("title", title);
      setValue("thumbnail", thumbnail.regular.large);
      setValue("year", year);
      setValue("category", category);
      setValue("rating", rating);
      setValue("isTrending", isTrending);
    }
  }, [film, setValue]);

  useEffect(() => {
    if (isTrending) {
      if (!thumbnail?.trending?.large && thumbnail?.regular?.large) {
        setValue("thumbnail", {
          ...thumbnail,
          trending: { large: thumbnail.regular?.large },
        });
      }
    } else {
      if (thumbnail?.trending) {
        const { trending, ...updatedThumbnail } = thumbnail || {};
        setValue("thumbnail", updatedThumbnail);
      }
    }
  }, [isTrending, thumbnail, setValue]);

  const formSubmitHandler = async (data) => {
    try {
      const formattedData = {
        ...data,
        id: uuidv4(),
        isTrending: data.isTrending === "true",
        thumbnail: {
          regular: { large: data.thumbnail },
          trending:
            data.isTrending === "true" ? { large: data.thumbnail } : undefined,
        },
        isBookmarked: false,
      };

      if (film) {
        const updateAllFilms = allFilms.map((item) =>
          film.id == item.id ? formattedData : item
        );
        setAllFilms(updateAllFilms);

        await updateOne(film.id, formattedData);
      } else {
        await post(formattedData);
        setAllFilms([...allFilms, formattedData]);
      }
      reset();
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        noValidate
        className="text-center p-3"
      >
        <div className="p-3">
          <div className="flex flex-row justify-between pb-3 text-center">
            <label htmlFor="title" className="text-heading-xs font-outfit">
              Title:
            </label>
            <div className="text-red text-heading-xs font-outfit">
              {errors.title?.message}
            </div>
          </div>
          <input
            type="text"
            id="title"
            className="form-text-select"
            placeholder="Enter title name"
            {...register("title", {
              required: "This field is required",
              maxLength: 60,
              pattern: {
                value: /^(?!\s)(?!.*\s$)[\p{L}\p{N}\s':\-!,.]+$/u,
                message: "Remove whitespaces at the start or the end",
              },
            })}
          />
        </div>
        {!film && (
          <div className="p-3">
            <div className="flex flex-row justify-between pb-3 text-center">
              <label
                htmlFor="thumbnail"
                className="text-heading-xs font-outfit"
              >
                Thumbnail:
              </label>
              <div className="text-red text-heading-xs font-outfit">
                {errors.thumbnail?.message}
              </div>
            </div>
            <input
              type="url"
              id="thumbnail"
              className="form-text-select"
              placeholder="Enter image URL"
              {...register("thumbnail", {
                required: "Thumbnail URL is required",
                maxLength: {
                  value: 300,
                  message: "URL is too long (maximum is 500 characters)",
                },
                pattern: {
                  value:
                    /^(https?:\/\/[^\s/$.?#].[^\s]*)(\/[^.\s]*|\/.*\.(?:png|jpg|jpeg|gif|svg|webp|bmp))?$/i,
                  message:
                    "Please enter a valid image URL or check your image file extension",
                },
              })}
            />
          </div>
        )}
        <div className="p-3">
          <div className="flex flex-row justify-between pb-3 text-center">
            <label htmlFor="year" className="text-heading-xs font-outfit">
              Year:
            </label>
            <div className="text-red text-heading-xs font-outfit">
              {errors.year?.message}
            </div>
          </div>
          <input
            type="number"
            id="year"
            className="form-text-select"
            placeholder="Enter release year"
            {...register("year", {
              required: "This field is required",
              validate: {
                minYear: (value) =>
                  value >= 1900 || "Year must be 1900 or later",
                maxYear: (value) =>
                  value <= new Date().getFullYear() ||
                  `Year cannot exceed ${new Date().getFullYear()}`,
              },
            })}
          />
        </div>
        <div className="p-3">
          <div className="flex flex-row justify-between pb-3 text-center">
            <label htmlFor="category" className="text-heading-xs font-outfit">
              Category:
            </label>
            <div className="text-red text-heading-xs font-outfit">
              {errors.category?.message}
            </div>
          </div>
          <select
            id="category"
            className="form-text-select"
            {...register("category", {
              required: "This field is required",
              validate: (value) =>
                value !== "Select category" || "Please select a valid category",
            })}
          >
            <option className="font-outfit">Select category</option>
            <option className="font-outfit" value="Movie">
              Movie
            </option>
            <option className="font-outfit" value="TV Series">
              TV Series
            </option>
          </select>
        </div>
        <div className="p-3">
          <div className="flex flex-row justify-between pb-3 text-center">
            <label htmlFor="rating" className="text-heading-xs">
              Rating:
            </label>
            <div className="text-red text-heading-xs">
              {errors.rating?.message}
            </div>
          </div>
          <select
            id="rating"
            className="form-text-select"
            {...register("rating", {
              required: "This field is required",
              validate: (value) =>
                value !== "Select age rating" || "Please select a valid rating",
            })}
          >
            <option className="font-outfit">Select age rating</option>
            <option className="font-outfit" value="E">
              General Audiences - E
            </option>
            <option className="font-outfit" value="PG">
              Parental Guidance Suggested - PG
            </option>
            <option className="font-outfit" value="18+">
              Adults Only - 18+
            </option>
          </select>
        </div>
        <div className="p-3">
          <div className="flex flex-row justify-between pb-3 text-center">
            <label className="text-heading-xs font-outfit">Is Trending?</label>
            <div className="text-red text-heading-xs font-outfit">
              {errors.isTrending?.message}
            </div>
          </div>
          <input
            type="radio"
            id="isTrendingTrue"
            value={true}
            {...register("isTrending", { required: "Field is required" })}
          />
          <label
            htmlFor="isTrendingTrue"
            className="py-5 pr-5 pl-2 text-heading-xs font-outfit"
          >
            Yes
          </label>
          <input
            type="radio"
            id="isTrendingFalse"
            value={false}
            {...register("isTrending", { required: "Field is required" })}
          />
          <label
            htmlFor="isTrendingFalse"
            className="py-5 pr-5 pl-2 text-heading-xs font-outfit"
          >
            No
          </label>
        </div>
        <input
          type="submit"
          value="Submit"
          className="bg-accent px-6 py-3 m-4 rounded border border-black shadow-slate-600 shadow"
        />
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}

export default Form;
