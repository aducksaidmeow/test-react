import ReturnArrow from "./return-arrow.png";

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
        <button 
          className="h-[100%] w-[15%] bg-white rounded-lg flex justify-center items-center"
          onClick={() => onClick()}
        >
          <img src={ReturnArrow} alt="" className="h-[80%] aspect-square" />
        </button>
      }
    </>
  );
}