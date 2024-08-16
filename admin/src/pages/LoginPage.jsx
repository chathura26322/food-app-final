import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const loginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        data
      );
      if (response.data.success) {
        const recivedToken = response.data.token;
        setToken(recivedToken);
        localStorage.setItem("token", recivedToken);
        toast.success("Login Successfull");

        navigate("/secondPage");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("Failed to login");
    }
  };

  return (
    <div className="absolute z-[5] w-[100%] h-[100%] bg-gradient-to-r from-[#f5f3e8] from-2% to-white to-9% grid ">
      <form
        onSubmit={onLogin}
        className="place-self-center w-[330px] bg-transparent decoration-white flex flex-col gap-[25px] px-[25px] py-[30px] border-[2px] rounded-[10px] text-[14px] transition duration-500  hover:scale-105 "
      >
        <div className="flex justify-between items-center decoration-black">
          <h2 className="text-[#A70604] font-bold text-2xl">Login Here</h2>
        </div>
        <div className="flex flex-col gap-[20px]">
          <p className="text-gray-700 font-medium ">Name</p>
          <input
            className="border-[1px] border-solid border-[#c9c9c9] rounded-[4px] p-[10px]"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter your Email"
            required
          />
          <p className="text-gray-700 font-medium ">Password</p>
          <input
            className="border-[1px] border-solid border-[#c9c9c9] rounded-[4px] p-[10px]"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter your Password"
            required
          />

          <button
            className="bg-[#A70604] text-white p-2 items-center rounded-[10px] mt-2 hover:bg-black"
            type="submit"
          >
            Login Here
          </button>
        </div>
      </form>
    </div>
  );
};

export default loginPage;
