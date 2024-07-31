type InputBoxWrapper = {
  children: React.ReactNode;
};

const InputBoxWrapper: React.FC<InputBoxWrapper> = ({ children }) => {
  return (
    <div className="w-full flex items-center justify-between gap-2">{children}</div>
  );
};

export default InputBoxWrapper;
