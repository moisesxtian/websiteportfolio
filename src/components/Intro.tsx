import HeroAvatar from '/public/assets/HeroCard.webp';
import { ReactTyped } from 'react-typed';
import {
  FaGithub,
  FaLinkedin,
  FaBehanceSquare,
  FaDiscord,
  FaFacebook,
} from 'react-icons/fa';
import { IoTerminal } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSkills } from '../Hooks/useSkills';
import { useResume } from '../Hooks/useResume';
import { getSkillIcon } from '../lib/skillIcons';

AOS.init({
  easing: 'ease-in',
});

const Home = () => {
  const { skills } = useSkills();
  const { resumeUrl } = useResume();

  const renderSkillChip = (skill: { id: string; name: string; icon_key: string | null }, keyPrefix: string) => {
    const Icon = getSkillIcon(skill.icon_key);
    return (
      <div key={`${keyPrefix}-${skill.id}`} className="flex p-1">
        <div className="flex gap-2 rounded-lg p-1 border border-gray-300 text-xs items-center whitespace-nowrap">
          <Icon size={15} />
          <h1>{skill.name}</h1>
        </div>
      </div>
    );
  };

  return (
    <div
      className="container mx-auto font-poppins text-secondary-color flex items-center justify-center pt-16 md:pt-24 pb-16 md:p-0"
      id="Home"
    >
      <div className="flex flex-wrap w-screen m-auto justify-between align-middle">
        <img
          src={HeroAvatar}
          alt="Christian Moises"
          className="mt-10 md:mt-0 h-auto w-full md:w-2/5 overflow-hidden object-contain order-2 pb-0 md:pb-10"
          data-aos="fade-left"
          data-aos-easing="ease-in-out"
          data-aos-duration="2000"
        />

        <div
          className="md:flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 w-full md:w-1/2 order-2 md:order-1"
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
          data-aos-duration="500"
        >
          <h2 className="text-sm font-medium text-secondary-color" data-aos="flip-down">
            I AM
          </h2>
          <h1
            className="text-center md:text-start text-2xl md:text-7xl font-extrabold"
            data-aos="fade-right"
          >
            Christian Moises
          </h1>
          <h3 className="text-sm" data-aos="fade-right" data-aos-delay="200">
            an aspiring{' '}
            <span className="font-bold text-main-color">
              <ReactTyped
                strings={['Software Developer', 'Web Developer', 'Data Scientist']}
                typeSpeed={40}
                backSpeed={40}
                loop
              />
            </span>{' '}
            from the Philippines.
          </h3>

          <div
            className="flex flex-wrap justify-center md:justify-start gap-4 max-w-xl"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            {[
              'Web Developer',
              'App Development',
              'Data Science',
              'Machine Learning',
              'Graphic Designer',
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

          <IconContext.Provider value={{ size: '30', className: 'contactIcon transition duration-300' }}>
            <div
              className="flex justify-center md:justify-start gap-4 border px-6 py-2 rounded-full"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <a href="https://github.com/moisesxtian" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-[#494545] hover:text-[#F97316]" />
              </a>
              <a
                href="https://www.linkedin.com/in/christian-moises/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-[#494545] hover:text-[#F97316]" />
              </a>
              <a href="https://www.behance.net/hyxchan" target="_blank" rel="noopener noreferrer">
                <FaBehanceSquare className="text-[#494545] hover:text-[#F97316]" />
              </a>
              <a href="https://discord.com/users/hyx.chan" target="_blank" rel="noopener noreferrer">
                <FaDiscord className="text-[#494545] hover:text-[#F97316]" />
              </a>
              <a href="https://www.facebook.com/moisesxtian" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-[#494545] hover:text-[#F97316]" />
              </a>
            </div>
          </IconContext.Provider>

          <div
            className="flex justify-center md:justify-start align-middle"
            data-aos="fade-right"
            data-aos-delay="500"
          >
            <a href={resumeUrl} download="Christian-Moises-CV.pdf" target="_blank" rel="noreferrer">
              <button className="w-40 h-9 rounded-xl bg-main-color duration-300 text-white text-xs hover:bg-[#FFA893]">
                View CV
              </button>
            </a>
          </div>

          <div
            className="flex flex-wrap items-center justify-center animate-a"
            data-aos="fade-right"
            data-aos-delay="600"
          >
            <div className="flex w-fit pr-5 items-center justify">
              <IoTerminal size={40} color="#F97316" />
            </div>
            <div>
              <h1 className="text-main-color font-bold">Technologies & Languages</h1>
              <p className="text-sm">Technologies i use and used to work with.</p>
            </div>
          </div>

          <IconContext.Provider value={{ color: '#F97316' }}>
            <div>
              <div
                className="flex w-full md:w-[620px] overflow-hidden group MyGradient"
                data-aos="fade-right"
                data-aos-delay="700"
              >
                <div className="flex max-w-none animate-loop-scroll group-hover:paused">
                  {skills.map((skill) => renderSkillChip(skill, 'a'))}
                </div>
                <div className="flex max-w-none animate-loop-scroll group-hover:paused" aria-hidden="true">
                  {skills.map((skill) => renderSkillChip(skill, 'b'))}
                </div>
              </div>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Home;
