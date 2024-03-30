"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "../components/Map";
import { useSearchParams } from "next/navigation";
import RideSelector from "../components/RideSelector";



const Confirm = () => {
  const searchParams = useSearchParams();

  const pickup = searchParams.get("pickup");
  const dropoff = searchParams.get("dropoff");
  // console.log(pickup, dropoff);
  // const {pickup , dropoff} = router.query

  const [pickupCoordinates, setPickupCoordinates] = useState([0,0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0,0]);

  const getPickupCoordinates = (pickup) => {
    // const pickup = "Santa Monica";
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoic29oZWxyYWhhbWFuIiwiYSI6ImNsdHZqYjVxbjEyOWgyanBqdjN5emVsZ2MifQ.HAijfwVXhSaGFAkGvuj5Cw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCoordinates(data.features[0].center);
      });
  };
  const getDropoffCoordinates = (dropoff) => {
    // const dropoff = "Loss Angeles";
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoic29oZWxyYWhhbWFuIiwiYSI6ImNsdHZqYjVxbjEyOWgyanBqdjN5emVsZ2MifQ.HAijfwVXhSaGFAkGvuj5Cw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropoffCoordinates(data.features[0].center);
      });
  };
  useEffect(() => {
    getPickupCoordinates(pickup);
    getDropoffCoordinates(dropoff);
  }, [pickup, dropoff]);
  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/searchscreen">
          <Backbutton src="/uberimages/backbutton.png" />
        </Link>
      </ButtonContainer>
      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <RideContainer>
        <RideSelector pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm UberX</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const RideContainer = tw.div`
flex-1 flex flex-col h-1/2 
`;

const Wrapper = tw.div`
flex h-screen flex-col
`;

const ConfirmButtonContainer = tw.div`
p-4 border-t-2
`;

const ConfirmButton = tw.div`
text-center w-full bg-black text-white p-2 text-xl
`;

const ButtonContainer = tw.div`
rounded-full absolute h-10 w-10 p-2 shadow-md cursor-pointer
 top-4 left-4 z-10 bg-white`

const Backbutton = tw.img`
h-full object-contain
`;
