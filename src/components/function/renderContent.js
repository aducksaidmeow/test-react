import { motion } from "framer-motion";

export default function RenderContent({ displayContent, setDisplayContent }) {

  const todayDay = (new Date()).getDate();
  const todayMonth = (new Date()).getMonth() + 1;
  const todayYear = (new Date()).getFullYear();
  const maxDate = (new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0)).getDate();

  const eventColor = (value, type) => {
    const numberOfDay = Math.floor(((new Date(value.year, value.month - 1, value.day)).getTime() - (new Date(todayYear, todayMonth - 1, todayDay)).getTime()) / (1000 * 60 * 60 * 24));
    if (numberOfDay < 0) return type === "primary" ? "bg-[#C8B6A6]" : "bg-[#C8B6A6]";
    else if (numberOfDay <= 1) return type === "primary" ? "bg-[#F16767]" : "bg-[#EC7272]";
    else if (numberOfDay <= 4) return type === "primary" ? "bg-[#FDD36A]" : "bg-[#F2CD5C]";
    else return type === "primary" ? "bg-[#609966]" : "bg-[#5F8D4E]";
  }

  const onClick = (index, type) => {
    setDisplayContent((displayContent) => {
      const newDisplayContent = {...displayContent};
      newDisplayContent.open[index] = !newDisplayContent.open[index];
      return newDisplayContent;
    })
  }

  return (
    <>  
      <motion.div 
        className="bg-[#FFFBEB] h-[80%] w-[80%] drop-shadow-xl rounded-xl flex flex-col items-center gap-[1.5%] pt-[1%] overflow-y-auto overflow-x-auto scrollbar-hide"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.5,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {(!displayContent.next.length ? displayContent.initial : displayContent.next).map((value, index) => {
          return (
            <>
              <motion.button 
                key={displayContent.id[index]} 
                className={`z-10 w-[97.5%] h-[12.5%] ${eventColor(value, "primary")} rounded-xl drop-shadow-xl flex items-center shrink-0`}
                onClick={() => onClick(index)}
                initial={{ y: 1000 }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.1*index,
                  duration: 1.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 40,
                }}
              >
                <h1 className="ml-[2.5%] mr-auto font-bold text-[150%]">{value.title}</h1>
                <h1 className="mr-[2.5%] ml-auto font-bold text-[125%]">{value.day}-{value.month}-{value.year}</h1>
              </motion.button>
              {displayContent.open[index] && 
                <motion.div 
                  className={`w-[95%] h-[40%] ${eventColor(value, "secondary")} rounded-xl drop-shadow-xl flex flex-col items-center pt-[1.25%] gap-[5%] shrink-0`}
                  initial={{ y: -50, scale: 0 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <div className="w-[97.5%] h-[65%] border-2 border-white/25 p-[1%] rounded-lg">
                    {value.description}
                  </div>
                  <button 
                    className="w-[97.5%] h-[22.5%] border-2 border-white/25 p-[1%] rounded-lg break-all overflow-hidden"
                    onClick={() => window.open(value.URL)}
                  > 
                    {value.fileName}
                  </button>
                </motion.div>
                
              }
            </>
          );
        })}
      </motion.div>
    </>
  )
}