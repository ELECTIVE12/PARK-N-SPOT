import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, RefreshCw, LayoutGrid } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../../components/footer';
import { store } from '@/src/lib/store';
import smart from "../../components/images/smart.png";
import findparkgo from "../../components/images/findparkgo.png";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Try to find existing user or create one
    const user = store.loginUser(email, password);
    if (!user) {
      // Create a new user if not found
      store.registerUser(email.split('@')[0], email, password);
    }
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/explore');
  };

  return (
    <main className="h-screen w-full flex flex-col md:flex-row overflow-hidden">
      <section className="relative w-full md:w-7/12 h-64 md:h-screen overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 z-10"></div>
        <img
          src={smart} alt="smart"
          className="w-full h-full object-cover grayscale contrast-125 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-90"></div>
        <div className="absolute bottom-12 left-12 z-20 ">
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-headline text-4xl font-extrabold tracking-tighter max-w-xs leading-none uppercase">SMART PARKING STARTS HERE.</h2>
          </div>
        </div>
      </section>

      <section className="w-full md:w-5/12 h-screen bg-surface flex flex-col justify-between p-6 md:p-10 lg:p-15 relative overflow-hidden">
        <header className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-primary-container flex items-center justify-center text-secondary-container">
            <LayoutGrid size={24} fill="currentColor" />
          </div>
          <h1 className="font-headline font-black text-2xl tracking-tighter text-primary">Park ‘n Spot</h1>
        </header>

        <div className="flex flex-col justify-center max-w-md w-full mx-auto h-full">
          <button
            onClick={() => navigate('/aboutus')}
            className="flex items-center gap-4 text-primary/60 hover:text-primary transition-colors duration-200 group border-none bg-transparent cursor-pointer"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span className="flex items-center gap-4 font-headline font-bold uppercase text-[10px] tracking-widest">Back to About Us</span>
          </button>
          <div className="mb-4">
            <h2 className="font-headline text-5xl font-extrabold text-primary tracking-tight leading-tight mb-4">Enter the Spot</h2>

          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-3">
              <label className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold">EMAIL</label>
              <input
                className="mt-2 w-full bg-surface-container-high border-none focus:ring-2 focus:ring-outline text-on-surface py-4 px-5 text-sm transition-all duration-300 placeholder:text-outline/50"
                placeholder="juandelacruz@gmail.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold">
                  PASSWORD
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[10px] font-headline uppercase tracking-widest text-secondary hover:text-primary transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {showForgotModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 min-h-screen">
                  <form
                    className="bg-white p-8 rounded-lg max-w-sm w-full space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();

                      alert(`Password reset link sent to ${resetEmail}`);
                      setShowForgotModal(false);
                      setResetEmail('');
                    }}
                  >
                    <h2 className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold">Forgot Password</h2>
                    <p className="text-xs text-on-surface-variant">
                      Please provide your email address below to receive a password reset link.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-surface-container-high border-none focus:outline-none focus:ring-2 focus:ring-outline py-4 px-5 text-sm placeholder:text-outline/50"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        onInvalid={(e) =>
                          e.currentTarget.setCustomValidity("Please enter a valid email address")
                        }
                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                      />

                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold px-4 py-2 bg-gray-200 rounded"
                        onClick={() => setShowForgotModal(false)}
                      >
                        Back to Login
                      </button>

                      <button
                        type="submit"
                        className="font-headline text-[12px] tracking-widest text-on-surface-variant font-bold px-4 py-2 bg-[#660000] text-white rounded uppercase hover:bg-primary-container transition-all duration-300 active:scale-[0.98] shadow-lg shadow-primary/10 text-center"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <input
                className="w-full bg-surface-container-high border-none focus:ring-1 focus:ring-outline text-on-surface py-4 px-5 text-sm transition-all duration-300 placeholder:text-outline/50"
                placeholder="••••••••"
                type="password"
                required
                title="must be at least 8 characters with A-Z a-z letters, 0-9, and @$!%*#?& symbols"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pt-3 flex flex-col gap-6">
              <button
                type="submit"
                className="w-full bg-[#660000] py-4 text-surface-container-lowest border-none cursor-pointer font-headline font-bold text-sm tracking-[0.2em] uppercase hover:bg-primary-container transition-all duration-300 active:scale-[0.98] shadow-lg shadow-primary/10 text-center"
              >
                LOG IN
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className="w-full border border-outline-variant/50 py-4 text-on-surface font-headline font-semibold text-xs tracking-widest uppercase hover:bg-surface-container-low transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                LOG IN WITH GOOGLE
              </button>

              <div className="text-center pt-2">
                <p className="text-on-surface-variant font-body text-[12px] tracking-wide">
                  Exploring for the first time? {' '}
                  <Link to="/signup" className="text-primary font-bold hover:underline decoration-secondary-container underline-offset-4 transition-all">
                    CREATE ACCOUNT
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </section>
    </main>
  );
}

