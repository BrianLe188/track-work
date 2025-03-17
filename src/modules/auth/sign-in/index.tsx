import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFormType } from "./validates";
import AuthEvent from "@/events/auth";
import SignInForm from "./sign-in-form";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const { onSetAuth } = useAuthStore();

  async function onSubmit(values: SignInFormType) {
    try {
      const res = await AuthEvent.signIn(values);

      if (res) {
        onSetAuth(res);
        navigate("/");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </div>
          <SignInForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
