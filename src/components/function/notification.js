import { motion } from "framer-motion";

export default function Notification({ errorCode, setErrorCode }) {

  const color = () => {
    if (errorCode === "Success") return "bg-[#539165]";
    else return "bg-[#F16767]";
  }

  return (
    <div className="absolute w-screen h-[7.5%] flex justify-center items-center z-10">
      {errorCode !== "" && 
        <motion.div 
          className={`${color()} h-[70%] w-[40%] flex justify-center items-center rounded-lg`}
          onClick={() => setErrorCode("")}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.5,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {errorCode}
        </motion.div>
      }
    </div>
  );
}