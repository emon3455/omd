import React from "react";

const CCheckBoxRadio = ({
  type,
  id,
  name,
  className,
  label,
  defaultChecked,
  onClick,
}) => {
  return (
    <>
      <input
        onClick={onClick}
        type={type}
        name={name}
        id={id}
        defaultChecked={defaultChecked}
        className={className}
      />
      <label htmlFor={label?.toLowerCase()}>{label}</label>
    </>
  );
};

export default CCheckBoxRadio;
