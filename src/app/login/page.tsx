import { LoginForm } from '@/features/auth/components/LoginForm'

export const metadata = {
  title: 'Connexion - YaTout Admin',
  description: 'Connectez-vous à votre compte administrateur YaTout',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Login Container */}
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border shadow-xl p-6 sm:p-8 space-y-6">
          {/* Logo Section */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">YT</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">YaTout Admin</h1>
            <p className="text-sm text-muted-foreground">Bienvenue dans votre espace de gestion</p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer */}
          <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground space-y-2">
            <p>En vous connectant, vous acceptez nos</p>
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="text-primary hover:underline font-medium">Conditions d'utilisation</a>
              <span>•</span>
              <a href="#" className="text-primary hover:underline font-medium">Politique de confidentialité</a>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}
