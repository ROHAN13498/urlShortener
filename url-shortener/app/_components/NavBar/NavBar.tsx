"use client";
import { Button } from '@/components/ui/button';
import { Link as LucideLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="px-4 lg:px-6 h-14 flex items-center border-b-2 border-b-neutral-500">
      <a className="flex items-center justify-center gap-x-2" href="/">
        <LucideLink className="h-6 w-6" />
        <span className="text-neutral-950">ShortLink</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button variant="ghost" onClick={()=>{router.push("/auth/login")}}>LogIn</Button>
        <Button onClick={()=>{router.push("/auth/signup")}}>SignUp</Button>
      </nav>
    </div>
  );
}
