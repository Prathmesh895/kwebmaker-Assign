"use client";
import { useEffect, useState } from 'react';
import client from '../../lib/apollo-client';
import { HOMEPAGE_QUERY } from '../../lib/queries';
import Image from 'next/image';
import Link from 'next/link';

function Page() {
    const [homepageData, setHomepageData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await client.query({
                query: HOMEPAGE_QUERY,
            });

            const homepageNodes = response?.data?.pages?.nodes;

            if (homepageNodes && homepageNodes.length > 0) {
                setHomepageData(homepageNodes[0].homepage);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='my-14 relative'>
            {homepageData ? (
                <div>
                    <Image src={homepageData.homeJoinBackgroundImage.node.sourceUrl} width={1600} height={500} alt={homepageData.homeJoinTitle}
                        className='-z-10 w-full md:h-full h-44' />
                    <div className='absolute md:top-1/4 top-2 space-y-2 md:px-[400px] text-center text-white'>
                        <h1 className='md:text-base text-xs '>{homepageData.homeJoinSubtitle}</h1>
                        <h1 className='md:text-3xl font-bold '>{homepageData.homeJoinTitle}</h1>
                        <h1 className='md:text-base text-xs'>{homepageData.homeJoinDescription}</h1>
                        <Link href='#' className=" text-blue-500 bg-white rounded-full mt-1 py-2 px-5 font-semibold md:text-sm ">
                              <button className='mt-5'>Read More</button> 
                            </Link>
                    </div>

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Page;
