

import React from "react";
 import Header from "./UI/Header";
 import Footer from "./UI/Footer";

const Layout = (props) => {
  return (
   
      <div>
        <main >
         
            {/* <Sidebar/> */}
            <Header />
            <div >{props.children}</div>
       
        </main>
      </div>
    
  );
};

export default Layout;
