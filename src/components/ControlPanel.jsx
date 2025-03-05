import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

function ControlPanel({ film }) {
  return (
    <div>
      <div className="flex flex-col justify-between items-center absolute left-0 p-2 -z-0 h-[90%] top-1/2 bottom-1/2 -translate-y-1/2 ml-2 md:ml-2 w-12 bg-dark bg-opacity-75 rounded-full"></div>
      <DeleteButton film={film} />
      <EditButton film={film} />
    </div>
  );
}

export default ControlPanel;
