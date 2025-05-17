import { LucideTriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className='flex bg-destructive/15 items-center gap-x-2 text-destructive p-3 rounded-md text-sm'>
      <LucideTriangleAlert className='h-4 w-4' />
      <p className='text-sm'>{message}</p>
    </div>
  );
};
