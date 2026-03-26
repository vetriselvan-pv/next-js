import { SignOut } from "@/components/sign-out"; 
import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function  Home() {
  const session = await auth();
  if(!session) redirect('/sign-in');
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <SignOut></SignOut>
    </div>
  );
}
