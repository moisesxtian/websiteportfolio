-- ============================================================
-- Seed current portfolio content
-- Run AFTER schema.sql (optional — site also has local fallbacks)
-- ============================================================

-- Clear existing (safe for first-time seed)
truncate table public.skills restart identity cascade;
truncate table public.projects restart identity cascade;
truncate table public.certificates restart identity cascade;
truncate table public.experiences restart identity cascade;

insert into public.site_settings (key, value)
values ('resume_url', '/Moises_Resume.pdf')
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into public.skills (name, icon_key, sort_order) values
  ('Java', 'java', 1),
  ('C#', 'csharp', 2),
  ('Python', 'python', 3),
  ('HTML', 'html', 4),
  ('CSS', 'css', 5),
  ('Node JS', 'nodejs', 6),
  ('React', 'react', 7),
  ('GitKraken', 'gitkraken', 8),
  ('PHP', 'php', 9),
  ('Flutter', 'flutter', 10),
  ('Tailwind CSS', 'tailwind', 11),
  ('Jupyter Notebook', 'jupyter', 12),
  ('ScikitLearn', 'scikitlearn', 13),
  ('Kotlin', 'kotlin', 14),
  ('MySQL', 'mysql', 15);

insert into public.projects (title, description, skills, github_link, live_demo_link, image_url, hover_image_url, video_url, sort_order) values
(
  'Vitae - AI Resume Builder',
  'Vitae AI Resume Builder is a smart, one-page resume generator that uses AI to help users create polished resumes quickly. It features a dynamic multi-step form, real-time suggestionsperfect for job seekers who want fast, professional results.',
  array['React','Tailwind CSS','FastAPI','Pydantic','Jinja2','ChatGPT API','Vercel','Render'],
  'https://github.com/moisesxtian/Vitae',
  'https://vitae.hyxcreation.tech',
  '/assets/Projects/vitae.png',
  '/assets/Projects/vitae-hovered.png',
  null,
  1
),
(
  'Tails Of Manila: Smart Agent',
  'This project is a Smart Agent for Tails of Manila, a pet supplies and grooming store. It automates various tasks such as sending email notifications, managing customer inquiries, and handling order processing using N8N workflows.',
  array['N8N','Facebook API','Telegram API','Google Sheets API','Google Calendar API','LLM','WebHooks'],
  'https://github.com/moisesxtian/N8N--Workflows',
  'https://github.com/moisesxtian/N8N--Workflows',
  '/assets/Projects/n8n.png',
  '/assets/Projects/n8n-hover.png',
  null,
  2
),
(
  'Reptr - Exercise Tracker',
  'This project is an exercise tracker web application called Reptr, implemented using the MERN stack . It features secure login and registration using JSON Web Tokens for authorization. Registered users can track their workouts with the ability to add, edit, and delete workout entries.',
  array['MongoDB','ExpressJS','React','NodeJS','JWT','Mongoose','Tailwind'],
  'https://github.com/moisesxtian/ExerciseTracker',
  'https://reptr.vercel.app',
  '/assets/Projects/reptr-1.png',
  '/assets/Projects/reptr-2.png',
  null,
  3
),
(
  'Customer Service Chatbot',
  'This project is a customer service chatbot web app that uses the OpenAI API to provide automated responses to customer inquiries. It is designed to handle inquiries by providing information using RAG (Retrieval-Augmented Generation) techniques, ensuring accurate and relevant answers.',
  array['React','FastAPI','Langchain','RAG','OpenAI','Tailwind','Express'],
  'https://github.com/moisesxtian/cs-chatbot/tree/main',
  'https://github.com/moisesxtian/cs-chatbot/tree/main',
  '/assets/Projects/chatbot-1.png',
  '/assets/Projects/chatbot-2.png',
  null,
  4
),
(
  'Conduction Sticker Detection',
  'This project is a conduction sticker detection system that uses YOLOv8 for accurate object detection and FastAPI to serve the model via an API. It processes vehicle images to detect conduction stickers and includes a separate model for car make and model classification.',
  array['Python','YOLOv8','FastAPI','Roboflow','PaddleOCR','numpy','Pillow','CNN'],
  'https://github.com/moisesxtian/conduction-extraction',
  'https://github.com/moisesxtian/conduction-extraction',
  '/assets/Projects/conduction-1.png',
  '/assets/Projects/conduction-2.png',
  null,
  5
),
(
  'MIRA: ASL RECOGNITION MOBILE APPLICATION',
  'An american sign language application utilizing with static and gesture recognition, speech to-text and text-to speech integration',
  array['Kotlin','Python','MediaPipe','TensorFlow','Sci-kit Learn','Android Studio'],
  'https://github.com/moisesxtian/ASL-Recognition-app',
  'https://drive.google.com/drive/folders/1PwizLoIWeM4PoqLsopeR6ucKD9pHHBVz?usp=sharing',
  '/assets/Projects/mira-asl-app-mockup.png',
  '/assets/Projects/m-h.png',
  null,
  6
),
(
  'Tails Of Manila: Website',
  'A Simple website for Tails of manila, a Pet supplies and groooming store. this website is responsive, with components like shop location and a functional Contact Form ',
  array['CSS','HTML','Javascript','Figma','UI/UX','Web3Forms'],
  'https://github.com/moisesxtian/tails-of-manila-website',
  'http://www.tailsofmanila.vercel.app',
  '/assets/Projects/Tails of Manila Mock Up.png',
  '/assets/Projects/tom-h.png',
  null,
  7
),
(
  'Penguin Rush - Platformer Game',
  'Developed Penguin Rush, a 2D platformer in Unity and C#, featuring smooth mechanics, intuitive controls, obstacles, collectibles, and power-ups.',
  array['C#','Unity','Photoshop'],
  'https://github.com/moisesxtian/websiteportfolio',
  'https://drive.google.com/drive/folders/1jUzX2mEZIs-Z3y5UXam2eG72B36NVesL?usp=sharing',
  '/assets/Projects/penguin-rush.png',
  '/assets/Projects/pr-mm.png',
  null,
  8
),
(
  'Car Prices Prediction: Model Training',
  'A simple predictive model using Linear Regression and XGBoost with dataset from Kaggle',
  array['Numpy','Pandas','Python','Linear Regression','XG Boost'],
  'https://github.com/moisesxtian/MLNotebook',
  'https://github.com/moisesxtian/MLNotebook',
  '/assets/Projects/CarPrice Prediction.png',
  '/assets/Projects/CarPrice Prediction.png',
  null,
  9
),
(
  'Mobtech: Mobile Application UI/UX Prototype',
  'A Detailed prototype of a Mobile application,for mobile technicians. ',
  array['Figma','Canva','Iconify','Vector','Adobe Creative','Wireframing','Prototyping'],
  'https://www.figma.com/design/aUz4m8i074AQ40ZU5WWqWF/MOISES_PORTFOLIO?node-id=0-1&t=pZ3L4mkVbroB2BE1-1',
  'https://www.figma.com/design/aUz4m8i074AQ40ZU5WWqWF/MOISES_PORTFOLIO?node-id=0-1&t=pZ3L4mkVbroB2BE1-1',
  '/assets/Projects/mobtech-prototype.png',
  '/assets/Projects/mtp-h.png',
  null,
  10
),
(
  'Calculator mini app',
  'A Simple calculator app I made way back on 2021 with functions such as Plus, Divide, Minus, Multiply',
  array['C#'],
  'https://github.com/moisesxtian/Calculator',
  'https://github.com/moisesxtian/Calculator',
  '/assets/Projects/calcoolator.png',
  '/assets/Projects/calcoolator.png',
  null,
  11
),
(
  'Portfolio Website - v1',
  'A Simple website for Tails of manila, a pet supplies and groooming store. this website is responsive, with components like shop location and a functional contact form ',
  array['HTML/CSS','JavaScript','Figma','Photoshop'],
  'https://github.com/moisesxtian/moisesxtian.github.io',
  'https://moisesxtian.github.io',
  '/assets/Projects/portfolio-website-v1.png',
  '/assets/Projects/pw-h.png',
  null,
  12
);

