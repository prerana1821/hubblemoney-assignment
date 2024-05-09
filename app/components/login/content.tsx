"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
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
    <div className='flex flex-col gap-y-2 w-full max-w-lg p-6 bg-gray-50 rounded-md self-center my-10 '>
      <Auth
        theme='light'
        magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#000",
                brandAccent: "#3B82F6",
              },
            },
          },
        }}
      />
    </div>
  );
};
