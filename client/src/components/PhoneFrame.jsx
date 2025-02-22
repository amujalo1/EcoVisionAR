const PhoneFrame = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4 ">
      <div className="relative w-full max-w-md h-[calc(100vh-2rem)] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};
export default PhoneFrame;
