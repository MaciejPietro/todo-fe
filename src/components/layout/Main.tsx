import NavigationMobile from "../nav/NavigationMobile";
import SidebarDesktop from "../nav/SidebarDesktop";

const Main = ({ children }: any) => {
  return (
    <div>
      <NavigationMobile />

      <SidebarDesktop />

      <main className="lg:pl-72 max-h-screen overflow-y-scroll">
        <div className="py-10 lg:py-6">{children}</div>
      </main>
    </div>
  );
};

export default Main;
