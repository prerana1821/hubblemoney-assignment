"use client";

import useAuthModal from "@/hooks/useAuthModal";
import Modal from "./shared/Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

const AuthModal = () => {
  const { onClose, isOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { session } = useSessionContext();

  useEffect(() => {
    if (session?.user) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title='Welcome back'
      description='Login into your account'
      isOpen={isOpen}
      onChange={onChange}
    >
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
    </Modal>
  );
};

export default AuthModal;
