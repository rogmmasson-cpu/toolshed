import { SignUp } from '@clerk/nextjs'

export const metadata = {
  title: 'Create Account | ToolShed',
}

export default function SignupPage() {
  return (
    <SignUp
      appearance={{
        variables: {
          colorPrimary: '#f97316',
          colorBackground: '#ffffff',
          colorText: '#111827',
          colorTextSecondary: '#6b7280',
          colorInputBackground: '#ffffff',
          colorInputText: '#111827',
          borderRadius: '0.75rem',
          fontFamily: 'Inter, sans-serif',
        },
        elements: {
          card: 'shadow-md border border-gray-100 rounded-2xl',
          headerTitle: 'text-2xl font-bold text-gray-900',
          headerSubtitle: 'text-gray-500',
          socialButtonsBlockButton: 'border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors',
          formButtonPrimary: 'bg-brand-500 hover:bg-brand-600 rounded-xl font-semibold transition-colors',
          footerActionLink: 'text-brand-600 font-semibold hover:text-brand-700',
          formFieldInput: 'rounded-xl border-gray-200',
        },
      }}
    />
  )
}
