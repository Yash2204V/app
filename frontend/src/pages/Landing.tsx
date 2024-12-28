import { useRecoilValue } from "recoil";
import { mode } from "@/store/atom";
import Header from '@/components/Header';

const Landing = () => {
  const nightMode = useRecoilValue(mode);

  return (
    <div className={`${nightMode} bg-white text-[#bd0400] dark:text-white dark:bg-gradient-to-r dark:from-[#690000] dark:to-[#bd0400] max-h-screen h-[1000px] overflow-auto`}>
      <Header />
    </div>
  )
}

export default Landing