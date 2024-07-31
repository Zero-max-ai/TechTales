import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import NotFoundSvg from "../assets/NotFound.svg"

const NotFound = () => {
  return (
    <Layout>
      <div className="h-[89vh] w-full flex max-md:flex-col items-center justify-center md:gap-10 max-md:gap-3">
        <img src={NotFoundSvg} className="w-60 md:hidden" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1 max-md:hidden">
            <span className="font-semibold text-3xl">404</span>
            <span className="font-semibold text-3xl">Page Not Found</span>
            </div>
            <Link to={"/"} className="font-thin bg-teal-800 hover:bg-teal-700 text-white rounded p-1 text-sm w-fit">Back to home</Link>
        </div>
        <img src={NotFoundSvg} className="w-60 max-md:hidden" />
      </div>
    </Layout>
  )
}

export default NotFound;
