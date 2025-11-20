import React from "react";
import "./RegisterForm.css";

export default function RegisterForm({ onSwitchToLogin }) {
  return (
    <div className="register-page">
      <div className="left-panel" aria-hidden="true">
        <div className="left-panel__mask">
          <div className="panelTop-content">
            <h2 className="panelTop__title boombaTextGradient">BOOMBA</h2>
            <div className="panelTop__div">
              <button className="panelTop__signUpBtn" type="button">
                Sign Up
              </button>
              <button
                className="panelTop__loginBtn"
                type="button"
                onClick={onSwitchToLogin}
              >
                Join Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <header className="login-header">
          <img className="login__Logo" src="./boomba-logo.png" alt="Boomba" />
        </header>

        <main className="login-card">
          <h1 className="title">Bem-vindo ao Boomba</h1>
          <p className="subtitle">Junte-se ao Boomba agora!</p>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Nome" className="input" required />
            <input
              type="email"
              placeholder="Email"
              className="input"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="input"
              required
            />
            <input
              type="password"
              placeholder="Confirmar senha"
              className="input"
              required
            />

            <div className="forgot-row">
              <div className="or-line">
                <span />
                <span />
              </div>
              <label className="terms-check">
                <input type="checkbox" required />
                <span>I agree to the terms</span>
              </label>
            </div>

            <button type="button" className="google-btn">
              <span>Sign up with Google</span>
              <svg
                className="login-form__google-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="#4285f4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34a853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#fbbc05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#ea4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>

            <button type="submit" className="primary-btn">
              Create Account
            </button>

            <p className="signup">
              Já tem uma conta? <a onClick={onSwitchToLogin}>Login</a>
            </p>

            <div className="socials">
              <span>
                <ion-icon name="logo-instagram"></ion-icon>
              </span>
              <span>
                <ion-icon name="logo-twitter"></ion-icon>
              </span>
              <span>
                <ion-icon name="logo-linkedin"></ion-icon>
              </span>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
