import addGroup from "./add-group.png"
import { motion } from "framer-motion";

export default function AddGroupButton({ action, setAction }) {

  const onClick = () => {
    setAction((action) => {
      const newAction = {...action};
      for (const action in newAction) newAction[action] = false;
      newAction.addGroup = true;
      return newAction;
    })
  }

  return (
    <motion.button 
      className="h-[100%] w-[15%] bg-white rounded-lg flex justify-center items-center"
      onClick={() => onClick()}
      initial={{ x: 1000 }}
      animate={{ x : 0 }}
      transition={{
        delay: 0.5,
        duration: 1.5,
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}
      whileHover={{
        scale: 1.1,
        transition: {
          duration: 0.5,
        }
      }}
    >
      <img src={addGroup} alt="" className="h-[80%] aspect-square"/>
    </motion.button>
  );
}