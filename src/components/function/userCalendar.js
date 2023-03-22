import Calendar from 'react-calendar';
import { motion } from 'framer-motion';

export default function UserCalendar({ eventList, displayContent, setDisplayContent, currentDay, setCurrentDay, currentMonth, setCurrentMonth, currentYear, setCurrentYear}) {

  const onChange = (action) => {
    setCurrentDay(1);
    if (action === "next") {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (action === "prev") {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  }

  const tileContent = (date) => {
    return (
      <>
        <div className="h-[10px] text-[12px]">
          { !eventList[date.getDate()].length ? "" : eventList[date.getDate()].length }
        </div> 
      </>
    )
  }

  const onClickDay = (date, event) => {
    const day = date.getDate();
    setCurrentDay(day);
    setDisplayContent((displayContent) => {
      return {...displayContent, next: eventList[day]};
    })
    if (eventList[day].length) {
      setDisplayContent((displayContent) => {
        return {...displayContent, open: Array(displayContent.next.length).fill(false), id: Array(displayContent.next.length).fill(Math.random())}
      }) 
    } else {
      setDisplayContent((displayContent) => {
        return {...displayContent, open: Array(displayContent.initial.length).fill(false), id: Array(displayContent.initial.length).fill(Math.random())}
      })
    }
  }

  return (
    <motion.div 
      className="drop-shadow-xl mt-[10vh]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 1.5,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <Calendar 
        onActiveStartDateChange={ ({ action, activeStartDate, value, view}) => onChange(action) }
        tileContent={ ({date}) => tileContent(date) }
        onClickDay={ (date, event) => onClickDay(date, event) }
        minDetail="month"
      />
    </motion.div>
  );
}