insert into public.certificates (name, description, organization, image_url, certificate_link, sort_order) values
  ('Supervised Learning with Scikit Learn', '', 'DataCamp', '/assets/Certificates/1.png', '#', 1),
  ('Intermediate Python', '', 'DataCamp', '/assets/Certificates/2.png', '#', 2),
  ('Data Science in Python', '', 'DataCamp', '/assets/Certificates/3.png', '#', 3),
  ('Java Foundation', '', 'Oracle', '/assets/Certificates/4.png', '#', 4),
  ('AI For Everyone', '', 'DeelLearning.AI', '/assets/Certificates/5.png', '/assets/Certificates/5.png', 5),
  ('UI/UX', '', 'GreatLearning', '/assets/Certificates/6.png', '#', 6);

insert into public.experiences (company, period, role, duties, sort_order) values
(
  'SP Madrid & Associates',
  'February 2025 - April 2025',
  'AI/ML Intern',
  array[
    'Developed and deployed machine learning models for tasks such as conduction sticker text detection and vehicle classification using YOLO-based architectures.',
    'Built data preprocessing pipelines and annotated custom datasets to train high-accuracy computer vision models.',
    'Optimized model performance by fine-tuning hyperparameters and applying data augmentation techniques.',
    'Created FastAPI routes for the models to be consumed by the front-end.'
  ],
  1
),
(
  'Tails of Manila',
  'September 2023 - January 2025',
  'Social Media Manager',
  array[
    'Applied skills in data analysis and visualization to drive targeted marketing campaigns and increase online visibility.',
    'Designed, developed, and scheduled engaging content (posts, images, videos) to maintain the brand''s online presence.',
    'Monitored comments, messages, and trends to interact with followers, answer inquiries, and manage brand reputation.'
  ],
  2
),
(
  'Fiverr',
  'January 2019 - Present',
  'Freelance Multimedia Editor',
  array[
    'Collaborated with clients to analyze multimedia data and optimize content performance.',
    'Designed, created, and illustrated graphic illustrations and vector designs using tools from Adobe Creative Suite.',
    'Achieved "Level 2" badge on Fiverr for exceptional freelance performance.'
  ],
  3
);
