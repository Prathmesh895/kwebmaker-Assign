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
            <h1 className='font-semibold md:text-2xl text-xl drop-shadow text-gray-800'>
                {homepageData?.blogSubtitle}
            </h1>
            <div className='font-bold md:text-3xl text-2xl drop-shadow flex items-center md:space-x-3 mb-10'>
                <p>{homepageData?.blogTitle}</p>
                <Image src='/yellowline.svg' width={520} height={500} alt="Banner Image" className="h-5 w-60 md:block hidden" loading='lazy'/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {blogData.map((blog, index) => (
                    <div key={index} className={`relative overflow-hidden group ${index === 1 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                        {blog.featuredImage?.node?.sourceUrl && (
                            <Image
                                src={blog.featuredImage.node.sourceUrl}
                                alt={blog.title}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <p className="absolute bottom-14 left-2 text-white text-sm px-2">
                            <i>{new Date(blog.date).toLocaleDateString()}</i>
                        </p>
                        <h2 className="absolute bottom-8 left-2 break-words truncate overflow-hidden text-white font-bold px-2">
                            {blog.title}
                        </h2>
                        <Link href='#' className="absolute bottom-2 left-2 text-blue-500 bg-white rounded-full py-1 px-2 font-semibold text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Read More
                        </Link>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default Blogs;
