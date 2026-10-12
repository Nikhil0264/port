// Edit this list to add, reorder, feature, or archive portfolio projects.
// Keep `published` true only for work ready to share. Add real URLs when confirmed.
window.PORTFOLIO_PROJECTS = [
  {
    slug: 'researchmind', title: 'ResearchMind', category: 'Multi-Agent AI Research System', featured: true, priority: 1, status: 'published',
    description: 'An AI-powered research platform that uses specialized agents to search the web, extract information, generate reports, and evaluate output quality.',
    problem: 'Researching a broad question requires searching multiple sources, extracting useful information, and reviewing a coherent report.',
    solution: 'A four-stage research workflow coordinates Search, Reader, Writer, and Critic agents to gather web content, draft a report, and evaluate the output.',
    architecture: ['User query', 'Search agent', 'Reader agent', 'Writer agent', 'Critic agent', 'Research report'],
    decisions: ['Separate the pipeline into focused agent responsibilities', 'Use web search and page extraction as research tools', 'Include a critic stage to review generated output'],
    challenges: 'Coordinating research stages and passing useful source context through report generation and review.',
    outcome: 'A multi-agent research project with a structured search, reading, writing, and review pipeline.',
    technologies: ['LangChain', 'Groq LLMs', 'Tavily Search API', 'BeautifulSoup', 'Python'], github: '', demo: '', featuredStatus: 'Featured'
  },
  {
    slug: 'mcp-supervisor', title: 'MCP Supervisor', category: 'Multi-Agent AI Orchestration', featured: true, priority: 2, status: 'published',
    description: 'A modular multi-agent system built around supervisor routing, MCP integration, validation, and human-in-the-loop approval workflows.',
    problem: 'Tool-using agent workflows need structured routing, validation, and a clear place for human review.',
    solution: 'A supervisor routes requests to specialized agents and tools, then moves outputs through validation and approval before returning a response.',
    architecture: ['User input', 'Supervisor', 'Specialized agents', 'MCP tools', 'Validation', 'Human approval', 'Final response'],
    decisions: ['Use a supervisor to coordinate specialized agents', 'Include validation and guardrail stages', 'Provide a human approval step in the workflow'],
    challenges: 'Handling routing, validation, and approval states while keeping orchestration modular and errors understandable.',
    outcome: 'A modular orchestration project demonstrating supervisor routing and human-in-the-loop workflow design.',
    technologies: ['LangGraph', 'MCP', 'LLMs', 'Python', 'Agent workflows'], github: '', demo: '', featuredStatus: 'Featured'
  },
  {
    slug: 'blogchain', title: 'BlogChain / TCB Corporate Blog', category: 'Full-Stack Production Application', featured: true, priority: 3, status: 'published',
    description: 'A blog platform with cloud media storage, SEO optimization, structured data, sitemap support, and modern web application architecture.',
    problem: 'A corporate publishing platform needs an editorial experience alongside discoverable, polished content pages.',
    solution: 'A Next.js application with Neon, Cloudinary media, metadata, structured data, and sitemap support.',
    architecture: ['Content editor', 'Next.js application', 'Neon database', 'Cloudinary media', 'SEO metadata'],
    decisions: ['Use managed database and media services', 'Build metadata and structured data into the content experience', 'Support sitemap generation'],
    challenges: 'Connecting publishing, media management, and search-friendly page metadata in one application.',
    outcome: 'Resume-listed 90+ Lighthouse performance and SEO scores.',
    technologies: ['Next.js', 'Neon', 'Cloudinary', 'Vercel', 'SEO'], github: '', demo: '', featuredStatus: 'Featured'
  },
  {
    slug: 'logic-looper', title: 'Logic Looper', category: 'Interactive React Puzzle Application', featured: false, priority: 4, status: 'published',
    description: 'An interactive daily puzzle application designed around engagement, persistent progress, and offline-first functionality.',
    problem: 'A daily puzzle should preserve progress and remain usable when a player is offline.',
    solution: 'A React puzzle experience with Redux state, IndexedDB persistence, and deterministic SHA-256 daily puzzle generation.',
    architecture: ['Daily seed', 'Puzzle state', 'React + Redux', 'IndexedDB', 'Offline play'],
    decisions: ['Persist progress locally', 'Generate daily puzzles deterministically', 'Keep interaction client-side'],
    challenges: 'Maintaining predictable daily puzzle generation and persistence across sessions.',
    outcome: 'A daily puzzle application with streak-oriented play and offline support.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'IndexedDB', 'SHA-256'], github: '', demo: '', featuredStatus: 'Supporting'
  },
  {
    slug: 'healthplus', title: 'HealthPlus', category: 'Full-Stack Healthcare Platform', featured: false, priority: 5, status: 'published',
    description: 'A healthcare application concept connecting patients and doctors through appointment management, real-time communication, and video consultation.',
    problem: 'Patients and doctors need connected workflows for appointment management and communication.',
    solution: 'A MERN application concept with JWT authentication, role-based workflows, Socket.IO communication, and WebRTC video consultation.',
    architecture: ['Patient / doctor', 'Authenticated app', 'Appointment flow', 'Realtime channel', 'Consultation'],
    decisions: ['Support patient and doctor roles', 'Use realtime communication for connected workflows', 'Integrate video consultation'],
    challenges: 'Connecting user roles, appointment management, realtime communication, and video in one application.',
    outcome: 'A full-stack healthcare application concept; not presented as clinically validated or deployed.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Socket.IO', 'WebRTC'], github: '', demo: '', featuredStatus: 'Supporting'
  },
  {
    slug: 'dog-cat-classification', title: 'Dog vs Cat Image Classification', category: 'Computer Vision', featured: false, priority: 6, status: 'published',
    description: 'A deep learning image classification project exploring preprocessing, model training, and classification of dog and cat images.',
    problem: 'Image classification provides a practical way to explore computer vision model training and evaluation.',
    solution: 'A two-class image workflow covering preprocessing, deep learning model training, and evaluation.',
    architecture: ['Image input', 'Preprocessing', 'Model training', 'Evaluation', 'Class prediction'],
    decisions: ['Prepare image inputs consistently', 'Train a model for two categories', 'Evaluate model predictions'],
    challenges: 'Preparing image data and assessing classification quality across dog and cat examples.',
    outcome: 'A hands-on computer vision project exploring image preprocessing and model evaluation.',
    technologies: ['Python', 'Deep Learning', 'Computer Vision', 'Image Processing'], github: '', demo: '', featuredStatus: 'Supporting'
  }
].filter(project => project.status === 'published').sort((a, b) => a.priority - b.priority);
