import { useRef, useEffect, useState } from "react";
import { collection, getDocs, query, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { motion } from "framer-motion";

export default function DisplayGroupMenu({ action, setAction }) {

  const [group, setGroup] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);

  const refMenu = useRef(null);
  const handleClickOutsideMenu = (event) => {
    if (refMenu.current && !refMenu.current.contains(event.target)) {
      setAction((action) => {
        const newAction = {...action};
        for (const action in newAction) newAction[action] = false;
        return newAction;
      })
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutsideMenu, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideMenu, true);
    };
  }, []);

  const getGroup = async() => {
    const email = localStorage.getItem("email");
    const list = await getDocs(query(collection(db, email + "/info/groups")));
    list.forEach((doc) => {
      setGroup((group) => {
        return [...group, doc.data()];
      })
    })    
  }

  useEffect(() => {
    getGroup();
  }, [])

  const onClick = (index) => {
    setOpenIndex(index);
  }

  return (
    <>
      {action.displayGroup && 
        <div className="absolute h-[100%] w-[100%] bg-black/50 flex justify-center items-center">
          <motion.div 
            ref={refMenu} 
            className="h-[70%] w-[60%] bg-white/100 rounded-lg drop-shadow-2xl grid grid-cols-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.5,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <div className="h-[100%] w-[100%] flex flex-col justify-start items-center overflow-auto scrollbar-hide gap-[2.5%] pt-[2.5%]">
              {group.map((value, index) => {
                return (
                  <button 
                    key={index} 
                    className="h-[12.5%] w-[95%] bg-[#D27685] border-4 border-[#9E4784] rounded-md shrink-0"
                    onClick={() => onClick(index)}
                  >
                    {value.groupName}
                  </button>
                );
              })}
            </div>
            {openIndex < group.length && 
              <div className="h-[100%] w-[100%] flex flex-col justify-start items-center overflow-auto scrollbar-hide gap-[2.5%] pt-[2.5%]">
                {group[openIndex].groupMember.map((value, index) => {
                  return (
                    <div 
                      key={index}
                      className="h-[12.5%] w-[95%] bg-[#D27685] border-4 border-[#9E4784] rounded-md shrink-0 flex justify-center items-center"
                    >
                      {value.name}-{value.email}
                    </div>
                  );
                })}
              </div>
            }
          </motion.div>
        </div>
      }
    </>
  );

}