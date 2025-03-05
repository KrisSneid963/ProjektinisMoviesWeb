import { useContext } from "react";
import Edit from "../assets/icon-edit.svg?react";
import Form from "./Form";
import { ThemeContext } from "../helpers/themeContext";

function EditButton({ film }) {
  const { editModalID, setEditModalID } = useContext(ThemeContext);
  return (
    <>
      <div className="edit-button">
        <button
          className="edit-icon"
          onClick={() => {
            setEditModalID(film.id);
          }}
        >
          <Edit />
        </button>
      </div>

      {editModalID == film.id && (
        <dialog open className="modal">
          <div className="modal-box bg-dark text-center">
            <Form film={film} />
            <form method="dialog">
              <button
                className="btn bg-[#5A698F] w-32"
                onClick={() => {
                  setEditModalID("");
                }}
              >
                Close
              </button>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}

export default EditButton;
