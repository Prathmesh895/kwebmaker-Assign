"use client"
import { useEffect, useState } from 'react';
import client from '../../lib/apollo-client';
import { HOMEPAGE_QUERY } from '../../lib/queries';
import Image from 'next/image';
import Link from 'next/link';

function Blogs() {
    const [homepageData, setHomepageData] = useState(null);
    const [blogData, setBlogData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await client.query({
                query: HOMEPAGE_QUERY,
            });
            const homepageNodes = response?.data?.pages?.nodes;
            const blogsNodes = response?.data?.blogs?.nodes;

            if (homepageNodes && homepageNodes.length > 0) {
                setHomepageData(homepageNodes[0].homepage);
            }

            if (blogsNodes) {
                setBlogData(blogsNodes);
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
        <div className='md:px-32 px-5 my-14'>
            <h1 className='font-semibold md:text-2xl text-xl drop-shadow text-gray-800' data-aos="fade-up">
                {homepageData?.blogSubtitle}
            </h1>
            <div className='font-bold md:text-3xl text-2xl drop-shadow flex items-center md:space-x-3 mb-10' data-aos="fade-up">
                <p>{homepageData?.blogTitle}</p>
                <Image src='/yellowline.svg' width={520} height={500} alt="Banner Image" className="h-5 w-60 md:block hidden" loading='lazy' />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 cursor-pointer">
                {blogData.map((blog, index) => (
                    <div data-aos="flip-right" key={index} className={`relative overflow-hidden group ${index === 1 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                        {blog.featuredImage?.node?.sourceUrl && (
                            <Image
                                src={blog.featuredImage.node.sourceUrl}
                                alt={blog.title}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className='hover:text-orange-500 group'>
                            <p className="group-hover:bg-orange-500 w-full absolute bottom-14 left-0 text-white text-sm px-2" >
                                <i>{new Date(blog.date).toLocaleDateString()}</i>
                            </p>
                            <h2 className="absolute bottom-8 left-0 w-full break-words truncate overflow-hidden text-white font-bold px-2 group-hover:text- group-hover:bg-orange-500">
                                {blog.title}
                            </h2>
                            <div className='group-hover:bg-orange-500 w-full'>
                            <Link href='#' className="absolute bottom-2 left-1 text-black bg-white rounded-full py-1 px-2 font-semibold text-xs hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                Read More
                            </Link>
                            </div>
                            {/* <Link href='#' className="absolute bottom-2 left-1 text-black bg-white rounded-full py-1 px-2 font-semibold text-xs hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                Read More
                            </Link> */}
                        </div>
                  
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default Blogs;