export function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Register the user in the store
    store.registerUser(name, email, password);
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/verify');
  };

  return (

    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-white min-h-screen flex flex-col">
      <main className="bg-surface-container-low h-screen w-full flex overflow-hidden ">

        <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-0 bg-surface-container-lowest overflow-hidden">

          <div className="md:col-span-5 relative w-full h-screen object-cover bg-primary overflow-hidden">
            <img
              className="absolute inset-0 w-full h-full object-cover object-bottom opacity-70 mix-blend-luminosity"
              src={findparkgo} alt="findparkgo"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-12 left-12 right-12 z-10">
              <div className="w-12 h-1 bg-secondary-container mb-6"></div>
              <h2 className="text-4xl font-extrabold text-surface-container-lowest tracking-tighter max-w-xs leading-none uppercase font-headline">Find. Park. Go.</h2>
              <p className="text-surface-container-low font-light py-7 leading-relaxed max-w-xs font-body">Experience parking spaces reimagined through smart layout, optimal accessibility, and architectural precision.</p>
            </div>
          </div>

          <div className="md:col-span-7 bg-surface-container-low p-8 md:p-20 flex flex-col justify-center">

            <div className="max-w-md w-full mx-auto relative">
              <header className="flex items-center gap-3 mb-8 -ml-10">
                <div className="w-10 h-10 bg-primary-container flex items-center justify-center text-secondary-container">
                  <LayoutGrid size={24} fill="currentColor" />
                </div>
                <h1 className="font-headline font-black text-2xl tracking-tighter text-primary">Park ‘n Spot</h1>
              </header>
              <div className="mb-3">
                <h2 className="font-headline text-4xl font-extrabold text-primary tracking-tight leading-tight mb-1 ">Sign Up</h2>
              </div>
              <form className="space-y-6" onSubmit={handleRegister}>

                <div className="space-y-2">
                  <label className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold">Full Name</label>
                  <input
                    className="mt-2 w-full bg-surface-container-high border-none focus:ring-2 focus:ring-outline text-on-surface py-4 px-5 text-sm transition-all duration-300 placeholder:text-outline/50"
                    id="name"
                    placeholder="e.g Juan Dela Cruz"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold">Email</label>
                  <input
                    className="mt-2 w-full bg-surface-container-high border-none focus:ring-2 focus:ring-outline text-on-surface py-4 px-5 text-sm transition-all duration-300 placeholder:text-outline/50"
                    id="email"
                    placeholder="juandelacruz@gmail.com"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold">PASSWORD</label>

                  <input
                    className="mt-2 w-full bg-surface-container-high border-none focus:ring-2 focus:ring-outline text-on-surface py-4 px-5 text-sm transition-all duration-300 placeholder:text-outline/50"
                    placeholder="••••••••"
                    type="password"
                    required
                    title="must be at least 8 characters with A-Z a-z letters, 0-9, and @$!%*#?& symbols"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-start space-x-3 pt-1">

                  <input
                    type="checkbox"
                    name="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="h-4 w-4 mt-1 cursor-pointer"
                    required
                  />

                  <div className="text-on-surface-variant font-body text-[12px] tracking-wide">
                    I agree to the{" "}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTermsModal(true);
                      }}
                      className="text-primary font-headline text-[12px] font-semibold underline underline-offset-4 hover:opacity-80"
                    >
                      Terms and Conditions
                    </button>.

                  </div>

                </div>

                {showTermsModal && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 min-h-screen">

                    <div className="bg-white p-8 rounded-lg max-w-md w-full space-y-4 max-h-[80vh] overflow-y-auto">

                      <h2 className="text-xl font-bold">Terms & Conditions</h2>
                      <p className="text-sm"><strong>Park ‘n Spot</strong></p>
                      <p className="text-xs text-gray-500">Last Updated: 09/04/2026</p>

                      <div className="text-sm font-headline space-y-3">
                        <p><strong>1. Acceptance:</strong> By using the app, you agree to these Terms.</p>

                        <p><strong>2. Service:</strong> Helps find and share free parking spaces. Availability is not guaranteed.</p>

                        <p><strong>3. Responsibilities:</strong></p>
                        <ul className="list-disc ml-5">
                          <li>Follow parking laws</li>
                          <li>Verify parking availability</li>
                          <li>Provide accurate info</li>
                        </ul>

                        <p><strong>4. Listings:</strong> Must have permission to post. We may remove listings anytime.</p>
                        <p><strong>5. Liability:</strong> Not responsible for damage, theft, fines, or incorrect info.</p>
                        <p><strong>6. Prohibited Use:</strong> No false info or misuse.</p>
                        <p><strong>7. Termination:</strong> Accounts may be suspended for violations.</p>
                        <p><strong>8. Changes:</strong> Terms may be updated anytime.</p>
                        <p><strong>9. Governing Law:</strong> Philippines </p>
                        <p><strong>10. Contact:</strong> park'ngo@gmail.com</p>
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setShowTermsModal(false)}
                          className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold px-4 py-2 bg-gray-200 rounded"
                        >
                          Decline
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAcceptedTerms(true);
                            setShowTermsModal(false);
                          }}
                          className="font-headline text-[12px] tracking-widest text-on-surface-variant font-bold px-4 py-2 bg-[#660000] text-white rounded uppercase hover:bg-primary-container transition-all duration-300 active:scale-[0.98] shadow-lg shadow-primary/10 text-center"
                        >
                          Accept
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button className="w-full bg-[#660000] py-4 text-surface-container-lowest border-none cursor-pointer font-headline font-bold text-sm tracking-[0.2em] uppercase hover:bg-primary-container transition-all duration-300 active:scale-[0.98] shadow-lg shadow-primary/10 text-center" type="submit">
                    <span className="relative z-10">Register</span>

                  </button>
                </div>
                <div className="text-center mt-6">
                  <span className="text-on-surface-variant font-body text-[12px] tracking-wide">
                    Already have an account?{" "}
                  </span>
                  <Link
                    to="/login"
                    className="text-primary font-bold text-[12px] hover:underline decoration-secondary-container underline-offset-4 transition-all"
                  >
                    LOGIN
                  </Link>
                </div>
              </form>
              <Footer />
            </div>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-secondary-container/5 rounded-full blur-[120px]"></div>

      </div>
    </div>

  );
}

