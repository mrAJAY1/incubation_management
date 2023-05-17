import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { SideBarData } from "./SideBarData";
import Style from "./SideBar.module.css";

function SideBar() {
  const [sideBar, setSideBar] = useState(false);
  const [lilBar, setLilBar] = useState(true);
  const showSideBar = () => {
    setLilBar(!lilBar);
    setSideBar(!sideBar);
  };
  const [isMobile, setMobile] = useState(document.body.clientWidth <= 498);
  useEffect(() => {
    console.log("hel");
    if (isMobile) setSideBar(false);
    else setSideBar(true);
  }, [isMobile]);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 498px)");
    const handleMediaChange = (event) => {
      setMobile(event.matches);
    };
    mq.addEventListener("change",handleMediaChange);
    return () => mq.removeEventListener("change",handleMediaChange);
  }, []);
  return (
    <>
      <div className={Style.sideBar}>
        <Link to="#" onClick={showSideBar}>
          <FaBars color="black" fontSize={"2rem"} />
        </Link>
      </div>

      <nav className={`${Style.navMenu} ${sideBar ? Style.active : ""}`}>
        <ul className={Style.navMenuItems}>
          <li className={Style.navbarToggle}>
            <Link to="#" className={Style.menuBars}>
              <AiOutlineClose color="black" onClick={showSideBar} />
            </Link>
          </li>
          {SideBarData.map((item, index) => {
            return (
              <li className={item.cName} key={index}>
                <Link onClick={showSideBar} to={item.path}>
                  {item.icon}
                </Link>
                {sideBar && <span>{item.title}</span>}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
export default SideBar;
