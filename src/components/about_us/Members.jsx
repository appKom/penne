const Member = ({ path, name }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img src={path} alt={name} className="object-cover w-64 h-64 rounded-full" />
      <p className="mt-5 text-lg text-white">{name}</p>
    </div>
  );
};

export default Member;
