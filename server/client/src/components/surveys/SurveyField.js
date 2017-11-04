// contains logic to render a single label and text input

import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className="input-field" style={{ marginTop: "50px" }}>
      <label className="labels" style={{ fontSize: "18px" }}>
        {label}
      </label>
      <input className="white-text" type="text" style={{ marginBottom: "5px" }} {...input} autocomplete="off" />
      <div className="red-text" style={{ marginBottom: "5px" }}>
        {touched && error}
      </div>
    </div>
  );
};
