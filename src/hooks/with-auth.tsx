import { useAuthStore } from "@/stores/auth";
import { ComponentProps, ComponentType, useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Higher-Order Component (HOC) to enforce authentication.
 * It checks whether the user is authenticated and redirects to the sign-in page if not.
 *
 * @template T - The type of the component to be wrapped.
 * @param {T} Component - The React component to be wrapped.
 * @param {boolean} [allowCheck = true] - Whether to check authentication. Useful for skipping checks in the development.
 * @returns {(props: React.ComponentProps<T>) => JSX.Element} A wrapped component with authentication enforcement.
 */
export default function withAuth<T extends ComponentType<any>>(
  Component: T,
  allowCheck: boolean = true,
): (props: React.ComponentProps<T>) => JSX.Element {
  return function WrappedComponent(props: ComponentProps<T>) {
    const { auth, onCheckAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      if (allowCheck) {
        (async () => {
          const newAuth = auth ?? (await onCheckAuth());
          if (!newAuth) navigate("/sign-in");
        })();
      }
    }, []);

    return <Component {...props} />;
  };
}
