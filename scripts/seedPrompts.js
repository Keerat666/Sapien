const mongoose = require('mongoose');
const Prompt = require('../models/Prompt');
require('dotenv').config();

// Sample prompts data
const samplePrompts = [
  {
    title: "Creative Writing Assistant",
    description: "A prompt to help generate creative stories and narratives",
    content: "Write a creative story about [TOPIC]. Include vivid descriptions, character development, and an engaging plot. Make it approximately 500 words long.",
    category: "Writing",
    tags: ["creative", "storytelling", "writing"],
    resultType: "text",
    sampleOutput: "Once upon a time, in a distant galaxy...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 45,
    likes: 12,
    uses: 8,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z")
  },
  {
    title: "Code Review Assistant",
    description: "Get detailed code reviews and suggestions for improvement",
    content: "Review the following code and provide suggestions for improvement:\n\n[CODE]\n\nFocus on: performance, readability, best practices, and potential bugs.",
    category: "Programming",
    tags: ["coding", "review", "javascript"],
    resultType: "text",
    sampleOutput: "Your code looks good overall, but here are some suggestions...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 78,
    likes: 23,
    uses: 15,
    createdAt: new Date("2024-01-14T14:20:00Z"),
    updatedAt: new Date("2024-01-14T14:20:00Z")
  },
  {
    title: "Recipe Generator",
    description: "Generate creative recipes based on available ingredients",
    content: "Create a delicious recipe using these ingredients: [INGREDIENTS]. Include preparation time, cooking time, and step-by-step instructions.",
    category: "Cooking",
    tags: ["recipe", "cooking", "food"],
    resultType: "text",
    sampleOutput: "Here's a delicious recipe for you...",
    worksBestWith: ["GPT-4", "GPT-3.5"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 156,
    likes: 34,
    uses: 22,
    createdAt: new Date("2024-01-13T09:15:00Z"),
    updatedAt: new Date("2024-01-13T09:15:00Z")
  },
  {
    title: "Business Email Writer",
    description: "Generate professional business emails",
    content: "Write a professional business email for the following purpose: [PURPOSE]. Include appropriate greeting, body, and closing. Keep it concise and professional.",
    category: "Business",
    tags: ["email", "business", "professional"],
    resultType: "text",
    sampleOutput: "Subject: [Appropriate Subject]\n\nDear [Name],\n\nI hope this email finds you well...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 89,
    likes: 18,
    uses: 12,
    createdAt: new Date("2024-01-12T16:45:00Z"),
    updatedAt: new Date("2024-01-12T16:45:00Z")
  },
  {
    title: "Study Guide Generator",
    description: "Create comprehensive study guides for any topic",
    content: "Create a detailed study guide for [TOPIC]. Include key concepts, important points, examples, and practice questions.",
    category: "Education",
    tags: ["study", "education", "learning"],
    resultType: "text",
    sampleOutput: "Study Guide: [Topic]\n\nKey Concepts:\n1. [Concept 1]\n2. [Concept 2]...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 134,
    likes: 28,
    uses: 19,
    createdAt: new Date("2024-01-11T11:30:00Z"),
    updatedAt: new Date("2024-01-11T11:30:00Z")
  },
  {
    title: "Image Description Generator",
    description: "Generate detailed descriptions for images",
    content: "Provide a detailed description of this image, including colors, objects, people, setting, mood, and any notable details.",
    category: "Vision",
    tags: ["image", "description", "vision"],
    resultType: "text",
    sampleOutput: "This image shows a beautiful landscape with...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 67,
    likes: 15,
    uses: 9,
    createdAt: new Date("2024-01-10T13:20:00Z"),
    updatedAt: new Date("2024-01-10T13:20:00Z")
  },
  {
    title: "Meeting Summary Generator",
    description: "Summarize meeting notes and extract key points",
    content: "Summarize the following meeting notes and extract key decisions, action items, and important points:\n\n[MEETING_NOTES]",
    category: "Business",
    tags: ["meeting", "summary", "productivity"],
    resultType: "text",
    sampleOutput: "Meeting Summary:\n\nKey Decisions:\n- [Decision 1]\n- [Decision 2]...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 92,
    likes: 21,
    uses: 14,
    createdAt: new Date("2024-01-09T15:10:00Z"),
    updatedAt: new Date("2024-01-09T15:10:00Z")
  },
  {
    title: "Poetry Generator",
    description: "Create beautiful poems in various styles",
    content: "Write a [STYLE] poem about [TOPIC]. Include vivid imagery, emotional depth, and follow the traditional structure of [STYLE] poetry.",
    category: "Writing",
    tags: ["poetry", "creative", "literature"],
    resultType: "text",
    sampleOutput: "In the quiet of the morning light...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 43,
    likes: 19,
    uses: 7,
    createdAt: new Date("2024-01-08T12:00:00Z"),
    updatedAt: new Date("2024-01-08T12:00:00Z")
  },
  {
    title: "Debugging Assistant",
    description: "Help debug code issues and find solutions",
    content: "I'm getting this error: [ERROR_MESSAGE]. Here's my code: [CODE]. Please help me debug this issue and provide a solution.",
    category: "Programming",
    tags: ["debugging", "coding", "javascript"],
    resultType: "text",
    sampleOutput: "The issue appears to be caused by... Here's the solution:",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 178,
    likes: 42,
    uses: 31,
    createdAt: new Date("2024-01-07T14:30:00Z"),
    updatedAt: new Date("2024-01-07T14:30:00Z")
  },
  {
    title: "Travel Itinerary Planner",
    description: "Create detailed travel itineraries",
    content: "Create a [DURATION] day travel itinerary for [DESTINATION]. Include attractions, restaurants, transportation, and estimated costs.",
    category: "Travel",
    tags: ["travel", "itinerary", "planning"],
    resultType: "text",
    sampleOutput: "Day 1:\nMorning: [Activity 1]\nAfternoon: [Activity 2]...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 123,
    likes: 31,
    uses: 18,
    createdAt: new Date("2024-01-06T10:45:00Z"),
    updatedAt: new Date("2024-01-06T10:45:00Z")
  },
  {
    title: "Product Description Writer",
    description: "Generate compelling product descriptions for e-commerce",
    content: "Write a compelling product description for [PRODUCT]. Highlight key features, benefits, and why customers should buy it. Keep it engaging and persuasive.",
    category: "Marketing",
    tags: ["marketing", "product", "sales"],
    resultType: "text",
    sampleOutput: "Introducing [Product] - the perfect solution for...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 87,
    likes: 24,
    uses: 16,
    createdAt: new Date("2024-01-05T16:20:00Z"),
    updatedAt: new Date("2024-01-05T16:20:00Z")
  },
  {
    title: "Fitness Workout Generator",
    description: "Create personalized workout plans",
    content: "Create a [DURATION] minute workout for [FITNESS_LEVEL] focusing on [GOAL]. Include exercises, sets, reps, and rest periods.",
    category: "Fitness",
    tags: ["fitness", "workout", "exercise"],
    resultType: "text",
    sampleOutput: "Here's your personalized workout plan:\n\nWarm-up (5 minutes)...",
    worksBestWith: ["GPT-4", "GPT-3.5"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 145,
    likes: 37,
    uses: 25,
    createdAt: new Date("2024-01-04T08:30:00Z"),
    updatedAt: new Date("2024-01-04T08:30:00Z")
  },
  {
    title: "Language Learning Helper",
    description: "Practice conversations in different languages",
    content: "Help me practice [LANGUAGE] conversation. Create a dialogue about [TOPIC] with translations and pronunciation tips.",
    category: "Education",
    tags: ["language", "learning", "conversation"],
    resultType: "text",
    sampleOutput: "Here's a conversation in [Language]:\n\nEnglish: [Phrase]\n[Language]: [Translation]",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 76,
    likes: 22,
    uses: 13,
    createdAt: new Date("2024-01-03T13:15:00Z"),
    updatedAt: new Date("2024-01-03T13:15:00Z")
  },
  {
    title: "Social Media Content Creator",
    description: "Generate engaging social media posts",
    content: "Create engaging social media content for [PLATFORM] about [TOPIC]. Include hashtags and a call-to-action. Keep it within platform character limits.",
    category: "Marketing",
    tags: ["social media", "content", "marketing"],
    resultType: "text",
    sampleOutput: "Here's your social media post:\n\n[Content]\n\n#hashtag1 #hashtag2",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 98,
    likes: 26,
    uses: 17,
    createdAt: new Date("2024-01-02T11:45:00Z"),
    updatedAt: new Date("2024-01-02T11:45:00Z")
  },
  {
    title: "Technical Documentation Writer",
    description: "Create clear technical documentation",
    content: "Write technical documentation for [FEATURE/SYSTEM]. Include overview, setup instructions, usage examples, and troubleshooting tips.",
    category: "Programming",
    tags: ["documentation", "technical", "programming"],
    resultType: "text",
    sampleOutput: "# [Feature/System] Documentation\n\n## Overview\n[Description]...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 112,
    likes: 29,
    uses: 20,
    createdAt: new Date("2024-01-01T09:00:00Z"),
    updatedAt: new Date("2024-01-01T09:00:00Z")
  },
  {
    title: "Interview Question Generator",
    description: "Create interview questions for various roles",
    content: "Generate [NUMBER] interview questions for a [ROLE] position. Include behavioral, technical, and situational questions.",
    category: "HR",
    tags: ["interview", "hr", "recruitment"],
    resultType: "text",
    sampleOutput: "Here are interview questions for [Role]:\n\n1. Behavioral: [Question]\n2. Technical: [Question]...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 156,
    likes: 41,
    uses: 28,
    createdAt: new Date("2023-12-31T15:30:00Z"),
    updatedAt: new Date("2023-12-31T15:30:00Z")
  },
  {
    title: "Financial Analysis Helper",
    description: "Analyze financial data and provide insights",
    content: "Analyze the following financial data: [DATA]. Provide insights on trends, risks, and recommendations for improvement.",
    category: "Finance",
    tags: ["finance", "analysis", "business"],
    resultType: "text",
    sampleOutput: "Financial Analysis Report:\n\nKey Findings:\n- [Finding 1]\n- [Finding 2]...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 89,
    likes: 23,
    uses: 15,
    createdAt: new Date("2023-12-30T12:20:00Z"),
    updatedAt: new Date("2023-12-30T12:20:00Z")
  },
  {
    title: "Creative Brainstorming Session",
    description: "Facilitate creative brainstorming sessions",
    content: "Help me brainstorm ideas for [PROJECT/TOPIC]. Use creative thinking techniques to generate innovative and unique concepts.",
    category: "Creative",
    tags: ["brainstorming", "creative", "ideation"],
    resultType: "text",
    sampleOutput: "Let's brainstorm ideas for [Topic]:\n\n1. [Idea 1] - [Explanation]\n2. [Idea 2] - [Explanation]...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 67,
    likes: 18,
    uses: 11,
    createdAt: new Date("2023-12-29T14:10:00Z"),
    updatedAt: new Date("2023-12-29T14:10:00Z")
  },
  {
    title: "Data Visualization Suggestions",
    description: "Recommend the best charts and graphs for data",
    content: "I have data about [DATA_TYPE]. What type of visualization would be most effective? Provide suggestions and explain why.",
    category: "Data",
    tags: ["data", "visualization", "charts"],
    resultType: "text",
    sampleOutput: "For your [data type] data, I recommend:\n\n1. [Chart Type] - [Reason]\n2. [Chart Type] - [Reason]...",
    worksBestWith: ["GPT-4", "Claude-3"],
    version: 1,
    isActive: true,
    createdBy: "system",
    views: 134,
    likes: 35,
    uses: 22,
    createdAt: new Date("2023-12-28T10:45:00Z"),
    updatedAt: new Date("2023-12-28T10:45:00Z")
  }
];

async function seedPrompts() {
  try {
    console.log('🌱 Starting to seed prompts...');
    
    // Connect to MongoDB using the same config as your app
    const connectDB = require('../config/database');
    await connectDB();
    
    // Clear existing prompts (optional - remove this if you want to keep existing data)
    const existingCount = await Prompt.countDocuments();
    if (existingCount > 0) {
      console.log(`📊 Found ${existingCount} existing prompts`);
      const shouldClear = process.argv.includes('--clear');
      if (shouldClear) {
        await Prompt.deleteMany({});
        console.log('🗑️  Cleared existing prompts');
      } else {
        console.log('ℹ️  Use --clear flag to remove existing prompts first');
      }
    }
    
    // Insert sample prompts
    const insertedPrompts = await Prompt.insertMany(samplePrompts);
    console.log(`✅ Successfully inserted ${insertedPrompts.length} prompts!`);
    
    // Display summary
    const categories = [...new Set(samplePrompts.map(p => p.category))];
    console.log(`📋 Categories: ${categories.join(', ')}`);
    
    const totalViews = samplePrompts.reduce((sum, p) => sum + p.views, 0);
    const totalLikes = samplePrompts.reduce((sum, p) => sum + p.likes, 0);
    console.log(`📊 Total views: ${totalViews}, Total likes: ${totalLikes}`);
    
    console.log('🎉 Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding prompts:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seeding function
seedPrompts();
