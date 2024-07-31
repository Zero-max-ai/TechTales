type InputBoxProps = {
  icon?: React.ReactNode;
  title: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBox = ({
  icon,
  title,
  type,
  name,
  value,
  onChange,
}: InputBoxProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="flex items-center gap-1 text-sm">
        {icon} {title}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="py-1 px-2 w-full outline-none border-gray-600 focus:border-blue-500 border-b duration-150 text-sm"
      />
    </div>
  );
};

export default InputBox;
