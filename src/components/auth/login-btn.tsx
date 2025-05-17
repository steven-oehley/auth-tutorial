"use client";
import { loginRoute } from "@/constants/routes";
import { useRouter } from "next/navigation";

interface LoginBtnProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginBtn = ({ children, mode = "redirect", asChild }: LoginBtnProps) => {
  const router = useRouter();
  const onClick = () => router.push(loginRoute);

  if (mode === "modal") {
    // Handle modal login logic here
    <span>To Do: Implement Modal</span>;
  }

  return (
    <span className='cursor-pointer' onClick={onClick}>
      {children}
    </span>
  );
};

export default LoginBtn;
