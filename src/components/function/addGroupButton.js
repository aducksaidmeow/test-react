import addGroup from "./add-group.png"

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
    <button 
      className="h-[100%] w-[15%] bg-white rounded-lg flex justify-center items-center"
      onClick={() => onClick()}
    >
      <img src={addGroup} alt="" className="h-[80%] aspect-square"/>
    </button>
  );
}