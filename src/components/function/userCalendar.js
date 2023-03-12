import Calendar from 'react-calendar';

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
        return {...displayContent, open: Array(displayContent.next.length).fill(false)}
      }) 
    } else {
      setDisplayContent((displayContent) => {
        return {...displayContent, open: Array(displayContent.initial.length).fill(false)}
      })
    }
  }

  return (
    <div className="drop-shadow-xl mt-[10vh]">
      <Calendar 
        onActiveStartDateChange={ ({ action, activeStartDate, value, view}) => onChange(action) }
        tileContent={ ({date}) => tileContent(date) }
        onClickDay={ (date, event) => onClickDay(date, event) }
        minDetail="month"
      />
    </div>
  );
}