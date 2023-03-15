import student from "./student.png";
import teacher from "./teacher.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

export default function AddInfo() {

  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);

  const navigate = useNavigate();

  const onClick = async(role) => {
    setLoading(true);
    const email = localStorage.getItem("email");
    await setDoc(doc(db, email + '/info'), { role }, { merge: true }).catch((error) => console.log(error));
    setLoading(false);
    if (role === "teacher") navigate("/teacher-calendar");
    else if (role === "student") navigate("/student-calendar")
  }

  return (
    <div className="h-screen grid grid-rows-6 grid-cols-9 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide">
      <div className="col-start-1 col-span-9 row-start-2 row-span-4 flex justify-center items-center gap-[5vw]">
        <button 
          className="h-[65vh] w-[25vw] flex flex-col justify-center items-center bg-white rounded-[20px] shadow-xl hover:scale-[1.05]"
          onClick={() => onClick("student")}
        >
          <img src={student} className="h-[30vh]" alt=""/>
          <div className="flex justify-start items-center mt-[2.5vh] font-['consolas'] font-bold text-[25px]">
            Học sinh
          </div>
          <div className="mt-[1vh] font-['consolas'] text-[20px]"> 
            Xem bài tập
          </div>
        </button>
        <button 
          className="h-[65vh] w-[25vw] flex flex-col justify-center items-center bg-white rounded-[20px] shadow-xl hover:scale-[1.05]"
          onClick={() => onClick("teacher")}
        >
          <img src={teacher} className="h-[30vh]" alt=""/>
          <div className="flex justify-start items-center mt-[2.5vh] font-['consolas'] font-bold text-[25px]">
            Giáo viên
          </div>
          <div className="mt-[1vh] font-['consolas'] text-[20px]"> 
            Xem, gửi bài tập
          </div>
        </button>
      </div>
    </div>
  );
}