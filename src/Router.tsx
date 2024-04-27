import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentApp from "./components/PaymentApp";
import RegisteredPage from "./components/RegisteredPage";

const Router = () => {
  return (
    <BrowserRouter basename="/react-payments/dist/">
      <Routes>
        <Route path="/" element={<PaymentApp />} />
        <Route path="/registered" element={<RegisteredPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
