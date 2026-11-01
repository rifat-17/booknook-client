import RegisterForm from "@/components/auth-forms/RegisterForm";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return <RegisterForm />;
}