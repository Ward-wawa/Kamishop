"use client"
import React from 'react';
import {perfumeType} from "@/lib/Types";

const SizeSelector = ({perfume,selectedSize,setSelectedSize}:{
    perfume:perfumeType,
    selectedSize:string,
    setSelectedSize:React.Dispatch<React.SetStateAction<string>>,
}) => {
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSize(event.target.value);
    };
    return (
        <div className="flex justify-between items-center mt-6 text-center">
            {perfume.sizes.map((size, index) => (
                <div key={index}>
                    <label
                        className={`hover:bg-gray-400 rounded-lg custom-radio ${selectedSize === size ? 'selected' : ''}`}>
                        <input
                            name={perfume.name}
                            type="radio"
                            value={size}
                            onChange={handleChange}
                        />
                        <span>{size}ml</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default SizeSelector;