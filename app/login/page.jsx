"use client";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useSearchParams } from "next/navigation";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { Router } from "next/router";

function Login() {
  const [searchParams] = useSearchParams(); // Use useSearchParams to access query parameters
  const [error, setError] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        window.location.href = '/'; // Redirect to login page
      }
    });
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      const redirectUrl = searchParams.get("redirectUrl") || "/";
    //   router.push(redirectUrl);
    window.location.href = redirectUrl; // Redirect to login page

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Wrapper>
      <UberLogo src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
      <Title>Log in to access your account</Title>
      <HeadImage src="/uberimages/signin.png" />
      <SignInButton onClick={handleSignIn}>Sign in with Google</SignInButton>
      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
    </Wrapper>
  );
}

export default Login;

const Wrapper = tw.div`
  flex flex-col h-screen w-screen bg-gray-200 p-4
`;

const SignInButton = tw.button`
  bg-black py-4 text-white w-full text-center mt-8
`;

const UberLogo = tw.img`
  h-6 w-auto object-contain self-start
`;

const Title = tw.div`
  text-4xl pt-4 text-gray-500
`;

const HeadImage = tw.img`
  h-64 w-auto object-contain self-start
`;

const ErrorMessage = tw.div`
  text-red-500 mt-4
`;
