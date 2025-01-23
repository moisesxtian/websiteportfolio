import React from 'react';
import { FaGithub, FaEye } from 'react-icons/fa'; // React Icons
import { ReactTyped } from 'react-typed';

const projects = [
  {
    id: 1,
    title: 'MIRA: ASL RECOGNITION MOBILE APPLICATION',
    href: '#', // Link to the project
    description:
      'An American Sign language application that can translate Dynamic and static gestures. with built in Text-to-Speech and Speech-to-Text features. utilizing Dynamic Time Warping /Time Series/Clustering and Recurrent Neural Network',
    skills: ['Kotlin','Python','MediaPipe','TensorFlow','Sci-kit Learn', ], // Skills used
    githubLink: '#',
    liveDemoLink: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', // Project image
    hoverImageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDgwMnwwfDF8c2VhY2h8MjB8fGltYWdlfGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
  },
  {
    id: 1,
    title: 'Tails of Manila Website',
    href: '#', // Link to the project
    description:
      'An American Sign language application that can translate Dynamic and static gestures. with built in Text-to-Speech and Speech-to-Text features. utilizing Dynamic Time Warping /Time Series/Clustering and Recurrent Neural Network',
    skills: ['Kotlin','Python','MediaPipe','TensorFlow','Sci-kit Learn', ], // Skills used
    githubLink: '#',
    liveDemoLink: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', // Project image
    hoverImageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDgwMnwwfDF8c2VhY2h8MjB8fGltYWdlfGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
  },
  {
    id: 1,
    title: 'Nciky heart',
    href: '#', // Link to the project
    description:
      'Nicky heart aslkdjaslkdaw',
    skills: ['Kotlin','Python','MediaPipe','TensorFlow','Sci-kit Learn', ], // Skills used
    githubLink: '#',
    liveDemoLink: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', // Project image
    hoverImageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDgwMnwwfDF8c2VhY2h8MjB8fGltYWdlfGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
  },
];

const Projects = () => {
  return (
    <div className="relative">

      {/* Project Section */}
      <div className="container mx-auto min-h-screen w-screen font-poppins text-secondary-color flex items-start">
        <div className="flex  max-w-7xl">
          <div className="mx-auto pr-6 max-w-2xl text-start ">
            <h2 className="text-4xl  font-extrabold tracking-tight font-poppins  text-gray-900 sm:text-5xl">
             <ReactTyped strings={["Personal Projects"]} typeSpeed={20} backSpeed={100} backDelay={2000} cursorChar='*'/>
            </h2>
            <p className="mt-4 text-sm text-gray-600">
              A showcase of my personal projects highlighting my skills and creativity.
            </p>
          </div>
          <div className=" grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image with hover effect */}
                <div className="relative w-full h-56">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={project.hoverImageUrl}
                    alt={`${project.title} hover`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block bg-orange-100 text-orange-500 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    {/* GitHub Button */}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition-all"
                    >
                      <FaGithub className="mr-2" />
                      View Repo
                    </a>
                    {/* Live Demo Button */}
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-orange-400 transition-all"
                    >
                      <FaEye className="mr-2" />
                      See Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
