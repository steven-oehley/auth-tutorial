import { LucideCircleCheckBig } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className='flex bg-emerald-500/15 items-center gap-x-2 text-emerald-500 p-3 rounded-md text-sm'>
      <LucideCircleCheckBig className='h-4 w-4' />
      <p className='text-sm'>{message}</p>
    </div>
  );
};
