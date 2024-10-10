# Helper: Your Programming Q&A Hub

Helper is a robust platform for developers to ask questions, share knowledge, and collaborate with peers from around the world. Whether you're diving into web development, mobile app creation, algorithms, or data structures, DevConnect is your go-to resource for programming insights and community support.

## 🌟 Features

- **Authentication**: Secure user authentication powered by Clerk
- **Question Management**: Create, update, and delete questions
- **Answer Interactions**: Post, edit, and remove answers to community questions
- **Voting System**: Upvote or downvote questions and answers
- **Bookmarking**: Save questions for later reference
- **User Profiles**: Customize your profile and view detailed user information
- **Tag Exploration**: Discover questions by popular tags
- **Advanced Filtering**: Sort and filter content across various categories:
  - Home Page: Newest, Recommended, Frequent, Unanswered
  - Users: New Users, Old Users, Top Contributors
  - Tags: Popular, Recent, Name, Old
  - Answers: Highest Upvotes, Lowest Upvotes, Most Recent, Oldest
  - Questions: Most Recent, Oldest, Most Voted, Most Viewed, Most Answered
  - Global Search: Questions, Answers, Users, Tags
- **Powerful Search**: Comprehensive search functionality across the entire platform
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Responsive Design**: Seamless experience across desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js with Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **Styling**: Tailwind CSS, Radix UI components
- **Form Handling**: React Hook Form with Zod validation
- **Rich Text Editing**: TinyMCE
- **Code Highlighting**: Prism.js
- **State Management**: React Context API (built-in)
- **Type Checking**: TypeScript

## 🚀 Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/PrtHub/Helper.git
   ```

2. Install dependencies:
   ```
   cd Helper
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary environment variables (e.g., Clerk API keys, MongoDB connection string).

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🤝 Contributing

I welcome contributions from the community!

## 🙏 Acknowledgements

- [Clerk](https://clerk.dev/) for authentication
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [TinyMCE](https://www.tiny.cloud/) for rich text editing
- [MongoDB](https://www.mongodb.com/) for database services
- And all the amazing open-source libraries that made this project possible!

---

Built with ❤️ by Pritam Ghosh.
