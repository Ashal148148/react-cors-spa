import * as React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { EquipmentI } from '../../interfaces/equipment';
import Equipment from './Equipment';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  

function EquipmentCarousel({equipment, removeEquip}: {equipment: EquipmentI[], removeEquip: (equip: number) => void}): React.JSX.Element {
    return (
      <Carousel responsive={responsive}>
          {equipment.map((equip, index) => <Equipment equip={equip} key={equip.name} removeEquip={removeEquip} index={index} />)}
      </Carousel>
    );
}


export default EquipmentCarousel;
