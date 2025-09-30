export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  totalPrompts: number;
  totalStars: number;
  badges: string[];
  joinDate: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  author: User;
  category: string;
  tags: string[];
  stars: number;
  views: number;
  comments: number;
  createdAt: string;
  isStarred?: boolean;
  image?: string;
  rating: number;
  ratingCount?: number;
  samples?: string[];
  resultType?: 'text' | 'image' | 'video';
  sampleUploads?: {
    type: 'image' | 'video' | 'text';
    url: string;
    caption?: string;
  }[];
  bestModels?: string[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface PromptList {
  id: string;
  name: string;
  description?: string;
  author: User;
  prompts: string[];
  isPublic: boolean;
  createdAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Chen',
    username: 'alexchen',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    bio: 'AI enthusiast & prompt engineer. Love crafting creative prompts for art and writing.',
    totalPrompts: 42,
    totalStars: 1247,
    badges: ['Top Creator', 'Early Adopter'],
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Kim',
    username: 'sarahk',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b37c?w=150',
    bio: 'Digital artist exploring AI creativity. Sharing prompts for stunning visual art.',
    totalPrompts: 38,
    totalStars: 892,
    badges: ['Artist'],
    joinDate: '2024-02-03'
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    username: 'mjohnson',
    email: 'marcus@example.com',
    bio: 'Writer and storyteller. Crafting prompts for narrative and creative writing.',
    totalPrompts: 29,
    totalStars: 654,
    badges: ['Writer'],
    joinDate: '2024-01-28'
  }
];

// Mock Categories
export const mockCategories = [
  'All',
  'Art & Design',
  'Writing & Content',
  'Coding & Development',
  'Marketing & Business',
  'Education & Learning',
  'Entertainment & Fun',
  'Productivity & Tools'
];

