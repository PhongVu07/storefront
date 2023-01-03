import React from "react";

import { Image, User } from "../../types";

interface IProps {
  image: Image;
  userData?: User;
  showUserData?: boolean
  previewRef: any;
}

const ProductImage: React.FC<IProps> = ({ image, previewRef, userData, showUserData }) => {
  return (
    <div className="flex justify-center align-middle relative" ref={previewRef}>
      <div className="h-[400px] relative z-0">
        <img
          crossOrigin=""
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      {!!userData && showUserData && (
        <div className="h-[400px] w-full absolute z-10">
          <img src={userData.image} className="absolute top-16 left-16 rounded-full w-40"/>
          <div className="absolute top-32 right-16 text-white text-2xl font-bold">{userData.company}</div>
          <div className="absolute top-64 right-16 text-white text-xl font-bold">{userData.firstName + " " + userData.lastName}</div>
          <div className="absolute bottom-16 right-16 text-white text-sm font-light">{userData.title}</div>
          <div className="absolute bottom-12 right-16 text-white text-sm font-light">{userData.company}</div>
        </div>
      )}
    </div>
  );
};
export default ProductImage;
