import React from "react";
import Store from "./UI/Store";

const StoreLayout = (props) => {
  return (
    <div>
      <div>
        <main>
          <Store />

          <div>{props.children}</div>
        </main>
      </div>
    </div>
  );
};

export default StoreLayout;
