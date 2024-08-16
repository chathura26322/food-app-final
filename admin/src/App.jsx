import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import SecondPage from "./pages/SecondPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/secondPage" element={<SecondPage />} />
    </Routes>
  );
};

export default App;
