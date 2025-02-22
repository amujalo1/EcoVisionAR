import PhoneFrame from "./PhoneFrame";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

const Layout = ({ children }) => {
  return (
    <PhoneFrame className="overflow-hidden">
      <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
        {/* <TopBar /> */}
        <main className="flex-1 overflow-y-auto pt-14 pb-16 scrollbar-hide">
          {children}
        </main>
        <BottomBar />
      </div>
    </PhoneFrame>
  );
};

export default Layout;
