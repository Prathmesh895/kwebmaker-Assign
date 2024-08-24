"use client";
import React, { useEffect, useState } from 'react';
import client from '../../lib/apollo-client';
import { HOMEPAGE_QUERY } from '../../lib/queries';
import Image from "next/image";
import Loading from '../loading';
import AOSWrapper from '@/app/components/aoswrapper';

function Category() {
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
        <div className='md:px-32 px-5 my-10'>
            <h1 data-aos="fade-up" className='font-semibold text-2xl drop-shadow text-gray-800'>{homepageData.homeCategorySubtitle}</h1>
            {/* Title for the category section with an underline image */}
            <div data-aos="fade-up" className='font-bold text-3xl drop-shadow flex items-center md:space-x-3 mb-10'>
                <p >{homepageData.homeCategoryTitle}</p>
                <Image src='/redline.svg' width={520} height={500} alt={`Banner Image`} className="h-5 w-60 md:block hidden" />
            </div>
            {/* Grid layout for displaying image cards */}
            <div className="grid md:grid-cols-4 gap-5">
                {homepageData.categories.map((category, index) => (
                    <ul className={`relative cursor-pointer group ${index == 0 && 'col-span-2 row-span-2 w-full h-full'}`} key={index}>
                        <Image src={category.image.node.sourceUrl} width={600} height={620} alt={category.title} className="w-full h-full" />
                        <div data-aos="fade-up" className="absolute bottom-0 md:p-3 p-1 w-full flex md:flex-row flex-col md:items-center justify-between bg-transparent transition-all duration-300 group-hover:bg-yellow-500">
                            <p className={`font-semibold text-white md:text-base text-sm ${index == 0 && 'md:text-2xl'} `}>{category.title}</p>
                            <button className='text-orange-500 rounded-full bg-white font-semibold md:text-sm text-xs border md:py-1.5 py-1 px-3 '>Read more</button>
                        </div>
                    </ul>
                ))}
            </div>
        </div>
        </AOSWrapper>
    );
}

export default Category;
