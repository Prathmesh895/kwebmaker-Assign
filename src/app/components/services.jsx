"use client";
import React, { useEffect, useState } from 'react';
import client from '../../lib/apollo-client';
import { HOMEPAGE_QUERY } from '../../lib/queries';
import Image from "next/image";
import Loading from '../loading';
import AOSWrapper from '@/app/components/aoswrapper';

// Array containing image data with source, title, width, and height
const imgsData = [
    { src: "/Interior Emulsions - Big img 650 x 545.webp", title: "Interior Paints", width: 620, height: 650, },
    { src: "/Exterior Emulsions - Smaller Imgs.webp", title: "Distemper & Enamel", width: 180, height: 180, },
    { src: "/Enamel & Distemper -Smaller Imgs .webp", title: "Enamel & Distemper", width: 180, height: 180, },
    { src: "/Undercoats -Smaller Imgs 550 x 517_2.webp", title: "Undercoats", width: 180, height: 180, },
    { src: "/Painting Tools - Smaller Imgs.webp", title: "Painting Tools", width: 180, height: 180, }
]
function Services() {
    const [homepageData, setHomepageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch data from the GraphQL API
    const fetchData = async () => {
        try {
            const { data } = await client.query({
                query: HOMEPAGE_QUERY,
            });
            setHomepageData(data.pages.nodes[0].homepage);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    // useEffect hook to run fetchData once when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Loading/>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <AOSWrapper>
        <div className='md:px-32 px-5 my-14' data-aos="fade-up">
            <h1 className='font-semibold md:text-2xl text-xl drop-shadow text-gray-800'>{homepageData.homeServicesSubtitle}</h1>
            {/* Title for the category section with an underline image */}
            <div className='font-bold md:text-3xl text-2xl drop-shadow flex items-center md:space-x-3 mb-10'>
                <p>{homepageData.homeServicesTitle}</p>
                <Image src='/yellowline.svg' width={520} height={500} alt={`Banner Image`} className="h-5 w-60 md:block hidden " />
            </div>
        </div>
        </AOSWrapper>
    );
}

export default Services;
