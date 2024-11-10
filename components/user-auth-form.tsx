"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UserAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isTermsOpen, setIsTermsOpen] = React.useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (email === "dbms@gmail.com" && password === "dbms") {
        router.push("/dashboard");
      } else {
        alert("Invalid email or password.");
      }
    }, 1000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          window.location.href = "https://github.com/login";
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>

      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <button
          onClick={() => setIsTermsOpen(true)}
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button
          onClick={() => setIsPrivacyOpen(true)}
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </button>
        
      </p>

      {/* Terms Modal */}
      {isTermsOpen && (
        <Modal onClose={() => setIsTermsOpen(false)} title="Terms of Service">
          <p style={{ color: "black" }}>
            *Terms of Service*
            <br />
            <br />
            Welcome to our service! By using our application, you agree to the
            following terms: 1. Your access to and use of the application is
            conditioned on your acceptance of and compliance with these Terms.
            2. You are responsible for keeping your login information secure. 3.
            Unauthorized use of this service is strictly prohibited and may
            result in account suspension. 4. We reserve the right to update
            these Terms at any time. Continued use of the service implies
            agreement with any changes.
            <br />
            <br />
            For any questions, please contact our support team.
          </p>
        </Modal>
      )}

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <Modal onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy">
          <p style={{ color: "black" }}>
            *Privacy Policy*
            <br />
            <br />
            Your privacy is important to us. This policy outlines how we
            collect, use, and protect your personal information: 1. We collect
            information you provide directly, such as when you create an
            account. 2. Your data is stored securely, and we do not share it
            with third parties without your consent. 3. You have the right to
            access and manage your personal information. 4. We may use cookies
            to enhance your experience on our platform.
            <br />
            <br />
            If you have questions about our privacy practices, please reach out
            to us.
          </p>
        </Modal>
      )}
    </div>
  );
}

// Modal Component
function Modal({
  onClose,
  title,
  children,
}: {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-lg p-6 rounded-md shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
