import { useState } from 'react';
import { Eye, EyeOff, Car, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SignUpPageProps {
  onSignUp: (name: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

export function SignUpPage({ onSignUp, onSwitchToLogin }: SignUpPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const validateName = (value: string) => {
    if (!value) return 'Name is required';
    if (value.length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      setTouched({ name: true, email: true, password: true, confirmPassword: true });
      return;
    }

    onSignUp(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1594495220397-d9fdb9aed9f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MTg0NTY0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-primary/70 to-primary/90" />
      </div>

      {/* Sign Up Card */}
      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <Car className="w-8 h-8 text-secondary-foreground" />
            </div>
          </div>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Sign up to start renting cars today</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (touched.name) {
                      setErrors({ ...errors, name: validateName(e.target.value) });
                    }
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, name: true });
                    setErrors({ ...errors, name: validateName(name) });
                  }}
                  className={`pr-10 ${
                    touched.name
                      ? errors.name
                        ? 'border-destructive focus-visible:ring-destructive'
                        : 'border-green-500 focus-visible:ring-green-500'
                      : ''
                  }`}
                />
                {touched.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {errors.name ? (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                )}
              </div>
              {touched.name && errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) {
                      setErrors({ ...errors, email: validateEmail(e.target.value) });
                    }
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, email: true });
                    setErrors({ ...errors, email: validateEmail(email) });
                  }}
                  className={`pr-10 ${
                    touched.email
                      ? errors.email
                        ? 'border-destructive focus-visible:ring-destructive'
                        : 'border-green-500 focus-visible:ring-green-500'
                      : ''
                  }`}
                />
                {touched.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {errors.email ? (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                )}
              </div>
              {touched.email && errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (touched.password) {
                      setErrors({ ...errors, password: validatePassword(e.target.value) });
                    }
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, password: true });
                    setErrors({ ...errors, password: validatePassword(password) });
                  }}
                  className={`pr-20 ${
                    touched.password
                      ? errors.password
                        ? 'border-destructive focus-visible:ring-destructive'
                        : 'border-green-500 focus-visible:ring-green-500'
                      : ''
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {touched.password &&
                    (errors.password ? (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ))}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (touched.confirmPassword) {
                      setErrors({
                        ...errors,
                        confirmPassword: validateConfirmPassword(e.target.value),
                      });
                    }
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, confirmPassword: true });
                    setErrors({
                      ...errors,
                      confirmPassword: validateConfirmPassword(confirmPassword),
                    });
                  }}
                  className={`pr-20 ${
                    touched.confirmPassword
                      ? errors.confirmPassword
                        ? 'border-destructive focus-visible:ring-destructive'
                        : 'border-green-500 focus-visible:ring-green-500'
                      : ''
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {touched.confirmPassword &&
                    (errors.confirmPassword ? (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ))}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
              Create Account
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
