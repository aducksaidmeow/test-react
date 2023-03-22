import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginPicture from "./login-picture.png";
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { db } from '../firebaseConfig';
import { motion, AnimatePresence } from "framer-motion";

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

    //navigate("/add-info")

    setLoading(false);
    setRemove(true);
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
      <AnimatePresence>
      {!remove && 
        <motion.div 
          className="col-start-4 col-span-3 row-start-2 row-span-5 flex items-end"
          key="image"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.5,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          exit={{ scale: 0 }}
        >
          <img src={loginPicture} alt="" />
        </motion.div> 
      }
      </AnimatePresence>

      <div className="col-start-1 col-span-3 row-start-2 row-span-3 flex flex-col justify-center items-center">
      <AnimatePresence>
        {!remove && 
          <motion.div 
            key="title"
            className="text-[55px] font-bold font-Philosopher-Regular"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.5,
              delay: 1.5,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            exit={{ scale: 0 }}
          >
            Homework Reminder
          </motion.div> 
        } 
        </AnimatePresence>
        <form 
          className="h-[35vh] w-[30vw] flex justify-center flex-col gap-[2.5vh]"
          onSubmit={(e) => onSubmit(e)}
        >
          <AnimatePresence onExitComplete={() => navigate("/add-info")}>
          {!remove && 
            <motion.input 
              key="email"
              type="text" 
              placeholder="Email"
              className="shadow appearance-none border rounded w-full h-[7.5vh] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setState(e.target.value, setEmail)}
              initial={{ y: 1000 }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.5,
                delay: 2,
                type: "spring",
                stiffness: 260,
                damping: 50,
              }}
              exit={{ y: -1000 }}
            /> 
          }
          
          {!remove && 
            <motion.input 
              key="password"
              type="text" 
              placeholder="Password"
              className="shadow appearance-none border rounded w-full h-[7.5vh] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setState(e.target.value, setPassword)}
              initial={{ y: 1000 }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.5,
                delay: 2.25,
                type: "spring",
                stiffness: 260,
                damping: 50,
              }}
              exit={{ y: -1000 }}
            /> 
          }

          {!remove && 
            <motion.input 
              key="submit"
              type="submit" 
              className="bg-[#BE6DB7] hover:bg-[#E384FF] h-[7.5vh] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              onChange={(e) => setState(e.target.value, setPassword)}
              initial={{ y: 1000 }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.5,
                delay: 2.5,
                type: "spring",
                stiffness: 260,
                damping: 50,
              }}
              exit={{ y: -1000 }}
            /> 
          }
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}