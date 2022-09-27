import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bottom-0 w-full z-0">
      <div className="flex flex-col sm:flex-row mt-5 items-center justify-center bg-blue-900 border-t shadow text-white text-sm">
        <div className="flex flex-row">
          <div className="mx-3 my-3 w-10">
            <Link to="#" className="hover:font-semibold font-normal">
              Terms
            </Link>
          </div>
          <div className="mx-3 my-3 w-10">
            <Link to="#" className="hover:font-semibold font-normal">
              Privacy
            </Link>
          </div>
          <div className="mx-3 my-3 w-10">
            <Link to="#" className="hover:font-semibold font-normal">
              Help
            </Link>
          </div>
        </div>
        <div className="mx-3 my-3 text-emerald-500">©️2022 Book Buddy</div>
      </div>
    </div>
  );
}

export default Footer;
