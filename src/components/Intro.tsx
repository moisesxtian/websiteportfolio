import React from 'react';
import HeroAvatar from '../assets/HeroCard.png';
import { ReactTyped } from "react-typed";
import { FaGithub, FaLinkedin, FaBehanceSquare, FaDiscord, FaFacebook,FaJava,FaHashtag,FaPython,FaHtml5,FaCss3Alt,FaNodeJs,FaReact,FaGitkraken,FaPhp,FaLongArrowAltDown,} from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiJupyter,SiScikitlearn,SiKotlin } from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { IoTerminal } from "react-icons/io5";
import { IconContext } from 'react-icons';


const Intro = () => {
  return (
    <div className="container mx-auto min-h-screen w-screen font-poppins text-secondary-color flex items-center justify-center pt-16 md:pt-24 pb-16">
      {/* Grid Container */}
      <button className='absolute bottom-16 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border border-main-color rounded-full animate-pulse flex items-center justify-center'>
        <FaLongArrowAltDown size={20} color='F06F4F'/>
      </button>
      <div className="flex flex-wrap w-full m-auto MyG">
        {/* Right Side: Image Holder */}

            <img
              src={HeroAvatar}
              alt="Christian Moises"
              className="mt-10 md:mt-0 w-full h-auto md:w-1/2 overflow-hidden object-contain w-full h-auto order-2 "
            />

        {/* Left Side: Intro Box */}
        <div className="md: flex flex-col justify-center md:items-start text-center md:text-left space-y-4 w-full md:w-1/2 order-2 md:order-1 ">
          <h2 className="text-3xl">My name is,</h2>
          <h1 className="text-7xl font-extrabold">Christian Moises</h1>
          <h3 className="text-sm">
            an aspiring <span className="font-bold text-main-color">  <ReactTyped strings={["Software Developer","Web Developer","Data Scientist"]} typeSpeed={40} backSpeed={40} loop/></span> from the Philippines.
          </h3>
          
          {/* Roles */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 max-w-xl">
            {[
              "Web Developer",
              "App Development",
              "Data Science",
              "Machine Learning",
              "Graphic Designer",
            ].map((role, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 rounded-full border border-gray-300 px-3 py-1 text-xs font-light"
              >
                <span className="block w-2 h-2 bg-main-color rounded-full"></span>
                <span>{role}</span>
              </div>
            ))}
          </div>
          {/* Social Media */}
          <IconContext.Provider value={{ color: "#915eff", className: "contactIcon" }}>
          <div className="flex justify-center md:justify-start gap-4 border px-6 py-2 rounded-full">
            <FaGithub size={30} color="#494545" />
            <FaLinkedin size={30} color="#494545" />
            <FaBehanceSquare size={30} color="#494545" />
            <FaDiscord size={30} color="#494545" />
            <FaFacebook size={30} color="#494545" />
          </div>
          </IconContext.Provider>

            <div className='flex justify-center md:justify-start align-middle'>
            <button className=' w-40 h-9 rounded-xl bg-main-color duration-300 text-white text-xs hover:bg-[#FFA893]'>View CV</button>
            </div>
          
          {/* LANGUAGES AND TECHNOLOGIES  */}
          <div className='flex flex-wrap items-center justify-center'>
            <div className='flex w-fit pr-5 items-center justify'>
            <IoTerminal size={40} color='#F06F4F'/>
            </div>
            
              <div>
              <h1 className='text-main-color font-bold'>Technologies & Languages</h1>
              <p className='text-sm'>Technologies i use and used to work with.</p>
              </div>
            </div>
            <IconContext.Provider value={{color:"#F06F4F"}}>
            <div>
              <div className='flex w-full md:w-[620px] overflow-hidden group MyGradient'>
                  <div className="flex max-w-none animate-loop-scroll group-hover:paused ">
                      {/* TECHNOLOGIES CONTAINER  */}
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaJava size={15}/>  <h1>Java</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaHashtag size={15}/>  <h1>C#</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaPython size={15}/>  <h1>Python</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaHtml5 size={15}/>  <h1>HTML</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaCss3Alt size={15}/>  <h1>CSS</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaNodeJs size={15}/>  <h1>Node JS</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaReact size={15}/>  <h1>React</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaGitkraken size={15}/>  <h1>GitKraken</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaPhp size={15}/>  <h1>PHP</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaFlutter size={15}/>  <h1>Flutter</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <RiTailwindCssFill size={15}/>  <h1>Tailwind CSS</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <SiJupyter size={15}/>  <h1>Jupyter Notebook</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <SiScikitlearn size={15}/>  <h1>ScikitLearn</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <SiKotlin size={15}/>  <h1>Kotlin</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <DiMysql size={15}/>  <h1>MySQL</h1>
                        </div>
                      </div>
                  </div>
                  <div className="flex max-w-none animate-loop-scroll group-hover:paused" aria-hidden='true'>
                      {/* TECHNOLOGIES CONTAINER  */}
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaJava size={15}/>  <h1>Java</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaHashtag size={15}/>  <h1>C#</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaPython size={15}/>  <h1>Python</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaHtml5 size={15}/>  <h1>HTML</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaCss3Alt size={15}/>  <h1>CSS</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaNodeJs size={15}/>  <h1>Node JS</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaReact size={15}/>  <h1>React</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaGitkraken size={15}/>  <h1>GitKraken</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaPhp size={15}/>  <h1>PHP</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <FaFlutter size={15}/>  <h1>Flutter</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <RiTailwindCssFill size={15}/>  <h1>Tailwind CSS</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <SiJupyter size={15}/>  <h1>Jupyter Notebook</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <SiScikitlearn size={15}/>  <h1>ScikitLearn</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <SiKotlin size={15}/>  <h1>Kotlin</h1>
                        </div>
                      </div>
                      <div className='flex p-1'>
                        <div className='flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap'>
                          <DiMysql size={15}/>  <h1>MySQL</h1>
                        </div>
                      </div>
                  </div>
            </div>
            </div>
        </IconContext.Provider>
        
        </div>
      </div>

    </div>
  );
};

export default Intro;
