import { Search, LogOut, HelpCircle, Settings } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!showMenu) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMenu]);

  // Dicebear avatar url
  const avatarUrl = user
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        user.username
      )}`
    : "";

  return (
    <div className="bg-black text-gray-200 flex justify-between items-center h-20 px-3 md:px-10 text-sm md:text-[15px] font-medium text-nowrap">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="w-24 brightness-125" />
      </Link>
      <ul className="hidden xl:flex space-x-6">
        <li className="cursor-pointer hover:text-[#e50914]">Home</li>
        <li className="cursor-pointer hover:text-[#e50914]">Tv Shows</li>
        <li className="cursor-pointer hover:text-[#e50914]">Movies</li>
        <li className="cursor-pointer hover:text-[#e50914]">Anime</li>
        <li className="cursor-pointer hover:text-[#e50914]">Games</li>
        <li className="cursor-pointer hover:text-[#e50914]">New & Popular</li>
        <li className="cursor-pointer hover:text-[#e50914]">Upcoming</li>
      </ul>

      <div className="flex space-x-4 items-center relative">
        <div className="relative hidden md:inline-flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
          />
          <Search className="absolute w-5 h-5 top-2 right-4" />
        </div>
        <Link to={user ? "/ai-recommendation" : "/signin"}>
          <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">
            Get AI Movie Picks
          </button>
        </Link>
        {!user ? (
          <Link to={"/signin"}>
            <button className="border border-[#333333] py-2 px-4 cursor-pointer">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="relative" ref={menuRef}>
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer"
              onClick={() => setShowMenu((v) => !v)}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg shadow-lg py-4 px-3 z-50 flex flex-col gap-2 border border-[#333333]">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-white font-semibold text-base">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                  <HelpCircle className="w-5 h-5" />
                  Help Center
                </button>
                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <button
                  className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
