import React from "react";

const Loader = () => {
  return (
    <div>
      <div class="d-flex justify-content-center text-primary">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
