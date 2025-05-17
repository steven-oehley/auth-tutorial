interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='h-full flex items-center justify-center bg-radial from-sky-400 from-5% to-blue-900'>
      {children}
    </div>
  );
};
export default AuthLayout;
