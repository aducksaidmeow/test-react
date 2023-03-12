import { useRef, useEffect, useState } from "react";
import { collection, getDocs, query, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import 'react-day-picker/dist/style.css';

export default function AddEventMenu({action, setAction, currentDay, currentMonth, currentYear}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupIndex, setGroupIndex] = useState(-1);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const day = currentDay;
  const month = currentMonth;
  const year = currentYear;

  const onChange = (value, setState) => {
    setState(value);
  }

  const [group, setGroup] = useState([]);
  const [openGroup, setOpenGroup] = useState(false);

  const refMenu = useRef(null);
  const refGroup = useRef(null);

  const handleClickOutsideMenu = (event) => {
    if (refMenu.current && !refMenu.current.contains(event.target)) {
      setAction((action) => {
        const newAction = {...action};
        for (const action in newAction) newAction[action] = false;
        return newAction;
      })
    }
  }
  const handleClickOutsideGroup = (event) => {
    if (refGroup.current && !refGroup.current.contains(event.target)) {
      setOpenGroup(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideMenu, true);
    document.addEventListener('click', handleClickOutsideGroup, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideMenu, true);
      document.removeEventListener('click', handleClickOutsideGroup, true);
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

  const onChangeFile = (e) => {
    console.log(e);
    setFile(e.target.files.length ? e.target.files[0] : null);
    setFileName(e.target.files.length ? e.target.files[0].name : "");
  }

  const onSubmit = async() => {
    const email = localStorage.getItem("email");
    var URL = "";
    if (file !== null) {
      await uploadBytes(ref(storage, email + '/' + fileName), file);
      URL = await getDownloadURL(ref(storage, email + '/' + fileName));
      console.log(URL);
    }
    const currentGroup = group[groupIndex].groupMember.filter((value, index) => value.email !== email);
    currentGroup.push({ email: email, name: "" });
    const groupName = group[groupIndex].groupName;
    const promise = await currentGroup.map(async(value, index) => {
      const email = value.email;
      return await addDoc(collection(db, email + '/info/events'), { title, description, day, month, year, URL, fileName, groupName });
    })
    await Promise.all(promise).catch((error) => console.log(error.message));
  }

  return (
    <>
      {action.addEvent && 
        <div className="absolute h-[100%] w-[100%] bg-black/50 flex justify-center items-center">
          <div ref={refMenu} className="h-[60%] w-[60%] bg-white/100 rounded-lg drop-shadow-2xl">
            <form className="h-[100%] w-[100%] flex justify-center items-center gap-[2.5%]">
              <div className="w-[45%] h-[90%] flex flex-col justify-start items-center gap-[5%] pt-[5%]">
                <input 
                  className="w-[100%] h-[15%] bg-[#FFBFA9] border-4 border-[#FFACAC] rounded-md focus:outline-none" 
                  onChange={(e) => onChange(e.target.value, setTitle)}
                  placeholder=" Title"
                />
                <input 
                  className="w-[100%] h-[60%] bg-[#FFBFA9] border-4 border-[#FFACAC] rounded-md focus:outline-none" 
                  onChange={(e) => onChange(e.target.value, setDescription)}
                  placeholder=" Description"
                />
              </div>
              <div className="h-[90%] w-[0.5%] bg-[#EDDBC7] drop-shadow-sm rounded-sm"></div>
              <div className="relative w-[45%] h-[90%] flex flex-col justify-start items-center gap-[1%] pt-[5%] gap-[5%]">
                <button className="w-[100%] h-[15%] bg-[#FFBFA9] border-4 border-[#FFACAC] rounded-md" onClick={() => setOpenGroup(true)}>
                  {groupIndex === -1 ? "" : group[groupIndex].groupName}
                </button>
                {openGroup && <div ref={refGroup} className="absolute z-10 h-[50%] w-[100%] bg-white rounded-md overflow-auto scrollbar-hide">
                  {group.map((value, index) => {
                    return (
                      <>
                        <button 
                          key={index} 
                          className="h-[25%] w-[100%] shadow-sm shrink-0"
                          onClick={() => { setGroupIndex(index); setOpenGroup(false); }}
                        >
                          {value.groupName}
                        </button>
                      </>
                    );
                  })}
                </div>}
                <div className="w-[100%] h-[15%] bg-[#FFBFA9] border-4 border-[#FFACAC] rounded-md flex justify-center items-center">{currentDay}-{currentMonth}-{currentYear}</div>
                <input type="file" onChange={(e) => onChangeFile(e)} />
                <button 
                  type="submit" 
                  className="w-[100%] h-[15%] bg-[#CDE990] border-4 border-[#AACB73] rounded-md"
                  onClick={() => onSubmit()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
}