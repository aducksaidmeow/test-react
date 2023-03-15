import { useRef, useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig";

export default function AddGroupMenu({ action, setAction, errorCode, setErrorCode }) {

  const [groupName, setGroupName] = useState("")
  const [groupMember, setGroupMember] = useState([{ email: "", name: "" }])
  const [key, setKey] = useState([0]);
  const [counter, setCounter] = useState(1);

  const refMenu = useRef(null);

  const resetAction = () => {
    setAction((action) => {
      const newAction = {...action};
      for (const action in newAction) newAction[action] = false;
      return newAction;
    })
  }

  const handleClickOutsideMenu = (event) => {
    if (refMenu.current && !refMenu.current.contains(event.target)) {
      resetAction();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideMenu, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideMenu, true);
    };
  }, []);

  const onChangeGroupName = (e) => {
    setGroupName(e.target.value);
  }

  const onChangeGroupMember = (index, position, value) => {
    setGroupMember((groupMember) => {
      const newGroupMember = [...groupMember];
      newGroupMember[index][position] = value;
      return newGroupMember;
    })
  }

  const onDelete = (index) => {
    setGroupMember((groupMember) => {
      const newGroupMember = [...groupMember];
      newGroupMember.splice(index, 1);
      return newGroupMember;
    })
    setKey((key) => {
      const newKey = [...key];
      newKey.splice(index, 1);
      return newKey;
    })
  }

  const onAdd = () => {
    setGroupMember((groupMember) => {
      return [...groupMember, {email: "", name: ""}];
    })
    setCounter((counter) => {
      return counter + 1;
    })
    setKey((key) => {
      return [...key, counter];
    })
  }

  const onSubmit = async() => {
    if (groupName === "") {
      setErrorCode("Missing group name");
      //resetAction();
      return;
    }
    var missing = 0;
    groupMember.forEach((value) => {
      if (value.name === "") {
        missing = 1;
      } else if (value.email === "") {
        missing = 2;
      }
    })
    if (missing === 1) {
      setErrorCode("Missing member name");
      //resetAction();
      return;
    }
    if (missing === 2) {
      setErrorCode("Missing member email");
      //resetAction();
      return;
    }
    const email = localStorage.getItem("email");
    await setDoc(doc(db, email + '/info/groups/' + groupName), {groupMember, groupName}).catch((error) => console.log(error));
    setErrorCode("Success");
    resetAction();
  }

  return (
    <>
      {action.addGroup && 
        <div className="absolute h-[100%] w-[100%] bg-black/50 flex justify-center items-center">
          <div ref={refMenu} className="h-[70%] w-[60%] bg-white/100 rounded-lg drop-shadow-2xl">
            <form className="h-[100%] w-[100%] flex flex-col justify-start items-center gap-[2.5%] pt-[2.5%] overflow-auto scrollbar-hide">
              <input 
                placeholder=" Group name" 
                className="w-[30%] h-[10%] bg-[#91D8E4] border-4 border-[#82AAE3] rounded-md focus:outline-none shrink-0"
                onChange={(e) => onChangeGroupName(e)}
              />
              {groupMember.map((value, index) => {
                return (
                  <div key={key[index]} className="h-[10%] w-[100%] flex justify-center items-center gap-[2.5%] shrink-0">
                    <input 
                      placeholder=" Email" 
                      className="h-[100%] w-[30%] bg-[#91D8E4] border-4 border-[#82AAE3] rounded-md focus:outline-none"
                      onChange={(e) => onChangeGroupMember(index, "email", e.target.value)}
                    />
                    <input 
                      placeholder=" Name" 
                      className="h-[100%] w-[30%] bg-[#91D8E4] border-4 border-[#82AAE3] rounded-md focus:outline-none"
                      onChange={(e) => onChangeGroupMember(index, "name", e.target.value)}
                    />
                    {index > 0 && 
                      <button 
                        className="h-[100%] w-[5%] bg-[#DC0000] border-2 border-[#850000] rounded-md"
                        onClick={() => onDelete(index)}
                      >-</button>
                    }
                    {!index && 
                      <div className="h-[100%] w-[5%] opacity-0">
                      </div>
                    }
                    {index === groupMember.length - 1 && index < 50 && 
                      <button 
                        className="h-[100%] w-[5%] bg-[#609966] border-2 border-[#40513B] rounded-md"
                        onClick={() => onAdd()}
                      >+</button>
                    }
                    {index < groupMember.length - 1 && 
                      <div className="h-[100%] w-[5%] opacity-0">
                      </div>
                    }
                  </div>
                );
              })}
              <button 
                className="h-[10%] w-[30%] bg-[#CDE990] border-4 border-[#AACB73] rounded-md"
                onClick={() => onSubmit()}
              >Submit</button>
            </form>
          </div>
        </div>
      }
    </>
  );
}