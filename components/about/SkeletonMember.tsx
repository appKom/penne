const SkeletonMember = () => (
  <div className="relative flex flex-col items-center justify-center gap-4 text-center w-fit animate-pulse">
    <div className="relative overflow-hidden rounded-full bg-gray-700 h-32 w-32 lg:w-48 lg:h-48" />
    <div className="w-32 h-6 bg-gray-700 rounded mt-2" />
  </div>
);

export default SkeletonMember;
