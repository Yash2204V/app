/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom";


const Landing = () => {
  const [mode, setMode] = useState("dark");
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={`${mode}  text-black dark:text-white bg-white dark:bg-slate-800 max-h-screen h-[1000px] overflow-auto`}>
      <header>
        <nav className="flex h-20 justify-between px-8 items-center lg:mx-44">
          <div className="text-3xl font-extrabold flex justify-center items-center">
            COD
            <span className="text-s1 font-sans">MINATI</span>
          </div>
          <div className="flex gap-2">
            {/* <ul className="hidden lg:flex gap-2 mt-1"> */}
            <Button
              variant="ghost"
              onClick={() => {
                setMode(mode === "dark" ? "light" : "dark");
              }}
            >
              {mode === "dark" ? <FaSun /> : <FaMoon />}
            </Button>
            <Button
              onClick={() => 
                isSignedIn ? navigate("/coderoast") : navigate("/signin")
              }
            >
              {isSignedIn ? "Dashboard" : "Login"}
            </Button>

          </div>
        </nav>
      </header>
    </div>
  )
}

export default Landing