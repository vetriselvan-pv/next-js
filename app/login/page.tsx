"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import  Image  from 'next/image'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data: { message?: string; error?: string } = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    } else {
      alert("Login Successful");
    }
  }

  return (
    <form onSubmit={login}>
      <div className="h-dvh flex items-center justify-center bg-[url('/background-image/BG.svg')] bg-cover">
        <div className=" w-75 p-3 gap-5 flex flex-col items-center justify-center">
          <Image src="./icons/cart.svg" alt="cart" width={200} height={200} priority />
          <h1>Login</h1>
          <div className="flex min-w-70 p-2 items-center rounded-sm border-2 border-[#2148C0] gap-2">
            {/* <label htmlFor="username">User Name</label> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3155 14.1014 15.6903 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66665C5.78259 12.5 4.93474 12.8512 4.30962 13.4763C3.6845 14.1014 3.33331 14.9493 3.33331 15.8333V17.5"
                stroke="#2148C0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M10 9.16667C11.841 9.16667 13.3334 7.67428 13.3334 5.83333C13.3334 3.99238 11.841 2.5 10 2.5C8.15907 2.5 6.66669 3.99238 6.66669 5.83333C6.66669 7.67428 8.15907 9.16667 10 9.16667Z"
                stroke="#2148C0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <input
              placeholder="Username"
              className="w-full focus:outline-0"
              type="text"
              name="username"
              id="userName"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex min-w-70 p-2 items-center rounded-sm border-2 border-[#2148C0] gap-2">
            {/* <label htmlFor="username">Password </label> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 9.16669H4.16667C3.24619 9.16669 2.5 9.91288 2.5 10.8334V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V10.8334C17.5 9.91288 16.7538 9.16669 15.8333 9.16669Z"
                stroke="#2148C0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />

              <path
                d="M5.83331 9.16669V5.83335C5.83331 4.72828 6.2723 3.66848 7.0537 2.88708C7.8351 2.10567 8.89491 1.66669 9.99998 1.66669C11.105 1.66669 12.1649 2.10567 12.9463 2.88708C13.7277 3.66848 14.1666 4.72828 14.1666 5.83335V9.16669"
                stroke="#2148C0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>

            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              className="w-full focus:outline-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              className="rounded-sm border p-2 min-w-32 bg-white text-[#2148C0]"
              type="button"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-sm border-0 min-w-32 text-white  p-2 bg-[#2148C0]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
