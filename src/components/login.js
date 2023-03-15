import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginPicture from "./login-picture.png";
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { db } from '../firebaseConfig';

export default function Login() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const setState = (value, setState) => {
    setState(value);
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if (email === "") {
      setError("Empty email");
      return;
    } 
    if (password === "") {
      setError("Empty password");
      return;
    }
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password).catch((error) => console.log(error));
    const userCredential = await signInWithEmailAndPassword(auth, email, password).catch((error) => console.log(error));

    const refreshToken = userCredential._tokenResponse.refreshToken;
    localStorage.setItem("refreshToken", refreshToken);

    const uid = userCredential.user.uid;
    localStorage.setItem("uid", uid);

    localStorage.setItem("email", email);

    await setDoc(doc(db, email + '/info'), { uid }, { merge: true }).catch((error) => console.log(error));

    navigate("/add-info")

    setLoading(false);
  }

  return(
    <div className="h-screen grid relative grid-rows-6 grid-cols-6 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide">
      {error !== "" && 
        <div className="absolute h-[5vh] w-screen flex justify-center items-center mt-[1vh]">
          <div className="bg-[#EB455F] h-[100%] w-[35%] flex justify-center items-center rounded-lg font-Philosopher-Regular text-[20px]">
            {error}
          </div>  
        </div>      
      }
      {loading && 
        <div className="absolute h-[5vh] w-screen flex justify-center items-center mt-[1vh]">
          <div className="bg-[#B3FFAE] h-[100%] w-[35%] flex justify-center items-center rounded-lg font-Philosopher-Regular text-[20px]">
            Đang xử lí
          </div>
        </div>
      }
      {!remove && <div className="col-start-4 col-span-3 row-start-2 row-span-5 flex items-end">
        <img src={loginPicture} alt=""/>
      </div> }
      <div className="col-start-1 col-span-3 row-start-2 row-span-3 flex flex-col justify-center items-center">
        {!remove && <div className="text-[55px] font-bold font-Philosopher-Regular">
            Homework Reminder
        </div> } 
        {/*{!remove && <div>
          <button className="
            h-[10vh] w-[24vw] bg-[#FFFBE9] border-[#FB2576] border-2 shadow-xl flex justify-center items-center mt-[5vh]
            font-['consolas'] text-[20px] text-[#FB2576]
            hover:bg-[#EA047E] hover:text-[#FFFBE9] hover:scale-[1.05] hover:text-[20px]
            transition ease-in-out duration-150"
            //onClick={() => loginCall()}
          >
            Đăng nhập bằng Google 🔎  
          </button>
        </div> }*/}
        <form 
          className="h-[35vh] w-[30vw] flex justify-center flex-col gap-[2.5vh]"
          onSubmit={(e) => onSubmit(e)}
        >
     
          <input 
            type="text" 
            placeholder="Email"
            className="shadow appearance-none border rounded w-full h-[7.5vh] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setState(e.target.value, setEmail)}
          />
          
          <input 
            type="text" 
            placeholder="Password"
            className="shadow appearance-none border rounded w-full h-[7.5vh] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setState(e.target.value, setPassword)}
          />

          <input 
            type="submit" 
            className="bg-[#BE6DB7] hover:bg-[#E384FF] h-[7.5vh] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          />

        </form>
      </div>
    </div>
  );
}