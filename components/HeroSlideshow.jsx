"use client"
import React, { useState, useEffect, useMemo } from 'react';
// Assuming Link is from Next.js and ChevronRight is from lucide-react (or similar)
import Link from 'next/link'; 
import { ChevronRight } from 'lucide-react'; 

// 1. Define the image array with ImageKit transformations for browser compatibility.
// .HEIC files are not universally supported, so we request ImageKit to convert them to WebP (tr=f-webp).
const IMAGE_ARRAY = [
    { src: "https://ik.imagekit.io/5qrepdiow/store_frontend/1.HEIC?tr=f-webp", alt: "Luxury Watch Image 1" },
    { src: "https://ik.imagekit.io/5qrepdiow/store_frontend/3.HEIC?tr=f-webp", alt: "Luxury Watch Image 2" },
    { src: "https://ik.imagekit.io/5qrepdiow/store_frontend/4.HEIC?tr=f-webp", alt: "Luxury Watch Image 3" },
    { src: "https://ik.imagekit.io/5qrepdiow/store_frontend/5.HEIC?tr=f-webp", alt: "Luxury Watch Image 4" },
    { src: "https://ik.imagekit.io/5qrepdiow/store_frontend/6.HEIC?tr=f-webp", alt: "Luxury Watch Image 5" },
    { src: "https://ik.imagekit.io/5qrepdiow/store_frontend/7.HEIC?tr=f-webp", alt: "Luxury Watch Image 6" }
];

/**
 * A Hero component featuring a background slideshow for a striking visual effect.
 * It automatically cycles through the images in the provided array.
 */
export default function HeroSlideshow({ imageArr = IMAGE_ARRAY, interval = 5000 }) {
    
    // Safety check and memoization of the image array
    const images = useMemo(() => Array.isArray(imageArr) && imageArr.length > 0 ? imageArr : [], [imageArr]);

    // State to track the index of the currently visible image
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Effect to manage the slideshow interval
    useEffect(() => {
        // Stop if there is zero or one image
        if (images.length <= 1) return; 

        // Set up the interval for cycling images
        const slideInterval = setInterval(() => {
            setCurrentImageIndex(prevIndex => 
                (prevIndex + 1) % images.length // Cycles from 0 to N-1 and then back to 0
            );
        }, interval);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(slideInterval);
    }, [images, interval]); 

    // Optional: Render a fallback if no images are available
    if (images.length === 0) {
        return (
            <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full bg-gradient-to-br from-indigo-50 to-white overflow-hidden flex items-center justify-center">
            
            {/* Background Slideshow Layer */}
            <div className="absolute inset-0 z-0">
                {images.map((image, index) => (
                    <div 
                        key={index}
                        // Set the background image and cover properties
                        style={{ 
                            backgroundImage: `url(${image.src})`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                        }}
                        // Apply position, transition, and dynamic opacity
                        className={`
                            absolute inset-0 
                            transition-opacity duration-1000 ease-in-out 
                            ${index === currentImageIndex ? 'opacity-70' : 'opacity-0 pointer-events-none'}
                        `}
                        role="img"
                        aria-label={image.alt}
                    >
                        {/* Dark Overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                ))}
            </div>

            {/* Content Layer (Remains unchanged) */}
            <div className="relative z-10 text-center text-white p-6 max-w-4xl">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-tight">
                    Timeless Style, Modern Precision.
                </h1>
                <p className="mt-4 text-lg sm:text-xl font-light drop-shadow-md">
                    Explore the Titan family's finest collections. Authenticity guaranteed.
                </p>
                <Link 
                    href="/watches/category/all" 
                    className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gray-600 hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02]"
                >
                    Shop All Watches
                    <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
            </div>
        </div>
    );
}

// Example Usage (for clarity, if you were to use this in another file):
/*
import HeroSlideshow from './HeroSlideshow'; // Adjust path as needed

function HomePage() {
    // You can pass the array directly or use the default
    return (
        <div>
            <HeroSlideshow /> 
            // OR pass a custom interval:
            // <HeroSlideshow interval={7000} /> 
        </div>
    );
}
*/