// Mock Prompts
export const mockPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Cyberpunk City Generator',
    description: 'Create stunning futuristic cityscapes with neon lights and dystopian atmosphere',
    content: 'Create a detailed cyberpunk cityscape at night, featuring towering neon-lit skyscrapers, flying cars, holographic advertisements, rain-soaked streets reflecting colorful lights, and a moody atmospheric perspective...',
    author: mockUsers[0],
    category: 'Art & Design',
    tags: ['cyberpunk', 'futuristic', 'neon', 'cityscape'],
    stars: 324,
    views: 2847,
    comments: 45,
    createdAt: '2024-12-01',
    rating: 4.8,
    ratingCount: 156,
    samples: [
      "A sprawling cyberpunk metropolis at midnight, with towering neon-lit skyscrapers piercing through dense fog, flying vehicles weaving between buildings, holographic advertisements floating in mid-air, and rain-soaked streets reflecting the kaleidoscope of colors from above.",
      "Dystopian cityscape with massive corporate towers dominating the skyline, underground markets glowing with artificial light, cybernetic-enhanced humans walking through narrow alleyways, and digital billboards casting an eerie glow on the perpetual urban twilight."
    ],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
    resultType: 'image' as const,
    sampleUploads: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
        caption: 'Sample cyberpunk cityscape generated with this prompt'
      }
    ],
    bestModels: ['DALL-E 3', 'Midjourney', 'Stable Diffusion']
  },
  {
    id: '2',
    title: 'Fantasy Character Creator',
    description: 'Generate detailed fantasy characters with rich backstories and unique traits',
    content: 'Create a fantasy character: [Character Type], [Age], with [Physical Description], [Personality Traits], [Background Story], [Special Abilities], [Motivation], [Fatal Flaw]...',
    author: mockUsers[1],
    category: 'Writing & Content',
    tags: ['fantasy', 'character', 'storytelling', 'RPG'],
    stars: 289,
    views: 1923,
    comments: 32,
    createdAt: '2024-11-28',
    rating: 4.7,
    ratingCount: 89,
    samples: [
      "Elara Moonwhisper, a 127-year-old elven ranger with silver hair braided with starlight moss, emerald eyes that glow in darkness, skilled in ancient forest magic and beast communication, driven by a quest to restore the dying World Tree, but haunted by the guilt of accidentally awakening an ancient evil during her youth.",
      "Thorick Ironbeard, a 45-year-old dwarven artificer with intricate mechanical arm prosthetics, beard woven with copper wires, master of steam-powered inventions and runic enchantments, seeks to prove that technology and magic can coexist, though his creations sometimes malfunction catastrophically due to his impatience."
    ],
    resultType: 'text' as const,
    bestModels: ['GPT-4', 'Claude-3', 'Gemini Pro']
  },
  {
    id: '3',
    title: 'Modern Logo Design',
    description: 'Professional logo concepts with clean aesthetics and brand personality',
    content: 'Design a modern, minimalist logo for [Company Name] in [Industry]. Style: clean, professional, memorable. Colors: [Color Palette]. Should convey: [Brand Values]. Format: vector, scalable...',
    author: mockUsers[2],
    category: 'Art & Design',
    tags: ['logo', 'branding', 'design', 'minimalist'],
    stars: 467,
    views: 3421,
    comments: 67,
    createdAt: '2024-11-25',
    rating: 4.9,
    ratingCount: 203,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400'
  },
  {
    id: '4',
    title: 'React Component Generator',
    description: 'Generate clean, reusable React components with TypeScript support',
    content: 'Create a React component called [ComponentName] that [Functionality]. Include TypeScript types, props interface, default values, and JSDoc comments. Follow React best practices...',
    author: mockUsers[0],
    category: 'Coding & Development',
    tags: ['react', 'typescript', 'component', 'frontend'],
    stars: 198,
    views: 1456,
    comments: 23,
    createdAt: '2024-11-22',
    rating: 4.6,
    ratingCount: 78
  },
  {
    id: '5',
    title: 'Marketing Email Template',
    description: 'Engaging email templates that convert with personalized messaging',
    content: 'Write a marketing email for [Product/Service] targeting [Audience]. Subject line should be compelling, content should include [Key Benefits], social proof, clear CTA. Tone: [Brand Voice]...',
    author: mockUsers[1],
    category: 'Marketing & Business',
    tags: ['email', 'marketing', 'conversion', 'copywriting'],
    stars: 234,
    views: 1789,
    comments: 29,
    createdAt: '2024-11-20',
    rating: 4.5,
    ratingCount: 67
  },
  {
    id: '6',
    title: 'Productivity Planner',
    description: 'Structured daily planning template for maximum productivity',
    content: 'Create a daily productivity plan: Morning routine (30 min), Priority tasks (3 max), Time blocks, Break schedule, Evening reflection. Include goal tracking and habit formation...',
    author: mockUsers[2],
    category: 'Productivity & Tools',
    tags: ['productivity', 'planning', 'habits', 'goals'],
    stars: 156,
    views: 987,
    comments: 18,
    createdAt: '2024-11-18',
    rating: 4.4,
    ratingCount: 45
  }
];

// Current user (mock authenticated user)
export const currentUser: User = mockUsers[0];

// Mock user's saved prompts
export const savedPrompts = ['2', '3', '5'];

// Mock user's lists
export const mockLists: PromptList[] = [
  {
    id: '1',
    name: 'AI Art Inspiration',
    description: 'Collection of my favorite art generation prompts',
    author: currentUser,
    prompts: ['1', '3'],
    isPublic: true,
    createdAt: '2024-11-15'
  },
  {
    id: '2',
    name: 'Writing Tools',
    description: 'Helpful prompts for creative writing',
    author: currentUser,
    prompts: ['2', '5'],
    isPublic: false,
    createdAt: '2024-11-10'
  }
];

// Mock comments
export const mockComments: { [promptId: string]: Comment[] } = {
  '1': [
    {
      id: '1',
      author: mockUsers[1],
      content: 'Amazing prompt! Got incredible results with this. The detail level is perfect.',
      createdAt: '2024-12-02',
      likes: 12,
      replies: [
        {
          id: '2',
          author: mockUsers[0],
          content: 'Thanks! Glad it worked well for you. Would love to see what you created!',
          createdAt: '2024-12-02',
          likes: 3
        }
      ]
    },
    {
      id: '3',
      author: mockUsers[2],
      content: 'This is exactly what I was looking for. The cyberpunk aesthetic came out perfectly.',
      createdAt: '2024-12-01',
      likes: 8
    }
  ]
};