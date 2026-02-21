import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { IoIosSettings } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
      <Button asChild  variant={"outline"}>
        <Link href="/protected/dashboard/configuration"><IoIosSettings /></Link>
      </Button>
      <Button asChild  variant={"outline"}>
        <Link href="/protected/dashboard"><RiDashboardFill /></Link>
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
      
    </div>
  );
}
