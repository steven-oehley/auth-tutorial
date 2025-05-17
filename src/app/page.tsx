import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginBtn from "@/components/auth/login-btn";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const HomePage = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-radial from-sky-400 from-5% to-blue-900'>
      <div className='space-y-6'>
        <h1
          className={cn(
            "text-white drop-shadow-2xl text-5xl font-semibold mb-1",
            font.className
          )}
        >
          🔐 Auth Tutorial
        </h1>
        <p className='text-lg text-white text-center font-black'>
          A simple auth service
        </p>
        <div className='flex justify-center'>
          <LoginBtn>
            <Button variant='secondary' size='lg' className='cursor-pointer'>
              Sign In
            </Button>
          </LoginBtn>
        </div>
      </div>
    </main>
  );
};
export default HomePage;
