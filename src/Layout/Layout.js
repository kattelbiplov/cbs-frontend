import React from "react";
import '../Styles/Layout.css'
import Sidebar from "../Components/Sidebar";
import {Routes, Route} from 'react-router-dom';
import CreateEndpoint from "../Pages/CreateEndpoint";
import DynamicForm from "../Pages/DynamicForm"; 
import CreateAPI from "../Pages/CreateAPI";

const Layout = () =>{
    return(
        <>
        <div className="layout-part">
            <div className="layout-left">
            <Sidebar />
            </div>
            <div className="layout-right">
              <Routes>
              <Route  path="/" element={<CreateAPI />} />
              <Route  path="/create-endpoints" element={<CreateEndpoint />} />
              <Route path="/view-endpoints" element={<DynamicForm />} />
              </Routes>
            </div>
        </div>
        </>
    );
}

export default Layout