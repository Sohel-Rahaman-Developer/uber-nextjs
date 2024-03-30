import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/CarListData";

function RideSelector({pickupCoordinates,dropoffCoordinates}) {
  let [rideDuration , setRideDuration] = useState(0)
// console.log(pickupCoordinates[0],dropoffCoordinates)

try{
  useEffect(() => {
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1Ijoic29oZWxyYWhhbWFuIiwiYSI6ImNsdHZqYjVxbjEyOWgyanBqdjN5emVsZ2MifQ.HAijfwVXhSaGFAkGvuj5Cw`)
      .then((res) => res.json())
      .then(data => {
        if (data.routes && data.routes.length > 0 && data.routes[0].duration) {
          setRideDuration(data.routes[0].duration / 100);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  },[pickupCoordinates, dropoffCoordinates]);
}catch(e){
  console.log(e)
}
  // get ride duration from mapbox

  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <CarList>
        {carList.length > 0
          ? carList.map((car, index) => {
              return (
                <Car key={index}>
                  <CarImage src={car.imageUrl} />
                  <CarDetails>
                    <Service>{car.service}</Service>
                    <Time>5 min away</Time>
                  </CarDetails>
                  <Price>{'$' + (rideDuration * car.multiplier).toFixed(2)}</Price>
                </Car>
              );
            })
          : "Loading..."}
      </CarList>
    </Wrapper>
  );
}

export default RideSelector;

const Wrapper = tw.div`
flex-1 flex  flex-col overflow-y-scroll
`;

const Title = tw.div`
text-gray-500 text-center text-xs py-2 border-b
`;

const CarList = tw.div`
flex flex-col overflow-scroll
`;

const Car = tw.div`
flex p-4 ps-3 items-center
`;

const CarImage = tw.img`
 h-12 w-18 me-2
`;

const CarDetails = tw.div`
flex-1
`;

const Service = tw.div`
text-black-500 text-sm font-[600]
`;

const Time = tw.div`
text-blue-500 text-xs
`;

const Price = tw.div`
text-black-500 text-sm font-[600]
`;
