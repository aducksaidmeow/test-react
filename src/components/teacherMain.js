import React, { useEffect, useState } from 'react';
import { db } from "../firebaseConfig"
import { getDocs, collection, query, where } from "firebase/firestore"
import RenderContent from './function/renderContent';
import UserCalendar from './function/userCalendar';
import AddEventButton from './function/addEventButton';
import AddEventMenu from './function/addEventMenu';
import AddGroupButton from './function/addGroupButton';
import AddGroupMenu from './function/addGroupMenu';
import DisplayGroupButton from './function/displayGroupButton';
import DisplayGroupMenu from './function/displayGroupMenu';
import ResetDisplayContentButton from './function/resetDisplayContentButton';
import Notification from './function/notification';
import "./react-calendar.css"

export default function TeacherMain() {

  const [eventList, setEventList] = useState(Array.from(Array(50), () => new Array(0)));
  const [displayContent, setDisplayContent] = useState({
    initial: [],
    next: [],
    open: [],
    id: [],
  })
  const [action, setAction] = useState({
    addEvent: false,
    addGroup: false,
    displayGroup: false,
  })
  const [errorCode, setErrorCode] = useState("");

  const [currentDay, setCurrentDay] = useState((new Date()).getDate());
  const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth() + 1);
  const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());

  const todayDay = (new Date()).getDate();
  const todayMonth = (new Date()).getMonth() + 1;
  const todayYear = (new Date()).getFullYear();
  const maxDate = (new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0)).getDate();

  const getEvent = async(year, month) => {
    setEventList(Array.from(Array(50), () => new Array(0)));
    //setEventLoading(true);
    let clear = false;
    const email = localStorage.getItem("email");
    const q = query(
      collection(db, email + '/info/events'), 
      where("month", "==", month), 
      where("year", "==", year)
    );
    const list = await getDocs(q);
    list.forEach((doc) => {
      setEventList((eventList) => {
        const newEventList = [...eventList];
        newEventList[doc.data().day].push(doc.data());
        return newEventList;
      })
      if (doc.data().day >= todayDay && doc.data().day <= Math.min(maxDate, todayDay + 6) && doc.data().month === todayMonth && doc.data().year === todayYear) {
        if (!clear) {
          setDisplayContent((displayContent) => { 
            return {...displayContent, initial: []}
          })
          clear = true;
        }
        setDisplayContent((displayContent) => {
          return {...displayContent, initial: [...displayContent.initial, doc.data()]}
        })
      }
    })
    setDisplayContent((displayContent) => {
      return {...displayContent, open: Array(displayContent.initial.length).fill(false), id: Array(displayContent.initial.length).fill(Math.random())};
    })
    setDisplayContent((displayContent) => {
      const newDisplayContent = {...displayContent};
      newDisplayContent.initial.sort((a, b) => {
        if (a.year === b.year && a.month === b.month) return a.day < b.day ? -1 : 1;
        else if (a.year === b.year) return a.month < b.month ? -1 : 1;
        else return a.year < b.year ? -1 : 1;
      })
      return newDisplayContent;
    })
    //setEventLoading(false);
  }

  useEffect(() => {
    getEvent(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  return (
    <div className="h-screen grid grid-cols-3 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide relative">
      <Notification errorCode={errorCode} setErrorCode={setErrorCode} />
      <div className="col-start-1 col-span-2 flex justify-center items-center">
        <RenderContent displayContent={displayContent} setDisplayContent={setDisplayContent} />
      </div>
      <div className="col-start-3 col-span-1">
        <UserCalendar 
          eventList={eventList} 
          displayContent={displayContent} setDisplayContent={setDisplayContent}
          currentDay={currentDay} setCurrentDay={setCurrentDay} 
          currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}
          currentYear={currentYear} setCurrentYear={setCurrentYear}
        />
        <div className="h-[10%] w-[100%] mt-[5%] flex gap-[5%]">        
          <AddEventButton action={action} setAction={setAction} />
          <AddGroupButton action={action} setAction={setAction} />
          <DisplayGroupButton action={action} setAction={setAction} />
          <ResetDisplayContentButton displayContent={displayContent} setDisplayContent={setDisplayContent} />
        </div>
      </div>
      <AddEventMenu 
        action={action} setAction={setAction} 
        errorCode={errorCode} setErrorCode={setErrorCode}
        currentDay={currentDay} currentMonth={currentMonth} currentYear={currentYear} 
      />
      <AddGroupMenu 
        action={action} setAction={setAction} 
        errorCode={errorCode} setErrorCode={setErrorCode}
      />
      <DisplayGroupMenu 
        action={action} setAction={setAction} 
      />
    </div>
  );
}