import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const callbackUrl = (router.query?.callbackUrl as string) ?? "/";
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const _target = e.target as any;
    const email = _target.email.value;
    const password = _target.password.value;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError(result.error);
    } else {
      router.push(callbackUrl);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      {!!error && <p>{error}</p>}
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginPage;
