"use client"
import React, {useEffect} from "react";
import "@/public/styles/slider.css"

const Slider = ({concentration,setConcentration,setActual}:{
    concentration:string,
    setConcentration:React.Dispatch<React.SetStateAction<string>>,
    setActual:React.Dispatch<React.SetStateAction<string>>,
}) => {
    const handleConcentrationChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setConcentration(event.target.value);
    };
    useEffect(() => {
        setActual(`${Number(concentration)+25}`);
    }, [concentration]);

    return (
        <div className='flex flex-col justify-center items-center' >
            <h1 className='text-xl max-md:text-sm'>Choose your Concentration level: </h1>
                <label className='mt-4 max-[500px]:mt-1 text-white mb-5'>{Number(concentration)+25}%</label>
                <input
                    type="range"
                    id="volumeSlider"
                    name="volume"
                    min='0'
                    max="50"
                    value={concentration}
                    onChange={handleConcentrationChange}
                    className='slider'
                    style={{ '--value': `${(Number(concentration)*100)/50}%` } as any}
                />
        </div>
    );
};

export default Slider;