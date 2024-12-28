import { FaMoon, FaSun } from 'react-icons/fa';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useRecoilState } from 'recoil';
import { mode } from '@/store/atom';

const Header = () => {
    const [nightMode, setNightMode] = useRecoilState(mode);
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();

    return (
        <header>
            <nav className="flex h-20 justify-between px-8 items-center lg:mx-44">
                <div className="text-3xl font-extrabold flex justify-center items-center">
                    COD
                    <span className="text-s1 font-sans">MINATI</span>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setNightMode(nightMode === "dark" ? "light" : "dark");
                        }}
                    >
                        {nightMode === "dark" ? <FaSun /> : <FaMoon />}
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
    )
}

export default Header