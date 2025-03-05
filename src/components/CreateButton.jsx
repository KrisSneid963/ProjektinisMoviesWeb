import Edit from "../assets/icon-edit.svg?react";
import Form from "./Form";

function CreateButton() {
  return (
    <>
      <div className="create-button">
        <button
          className="create-icon"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          <h2 className="text-heading-s">Create</h2>
          <Edit />
        </button>
      </div>
      <dialog id="my_modal_4" className="modal ">
        <div className="modal-box bg-dark text-center">
          <Form />
          <form method="dialog">
            <button className="btn bg-[#5A698F] w-32">Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default CreateButton;
