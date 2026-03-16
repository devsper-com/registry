import { useSearchParams, Link } from "react-router-dom";

export function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const success = !!token; // In real app, call API to verify token

  return (
    <div className="max-w-sm mx-auto py-12 text-center">
      <h1 className="font-sans text-2xl font-semibold text-ds-text mb-4">
        {success ? "Email verified" : "Verify your email"}
      </h1>
      <p className="text-ds-muted mb-6">
        {success
          ? "Your email has been verified. You can now log in."
          : "Check your inbox for a verification link."}
      </p>
      <Link to="/login" className="text-ds-text underline underline-offset-2">
        Log in
      </Link>
    </div>
  );
}
