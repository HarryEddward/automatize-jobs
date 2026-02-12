import { BiLoaderCircle } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin">
        <BiLoaderCircle size={40}/>
      </div>
    </div>
  );
};

export default Loader;