import { useAuthStore } from "@/stores/auth";
import { ComponentProps, ComponentType, useEffect } from "react";
import { useNavigate } from "react-router";

export default function withAuth<T extends ComponentType<any>>(Component: T) {
  return function WrappedComponent(props: ComponentProps<T>) {
    const { auth, onCheckAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const newAuth = auth ?? (await onCheckAuth());
        if (!newAuth) navigate("/sign-in");
      })();
    }, []);

    return <Component {...props} />;
  };
}
