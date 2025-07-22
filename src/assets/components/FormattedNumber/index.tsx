import React from "react";

type FormattedNumberProps = {
  value: number;
};

const FormattedNumber: React.FC<FormattedNumberProps> = ({ value }) => {
  const [whole, decimal] = value.toFixed(2).split(".");

  const formattedWhole = parseInt(whole).toLocaleString("en-US");

  return (
    <span>
      {formattedWhole}
      <span style={{ opacity: 0.6, fontSize: "0.65em" }}>.{decimal} so'm</span>
    </span>
  );
};

export default FormattedNumber;
