// import React from 'react'
// import Image from 'next/image'
// import { CiLocationOn } from "react-icons/ci";
// import { BsTelephone } from "react-icons/bs";
// import { MdOutlineMail } from "react-icons/md";
// const images = [
//   { src: '/logo.webp', alt: 'Logo', width: 150, height: 100 },
//   { src: '/astral-adhensive.png', alt: 'C1', width: 150, height: 100 },
//   { src: '/c2.webp', alt: 'C2', width: 150, height: 100 },
//   { src: '/c3.webp', alt: 'C3', width: 150, height: 100 },
//   { src: '/c5.webp', alt: 'C5', width: 150, height: 100 }
// ];
// function footer() {
//   return (
//     <footer className=' text-white'>
//       {/* footer bg image */}
//       <img src="/blue-brick-wall-background.jpg" alt="footer-img" width={100} height={100} className='w-full h-[500px]  -z-10 absolute ' />
//       {/* footer content  first section*/}
//       <div className='border-b border-gray-400 md:mx-36'>
//         <h1 className='font-semibold text-3xl text-center p-5'>Group Company</h1>
//         <div className="flex justify-between items-center  px-10  invert brightness-0 filter  ">
//           {
//             images.map((data, index) => (
//               <div key={index} className="md:w-36 md:h-24">
//                 <Image src={data.src} alt="Logo" width={150} height={100} className="w-full h-full object-contain" />
//               </div>
//             ))
//           }</div>
//       </div>

//       <div className='z-10 mt-10 md:mx-32 mx-5 flex flex-col md:flex-row space-y-5 space-x-5'>
//         <div className='md:basis-1/3'>
//           <Image src='/logo.webp' width={150} height={100} />
//           <h1 className='font-semibold'>
//             Reach Us
//           </h1>
//           <div className='flex items-center space-x-2 my-2 text-sm'>
//             <CiLocationOn />
//             207/1, ‘Astral House’, B/h. Rajpath Club, Off S. G. Highway, Ahmedabad – 380059, Gujarat, India.
//           </div>
//           <div className='flex items-center space-x-2 my-2'>
//             <BsTelephone />
//             <p>1800 309 9393</p>
//           </div>
//           <div className='flex items-center space-x-2'>
//             <MdOutlineMail />
//             <p>customercare@astralpaints.com</p>
//           </div>
//         </div>
//         {/* second div */}
//         <div className='basis-3/4'>
//           <div>
//             <h1>sign up to our newsletter</h1>
//             <input type="email" name="" id="" className='bg-transparent border p-2 my-1 rounded-full'
//               placeholder='Enter eamil address' />
//           </div>
//           <div className='flex justify-between'>
//             <div className="text-sm space-y-2" >
//               <h1 className='font-semibold text-yellow-500'>Category</h1>
//               <h1>interior paints</h1>
//               <h1>exterior paints</h1>
//               <h1>undercoats</h1>
//               <h1>painting tools</h1>
//               <h1>Distemper & Enamel</h1>
//             </div>
//             <div className="text-sm space-y-2">
//               <h1 className='font-semibold text-yellow-500'>Services</h1>
//               <h1>wall painting</h1>
//               <h1>water Solution</h1>
//               <h1>painting</h1>
//               <h1>colour shades</h1>
//             </div>
//             <div className="text-sm space-y-2">
//               <h1 className='font-semibold text-yellow-500'>Downloads</h1>
//               <h1>Become a dealer</h1>
//               <h1>Blogs</h1>
//               <h1>Contact</h1>
//             </div>
//           </div>
//         </div>

//       </div>
//     </footer>
//   )
// }

// export default footer


import React from 'react';
import Image from 'next/image';
import { CiLocationOn } from 'react-icons/ci';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';

// Define the images for the footer
const images = [
  { src: '/logo.webp', alt: 'Logo', width: 150, height: 100 },
  { src: '/astral-adhensive.png', alt: 'C1', width: 150, height: 100 },
  { src: '/c2.webp', alt: 'C2', width: 150, height: 100 },
  { src: '/c3.webp', alt: 'C3', width: 150, height: 100 },
  { src: '/c5.webp', alt: 'C5', width: 150, height: 100 }
];

const footerLinks = {
  category: ['Interior paints', 'Exterior paints', 'Undercoats', 'Painting tools', 'Distemper & Enamel'],
  services: ['Wall painting', 'Water Solution', 'Painting', 'Colour shades'],
  downloads: ['Become a dealer', 'Blogs', 'Contact']
};

function Footer() {
  return (
    <footer className='text-white relative'>
      {/* Footer background image */}
      <img
        src='/blue-brick-wall-background.jpg'
        alt='Footer background'
        className='w-full md:h-[500px] h-screen object-cover -z-10 absolute top-0 left-0'
      />
      
      {/* Footer content */}
      <div className='relative z-10 md:h-full h-screen'>
        {/* Group Company Section */}
        <div className='border-b border-gray-400 md:mx-36 pb-5'>
          <h1 className='font-semibold text-3xl text-center mb-5'>Group Company</h1>
          <div className="flex justify-between items-center px-10 invert brightness-0 filter">
            {images.map((image, index) => (
              <div key={index} className="md:w-36 md:h-24">
                <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Contact and Info */}
        <div className='mt-10 md:mx-32 mx-5 flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'>
          <div className='md:basis-1/3'>
            <Image src='/logo.webp' width={150} height={100} alt='Logo' />
            <h1 className='font-semibold mt-4'>Reach Us</h1>
            <div className='flex items-center space-x-2 my-2 text-sm'>
              <CiLocationOn />
              <p>207/1, ‘Astral House’, B/h. Rajpath Club, Off S. G. Highway, Ahmedabad – 380059, Gujarat, India.</p>
            </div>
            <div className='flex items-center space-x-2 my-2'>
              <BsTelephone />
              <p>1800 309 9393</p>
            </div>
            <div className='flex items-center space-x-2'>
              <MdOutlineMail />
              <p>customercare@astralpaints.com</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className='basis-3/4'>
            <div className='mb-5'>
              <h1 className='font-semibold'>Sign up for our newsletter</h1>
              <input
                type="email"
                placeholder='Enter email address'
                className='bg-transparent border p-2 my-1 rounded-full w-full md:w-80'
              />
            </div>
            <div className='flex justify-between space-x-4 text-sm'>
              {Object.keys(footerLinks).map((key) => (
                <div key={key} className='space-y-2'>
                  <h1 className='font-semibold text-yellow-500 capitalize'>{key}</h1>
                  {footerLinks[key].map((link, index) => (
                    <h1 key={index}>{link}</h1>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
