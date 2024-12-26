import React from "react";
import Home from "../ui/svgs/Home";
import Menu from "./Menu";
import Aistudio from "../ui/svgs/Aistudio";
import Explore from "../ui/svgs/Explore";
import Profile from "../ui/svgs/Profile";
// import Saved from '../../ui/svgs/Saved';
// import Settings from '../../ui/svgs/Settings';
import Notification from "../ui/svgs/Notification";
import Messages from "../ui/svgs/Messages";
import Create from "../ui/svgs/Create";
import Dashboard from "../ui/svgs/Dashboard";
import Reel from "../ui/svgs/Reel";
import Search from "../ui/svgs/Search";
import Threads from "../ui/svgs/Threads";
import MainLogo from "./MainLogo";
import { Link } from "react-router-dom";

const SideBar = () => {
  const content = [
    {
      icon: Home,
      content: "Home",
      link: "/",
    },
    {
      icon: Search,
      content: "Search",
      link: "/search",
    },
    {
      icon: Explore,
      content: "Explore",
      link: "/explore",
    },
    {
      icon: Reel,
      content: "Reel",
      link: "/reel",
    },
    {
      icon: Messages,
      content: "Messages",
      link: "/messages",
    },
    {
      icon: Notification,
      content: "Notifications",
      link: "/notifications",
    },
    {
      icon: Create,
      content: "Create",
      link: "/create",
    },
    {
      icon: Dashboard,
      content: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: Profile,
      content: "Profile",
      link: "/profile",
    },
    {
      icon: Aistudio,
      content: "AI Studio",
      link: "/aistudio",
    },
    {
      icon: Threads,
      content: "Threads",
      link: "/threads",
    },
  ];

  return (
    <div className="w-1/6 h-screen bg-black/80 px-[12px] pt-[8px] pb-[20px] border-r border-white/20">
      <MainLogo />
      <Menu list={content} />
    </div>
  );
};

export default SideBar;
