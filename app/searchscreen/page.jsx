"use client"
import Link from "next/link";
import React, { useState } from "react";
import tw from "tailwind-styled-components";

const Search = () => {
  let [pickup, setPickup] = useState("")
  let [dropoff, setDropoff] = useState("")
  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/">
          <Backbutton src="/uberimages/backbutton.png" />
        </Link>
      </ButtonContainer>
      <InputContainer>
        <FormIcons>
          <CircleImage src="/uberimages/circle.png" />
          <LineImage src="/uberimages/line.png" />
          <SquareImage src="/uberimages/square.png" />
        </FormIcons>
        <InputBoxes>
          <Input placeholder="Enter PickUp Location" value={pickup} onChange={(e)=> setPickup(e.target.value)}/>
          <Input placeholder="Where to?..." value={dropoff} onChange={(e)=> setDropoff(e.target.value)}/>
        </InputBoxes>
        <PlusIcon src="/uberimages/plus.png" />
      </InputContainer>
      <SavedPlaces>
        <StarIcon src="/uberimages/starWhite.png" />
        Saved Places
      </SavedPlaces>
      <ConfirmButtonContainer>
        <Link
          href={{
            pathname: '/confirm',
            query: {
              pickup: `${pickup}`, 
              dropoff: `${dropoff}` 
            },
          }}
        >
          <ConfirmButton>Confirm Locations</ConfirmButton>
        </Link>
      </ConfirmButtonContainer>
    </Wrapper>
  );
};

export default Search;
const Wrapper = tw.div`
bg-gray-200 h-screen
`;

const ButtonContainer = tw.div`
p-3 bg-white 
`;

const Backbutton = tw.img`
w-8
`;

const InputContainer = tw.div`
flex bg-white items-center justify-center px-3
`;

const FormIcons = tw.div`
flex flex-col justify-center items-center 
`;

const CircleImage = tw.img`
h-[11px]
`;
const LineImage = tw.img`
h-10
`;
const SquareImage = tw.img`
h-2
`;

const InputBoxes = tw.div`
flex flex-col flex-1
`;

const Input = tw.input`
h-10 bg-gray-200 my-2 rounded p-2 outline-none border-none
`;

const PlusIcon = tw.img`
w-10 h-10 bg-gray-200 rounded-full p-1 ml-3
`;

const SavedPlaces = tw.div`
flex items-center px-3 bg-white my-2 py-2 
`;

const StarIcon = tw.img`
bg-gray-400 rounded-full p-[5px] w-10 w-10 h-10 mr-2
`;

const ConfirmButton = tw.button`
text-center w-full bg-black text-white p-2 text-xl
`;

const ConfirmButtonContainer = tw.div`
 px-3 
`;
