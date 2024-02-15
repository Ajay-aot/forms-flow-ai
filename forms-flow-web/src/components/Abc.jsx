import React from "react";
import { Route, Routes } from "react-router-dom";

const PrivateRoute  = ()=>{
    return <Routes>
        <Route path="" element={<h1>hi hello world</h1>}/>
    </Routes>
};

export default PrivateRoute;