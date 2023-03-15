import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import AddInfo from './components/addInfo';
import TeacherMain from './components/teacherMain';
import StudentMain from './components/studentMain';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/add-info" element={ <AddInfo /> } />
      <Route path="/teacher-calendar" element={ <TeacherMain /> } />
      <Route path="/student-calendar" element={ <StudentMain /> } />
    </Routes>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
