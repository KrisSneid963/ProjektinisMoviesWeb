import { Link } from "react-router";

function SomethingWentWrong({ resetErrorBoundary }) {

    const handleReturnHome = () => {
        resetErrorBoundary();
      };
  return (
    <div className="w-1/2 m-auto text-center pt-[10rem] text-outfit text-heading-m">
      <h1 className="mb-[3rem]">
        Something went horribly wrong! Use this unique helping button to go back
        to the home page
      </h1>
      <Link to="home">
        <button className="p-4 bg-red text-dark" onClick={handleReturnHome}>Go back</button>
      </Link>
    </div>
  );
}

export default SomethingWentWrong;