export function Verify() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface h-screen flex flex-col overflow-hidden architectural-bg">


      <header className="flex items-end gap-2 ml-50 mt-10">
        <div className="w-10 h-10 bg-primary-container flex items-center justify-center text-secondary-container">
          <LayoutGrid size={24} fill="currentColor" />
        </div>
        <h1 className="font-headline font-black text-2xl tracking-tighter text-primary ">Park ‘n Spot</h1>
      </header>
      <main className="flex-grow flex items-start justify-center px-2 pt-5">

        <div className="max-w-md w-full bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] p-8 md:p-15 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#660000]"></div>
          <div className="flex flex-col items-start gap-10">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors duration-200 group border-none bg-transparent cursor-pointer"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span className="flex items-center gap-4 font-headline font-bold uppercase text-[10px] tracking-widest">Back to Sign Up</span>
            </button>


            <div className="space-y-3">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-surface-container-low flex items-center justify-center">
                  <Mail size={30} className="text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tight leading-tight text-[#660000]">
                  Verify your<br />parking profile.
                </h1>
                <p className="flex items-center gap-4 font-headline font-bold uppercase text-[10px] tracking-widest">
                  We've sent a secure confirmation link to your email. Click the link to activate your premium parking access.
                </p>
              </div>
            </div>


            <div className="w-full space-y-10">
              <div className="flex flex-col gap-3">
                <p className="text-on-surface-variant/70 text-sm font-medium tracking-wide font-body">Didn't receive the email?</p>
                <button className="text-primary font-headline font-bold flex items-center gap-2 hover:opacity-60 transition-opacity w-fit border-none bg-transparent cursor-pointer">
                  <span className="tracking-tight uppercase text-xs">Resend Link</span>
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>


  );
}

