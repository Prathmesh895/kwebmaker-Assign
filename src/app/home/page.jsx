"use client";
import * as React from "react";
import { useEffect, useState } from 'react';
import client from '../../lib/apollo-client';
import { HOMEPAGE_QUERY } from '../../lib/queries';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import Link from "next/link";

function HomePage() {
    const [homepageData, setHomepageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const { data } = await client.query({
                query: HOMEPAGE_QUERY,
            });
            setHomepageData(data.pages.nodes[0]);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Ensure banners exist before accessing
    const banners = homepageData?.homepage?.banners || [];

    return (
        <div className="w-full overflow-hidden">
            <div>
                {/* carousel for home page imgs */}
                <Carousel
                    autoPlay
                    infiniteLoop
                    showArrows
                    showThumbs={false}
                    interval={2000}
                    className="relative"
                >
                    {banners.map((banner, index) => (
                        <div key={index} className="relative w-full">
                            <Image
                                src={banner.bannerImage.node.sourceUrl}
                                width={1520}
                                height={500}
                                alt={`Banner Image ${index}`}
                                className="w-[100%] h-[780px]"
                            />
                            <div className="top-[200px] z-10 absolute float-start flex flex-col items-start text-white p-2 md:mx-20 space-y-3">
                                <p className="text-5xl  font-semibold drop-shadow-md">{banner.bannersTitle}</p>
                                <p>{banner.bannerDescription}</p>
                                <button className="bg-white font-semibold text-sm text-black rounded-full px-4 py-1.5">
                                    <Link href={banner.bannerButton.url} target={banner.bannerButton.target}>{banner.bannerButton.title}</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            {/* rainbow img  */}
            <div className="">
                <Image
                    src='/rainbow-new.svg'
                    width={1520}
                    height={500}
                    alt={`Banner Image`}
                    className="w-full top-[65%] -z-0 absolute"
                />
            </div>
            
        </div>
    );
}

export default HomePage;
