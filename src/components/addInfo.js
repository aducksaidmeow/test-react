import student from "./student.png";
import teacher from "./teacher.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

export default function AddInfo() {

  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [link, setLink] = useState("");

  const navigate = useNavigate();

  const onClick = async(role) => {
    setLoading(true);
    const email = localStorage.getItem("email");
    await setDoc(doc(db, email + '/info'), { role }, { merge: true }).catch((error) => console.log(error));
    if (role === "teacher") setLink("/teacher-calendar");
    else if (role === "student") setLink("/student-calendar")
    setLoading(false);
    setRemove(true);
    
  }

  return (
    <div className="h-screen grid grid-rows-6 grid-cols-9 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide">
      <div className="col-start-1 col-span-9 row-start-2 row-span-4 flex justify-center items-center gap-[5vw]">
        <AnimatePresence onExitComplete={() => navigate(link)}>
        {!remove &&
          <motion.button 
            key="student"
            className="h-[65vh] w-[25vw] flex flex-col justify-center items-center bg-white rounded-[20px] shadow-xl hover:scale-[1.05]"
            onClick={() => onClick("student")}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.5,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            exit={{ 
              scale: 0,
              transition: {
                duration: 1.5,
                delay: 0,
                type: "spring",
                stiffness: 260,
                damping: 40
              }
            }}
          >
            <img src={student} className="h-[30vh]" alt=""/>
            <div className="flex justify-start items-center mt-[2.5vh] font-['consolas'] font-bold text-[25px]">
              Học sinh
            </div>
            <div className="mt-[1vh] font-['consolas'] text-[20px]"> 
              Xem bài tập
            </div>
          </motion.button>
        }
        {!remove && 
          <motion.button 
            key="teacher"
            className="h-[65vh] w-[25vw] flex flex-col justify-center items-center bg-white rounded-[20px] shadow-xl hover:scale-[1.05]"
            onClick={() => onClick("teacher")}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            exit={{ 
              scale: 0,
              transition: {
                duration: 1.5,
                delay: 0,
                type: "spring",
                stiffness: 260,
                damping: 40,
              }
            }}
          >
            <img src={teacher} className="h-[30vh]" alt=""/>
            <div className="flex justify-start items-center mt-[2.5vh] font-['consolas'] font-bold text-[25px]">
              Giáo viên
            </div>
            <div className="mt-[1vh] font-['consolas'] text-[20px]"> 
              Xem, gửi bài tập
            </div>
          </motion.button> 
        }
        </AnimatePresence>
      </div>
    </div>
  );
}