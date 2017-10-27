// contains logic to render a single label and text input

import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div style={{ marginTop: "50px" }}>
      <label style={{ fontSize: "18px" }}>{label}</label>
      <input style={{ marginBottom: "5px" }} {...input} />
      <div className="red-text" style={{ marginBottom: "5px" }}>
        {touched && error}
      </div>
    </div>
  );
};
