import React from "react";
import { Link } from "react-router-dom";

function ReduceBills() {
  const text = {
    boxShadow: "1px 4px 4px 0px #00000040",
  };

  return (
    <div className="my-5 grid justify-center mx-auto max-w-3xl lg:gap-5">
      <h1 className="nline-block text-center text-transparent text bg-gradient-to-r from-[#1A2569] to-[#009A38] bg-clip-text   text-2xl lg:text-4xl font-bold">
        Get Relief From Hospital Bills
      </h1>
      <div className="p-4 lg:p-6 grid rounded-md" style={text}>
        <Link
          to="https://dollarfor.org/"
          className="text-blue-500  text-sm justify-self-end py-2"
        >
          Click This Link  
        </Link>
        <p className="text-[#3C4A3D] ">
          The Affordable Care Act requires nonprofit hospitals to offer charity
          care programs to keep their tax-exempt status. These financial
          assistance programs reduce or eliminate medical bills for
          low-to-middle income patients.
          <br />
          <br />
          Unfortunately, hospitals hold all the power. There is almost no
          federal oversight of charity care, so most hospitals do the bare
          minimum to educate patients about these programs. A recent
          study showed that 72% of nonprofit hospitals spent less on charity
          care and community investment than they received in tax breaks.
          Nonprofit hospitals in 2018 received a combined $17 billion in tax
          breaks that were not passed on as community benefits.
          <br />
          <br />
          OptimalMD is here to help. We educate patients about these programs,
          help patients navigate the application process, and call out hospitals
          that don’t follow regulations.
          <br />
          <br />
          Our work is entirely funded through philanthropic grants and
          donations. Our services are completely free – no strings attached.
        </p>
      </div>
    </div>
  );
}

export default ReduceBills;
