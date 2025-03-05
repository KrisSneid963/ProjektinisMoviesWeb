import { useContext } from "react";
import { useOutletContext } from "react-router";
import { deleteOne } from "../helpers/delete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Delete from "../assets/icon-delete.svg?react";
import { ThemeContext } from "../helpers/themeContext";

function DeleteButton({ film }) {
  const { setAllFilms } = useOutletContext();
  const { id } = film; 

  const { deleteModalID, setDeleteModalID } = useContext(ThemeContext);

  const handleDelete = async () => {
    if (deleteModalID !== id) {
      return;
    }

    try {   
      setDeleteModalID("");

      await deleteOne(id);
      setAllFilms((prevFilms) => prevFilms.filter((film) => film.id !== id));


      toast.success("Film deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("An error occurred while deleting the film. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  return (
    <>
      <div className="delete-button">
        <button className="delete-icon" onClick={() => setDeleteModalID(id)} aria-label="Delete film">
          <Delete />
        </button>
      </div>
      {deleteModalID == film.id && (
        <dialog open className="modal">
          <div className="modal-box bg-dark text-center">
            <h3 className="text-white font-outfit text-heading-m">Delete</h3>
            <p className="py-4 text-white font-outfit text-body-m">
              Are you sure you want to delete this film?
            </p>
            <div className="grid grid-cols-2 place-items-center">
              <button className="btn bg-red w-32" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn bg-[#5A698F] w-32" onClick={() => setDeleteModalID("")}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      <ToastContainer />
    </>
  );
}

export default DeleteButton;