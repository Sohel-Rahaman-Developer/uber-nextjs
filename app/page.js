"use client"
import styles from "./page.module.css";
import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import Map from "./components/Map";
import Link from "next/link";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSearchParams } from "next/navigation"; // Import useSearchParams from next/navigation

export default function Home() {
  const [user, setUser] = useState();
  const [searchParams] = useSearchParams(); // Use useSearchParams to access query parameters

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photo: user.photoURL,
        });
      } else {
        setUser(null);
        window.location.href = '/login'; // Redirect to login page
      }
    });
  }, []);
  
  console.log(user)
  return (
    <>
      <Wrapper>
        <Map />
        <ActionItems>
          {/* header */}
          <Header>
            {/* image */}
            <UberLogo src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></UberLogo>
            {/* profile */}
            <Profile>
              {/* name */}
              <Name>{user ? user.name : 'user'}</Name>
              {/* userImage */}
              <UserImage src={user ? user.photo : 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'} onClick={() => signOut(auth)} />
            </Profile>
          </Header>
          {/* action buttons */}
          <ActionButtons>
            <ActionButton>
              <Link href="/searchscreen">
                <StyledLink>
                  <ActionButtonImage src="/uberimages/uberCar.webp" />
                  Ride
                </StyledLink>
              </Link>
            </ActionButton>
            <ActionButton>
              <Link href="/searchscreen">
                <StyledLink>
                  <ActionButtonImage src="/uberimages/cycleUber.png" />
                  Wheels
                </StyledLink>
              </Link>
            </ActionButton>
            <ActionButton>
              <Link href="/searchscreen">
                <StyledLink>
                  <ActionButtonImage src="/uberimages/uberCar.webp" />
                  Reserve
                </StyledLink>
              </Link>
            </ActionButton>
          </ActionButtons>
          {/* inputbutton */}
          <Link href="/searchscreen">
            <InputButton>Where to?</InputButton>
          </Link>
        </ActionItems>
      </Wrapper>
    </>
  );
}

const Wrapper = tw.div`
flex flex-col  h-screen
`;

const ActionItems = tw.div`
 flex-1
`;

const Header = tw.div`
flex justify-between items-center p-4
`;

const UberLogo = tw.img`
h-10
`;

const Profile = tw.div`
flex justify-between items-center
`;

const Name = tw.div`
mr-2 w-30 text-sm
`;

const UserImage = tw.img`
h-12 w-12 rounded-full cursor-pointer
`;

const ActionButtons = tw.div`
flex justify-center items-center p-2
`;

const ActionButton = tw.div`
p-2 bg-gray-200 flex-1 m-2 rounded flex flex-col justify-center items-center transform hover:scale-105 transition
`;

const ActionButtonImage = tw.img`
h-3/6
`;

const InputButton = tw.div`
h-20 bg-gray-200 text-2xl p-4 flex items-center mx-4 font-bold
`;

const StyledLink = tw.div`
h-full w-full flex flex-col justify-center items-center
`;
