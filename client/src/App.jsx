import Products from "./components/Products";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import "./index.css";
import ProductView from "./components/ProductView";

export function App() {


  if(!Telegram.WebApp.initData)

  return (
    <div className="p-4">
      <h1 className="text-red-500">
        Oops! Telegram initData is missing!
      </h1>
      <p className="text-base-400 mt-2">
        This is a Telegram Mini App, conent is only visible inside Telegram 
      </p>
    </div>
  )

  return (
    <div className="app h-screen overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:productId" element={<ProductView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
