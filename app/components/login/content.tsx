"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { redirect, useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";

export const LoginContent: React.FC = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      redirect("/dashboard");
    }
  }, [router, user?.id]);

  return (
    <div className='flex flex-col gap-y-2 w-full p-6'>
      <Auth
        theme='dark'
        magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#1DB954",
              },
            },
          },
        }}
      />
    </div>
  );
};
