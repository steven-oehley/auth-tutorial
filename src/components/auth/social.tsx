"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const Social = () => {
  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button size='lg' variant='outline' className='w-1/2' onClick={() => {}}>
        <FcGoogle className='h-5 w-5' />
      </Button>

      <Button size='lg' variant='outline' className='w-1/2' onClick={() => {}}>
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  );
};
export default Social;
