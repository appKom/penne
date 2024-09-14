const Member = (props: { path: string; name: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center w-fit">
      <img
        src={props.path}
        alt={props.name}
        className="object-cover w-64 rounded-full aspect-square"
      />
      <p className="ml-5 text-xl">{props.name}</p>
    </div>
  );
};

export default Member;
