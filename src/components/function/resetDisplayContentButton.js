import ReturnArrow from "./return-arrow.png";
import { motion } from "framer-motion";

export default function ResetDisplayContentButton({ displayContent, setDisplayContent }) {

  const onClick = () => {
    setDisplayContent((displayContent) => {
      const newDisplayContent = {...displayContent};
      newDisplayContent.next = [];
      newDisplayContent.open = Array(displayContent.initial.length).fill(false);
      return newDisplayContent;
    })
  }

  return (
    <>
      {displayContent.next.length > 0 &&   
        <motion.button 
          className="h-[100%] w-[15%] bg-white rounded-lg flex justify-center items-center"
          onClick={() => onClick()}
          whileHover={{
            scale: 1.1,
            transition: {
              duration: 0.5,
            }
          }}
        >
          <img src={ReturnArrow} alt="" className="h-[80%] aspect-square" />
        </motion.button>
      }
    </>
  );
}