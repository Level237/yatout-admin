import { LoginForm } from "./LoginForm";

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10 p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Logo in top left */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-3">
          
          
        </div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-md relative z-10">
        {/* Title and Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg">
            Sign in to continue to your dashboard{" "}
            <span className="inline-block animate-pulse" role="img" aria-label="wave">
              👋
            </span>
          </p>
        </div>

        {/* Login Card with glassmorphism */}
        <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl shadow-primary/5 border border-gray-100/50 p-8">
          <LoginForm />
        </div>

        {/* Footer text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
}
