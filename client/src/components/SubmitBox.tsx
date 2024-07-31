type SubmitBox = {
  title: string;
  disable: boolean;
  onClick: () => string;
};

const SubmitBox = ({ title, disable, onClick }: SubmitBox) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className="w-full bg-teal-800 hover:bg-teal-700 text-white text-sm px-4 py-1 rounded"
    >
      {title}
    </button>
  );
};

export default SubmitBox;
