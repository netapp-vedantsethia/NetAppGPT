import './App.css';
import './Header.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from './components/Header.js';
import Chat from "./components/Chat.js";
import Error from "./components/Error.js";
import Test from "./components/Test.js";


function App() {

  return (
    <div>
		<BrowserRouter>				
			<Header id="Main_menubar"></Header>
			<Routes>
				{/* Chat Route */}
				<Route path="/chat" element={<Chat />} />

				{/* Test Route */}
				<Route path="/test" element={<Test />} />

				{/* Default Route */}
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;

