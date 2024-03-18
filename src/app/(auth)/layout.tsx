interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container flex w-screen h-screen flex-col items-center justify-center">
      {children}
    </div>
  );
}
