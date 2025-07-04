# Pogodi Zastavu - Flag Guessing Game

A fun and interactive flag guessing game built with Next.js, TypeScript, and Tailwind CSS. Test your knowledge of world flags with multiple choice questions!

## Features

- 🏁 **Interactive Gameplay**: Answer 4 multiple choice questions about world flags
- 🎯 **Random Selection**: Flags are randomly selected from a pool of 10 countries
- 📊 **Score Tracking**: Keep track of your correct answers
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 📱 **Mobile Friendly**: Works perfectly on all device sizes
- 🔄 **Replayable**: Play again to improve your score

## Game Flow

1. **Start Screen**: Welcome page with game instructions
2. **Question Screen**: Display flag image with 4 country options
3. **Feedback**: Immediate visual feedback for correct/incorrect answers
4. **Results Screen**: Final score with percentage and performance message
5. **Restart**: Option to play again with new random questions

## Countries Included

The game includes all flags located in `public\flags_svg`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pogodi-zastavu
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Add flag images:
   - Create a `public/flags/` directory
   - Add flag images with the following names:
     - `usa.png`
     - `france.png`
     - `japan.png`
     - `brazil.png`
     - `germany.png`
     - `italy.png`
     - `spain.png`
     - `canada.png`
     - `australia.png`
     - `uk.png`

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
pogodi-zastavu/
├── app/
│   ├── components/
│   │   ├── FlagQuestion.tsx    # Individual question component
│   │   ├── GameResults.tsx     # Results screen component
│   │   └── GameStart.tsx       # Welcome screen component
│   ├── data/
│   │   └── flags.ts           # Flag questions data
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main game page
├── public/
│   └── flags/                 # Flag images directory
├── package.json
├── tailwind.config.js
└── README.md
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management and side effects

## Customization

### Adding More Countries

1. Add flag images to `public/flags/`
2. Update the `flagQuestions` array in `app/data/flags.ts`
3. Add new question objects with correct answers and options

### Changing Game Settings

- Modify `getRandomQuestions(4)` in `app/page.tsx` to change the number of questions
- Update styling in component files or `tailwind.config.js`
- Adjust timing in `FlagQuestion.tsx` for result display duration

## Deployment

The app can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform:

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Flag images should be sourced from public domain or properly licensed sources
- Inspired by educational geography games
- Built for learning and entertainment purposes 