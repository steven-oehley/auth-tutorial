"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackBtnProps {
  label: string;
  href: string;
}

const BackBtn = ({ label, href }: BackBtnProps) => {
  return (
    <Button asChild variant='link' className='font-normal w-full' size='sm'>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
export default BackBtn;
