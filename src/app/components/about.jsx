"use client";
import React, { useEffect, useState } from 'react';
import client from '../../lib/apollo-client';
import { HOMEPAGE_QUERY } from '../../lib/queries';
import Link from 'next/link';
import Image from "next/image";
function About() {
    const [homepageData, setHomepageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='border-l-8 border-red-600 flex md:flex-row flex-col-reverse justify-between'>
            <div className='basis-[60%] md:mt-12 mt-10 md:px-32 px-5'>
                <p className='font-semibold text-2xl drop-shadow hidden md:block'>{homepageData.homeAboutSubtitle}</p>
                <h3 className='text-3xl font-bold pb-5 drop-shadow hidden md:block'>{homepageData.homeAboutTitle}</h3>
                <p className='text-gray-600 '>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint temporibus, assumenda magni minima, magnam nostrum dolorum facilis vel porro dolorem sed consectetur
                    laborum iure rem asperiores cum eaque blanditiis maiores perspiciatis incidunt possimus ratione cumque impedit perferendis! Perferendis quam, ex amet esse nostrum
                </p><br />
                <p className='text-gray-600 mb-5'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor cupiditate placeat
                    molestias eius debitis, illum temporibus dolore tempore, voluptatum ipsa aperiam
                    tempora alias ipsum fugiat quidem aut, error facilis adipisci assumenda. Corporis
                    temporibus recusandae quia eius. Nihil illum autem
                    perspiciatis mollitia veritatis eius a ea alias, fugiat dolorum impedit labore!
                </p>
                <Link href={homepageData.homeAboutButton.url} target={homepageData.homeAboutButton.target}
                    className='border-2 border-red-500 text-red-600 font-semibold px-5 py-2 rounded-full mt-20'>
                    {homepageData.homeAboutButton.title}
                </Link>
            </div>
            <div className='basis-[40%]'>
                <p className='font-semibold text-2xl drop-shadow mx-3 md:mt-0 mt-5  md:hidden block'>{homepageData.homeAboutSubtitle}</p>
                <h3 className='text-3xl font-bold pb-5 drop-shadow mx-3 md:hidden block'>{homepageData.homeAboutTitle}</h3>
                <Image src={homepageData.homeAboutVideoImage.node.sourceUrl}
                    width={500} height={400} alt='video-img' className='md:w-[90%] pb-5 md:p-0 p-3' />
            </div>
        </div>
    );
}

export default About;
