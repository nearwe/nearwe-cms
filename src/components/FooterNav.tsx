import { useLocation, useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi"; // import plus icon
import { TABS } from "../utils/constants";

const FooterNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="sticky bottom-0 z-[99] ">
      <div className="flex gap-2 border-t border-slate-200 px-4 pb-3 pt-2 bg-white">
        {TABS.map((item:any) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.name}
              className={`flex flex-1 flex-col items-center justify-end gap-1 transition-colors duration-200 cursor-pointer ${isActive ? "text-blue-700" : "text-black/50 dark:text-white/50 hover:text-blue-700"
                }`}
              onClick={() => navigate(item.path)}
            >
              {item.customIcon ? (
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-16 w-16 rounded-full bg-blue-100 animate-pulse"></div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-t from-blue-700 to-sky-400 shadow-[#29C9FF]/40
 text-white z-10">
                    {/* <HiPlus size={20} /> */}
                  </div>
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px">
                    <path d={item.icon}></path>
                  </svg>
                </div>
              )}

              <p className="text-[10.5px] font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default FooterNav;
