import React from "react";
import sample1 from "../../../assets/sunbeam1.jpg";
import sample2 from "../../../assets/BG2.jpg";
import sample3 from "../../../assets/BG3.jpg";
import { Carousel } from "react-bootstrap";
import { useState } from "react";



export default function MyCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{height:"400px",width:"500px"}}>
        <Carousel.Item>
          <img
          style={{borderStyle:"solid",borderColor:"black",borderRadius:"20px" ,borderWidth:"5px",height:"400px",width:"500px"}}
            className="d-block"
            src={sample1}
            alt=""
          />
         
        </Carousel.Item>
        <Carousel.Item>
          <img
          style={{borderStyle:"solid",borderColor:"black",borderRadius:"20px" ,borderWidth:"5px",height:"400px",width:"500px"}}
            className="d-block w-100"
            src={sample2}
            alt="Second slide"
          />
  
          
        </Carousel.Item>
        <Carousel.Item>
          <img
          style={{borderStyle:"solid",borderColor:"black",borderRadius:"20px" ,borderWidth:"5px",height:"400px",width:"500px"}}
            className="d-block w-100"
            src={sample3}
            alt="Third slide"
          />
  
          
        </Carousel.Item>
      </Carousel>
  );
}