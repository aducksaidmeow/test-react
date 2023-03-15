import addEvent from "./add-event.png"

export default function AddEventButton({ action, setAction }) {

  const onClick = () => {
    setAction((action) => {
      const newAction = {...action};
      for (const action in newAction) newAction[action] = false;
      newAction.addEvent = true;
      return newAction;
    })
  }

  return (
    <button 
      className="h-[100%] w-[15%] bg-white rounded-lg flex justify-center items-center"
      onClick={() => onClick()}
    >
      <img src={addEvent} alt="" className="h-[80%] aspect-square"/>
    </button>
  );
}