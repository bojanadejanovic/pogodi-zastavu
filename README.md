# Pogodi Zastavu - Flag Guessing Game

A fun and interactive flag guessing game built with Next.js, TypeScript, and Tailwind CSS. Test your knowledge of world flags with multiple choice questions!

## Features

- 🏁 **Interactive Gameplay**: Answer 10 multiple choice questions about world flags
- 🎯 **True Randomness**: Flags are randomly selected from a pool of over 200 countries
- 📊 **Score Tracking**: Keep track of your correct answers
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 📱 **Mobile Friendly**: Works perfectly on all device sizes
- 🔄 **Replayable**: Play again to improve your score
- 🌍 **Bilingual**: Support for English and Serbian
- 🚩 **Error Reporting**: Report issues with questions via email
- 🎉 **Confetti Animation**: Special celebration for perfect scores

## Game Flow

1. **Start Screen**: Welcome page with game instructions
2. **Question Screen**: Display flag image with 4 country options
3. **Feedback**: Immediate visual feedback for correct/incorrect answers
4. **Results Screen**: Final score with percentage and performance message
5. **Restart**: Option to play again with new random questions

## Countries Included

The game includes flags from over 200 countries and territories, providing a truly diverse and challenging experience.

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

3. Set up environment variables (optional, for error reporting):
```bash
# Create .env.local file
MAILGUN_API_KEY=your-mailgun-api-key-here
MAILGUN_DOMAIN=your-mailgun-domain.com
REPORT_EMAIL=your-email@example.com
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

For error reporting functionality, you can set up the following environment variables:

- `MAILGUN_API_KEY`: Your Mailgun API key
- `MAILGUN_DOMAIN`: Your Mailgun domain
- `REPORT_EMAIL`: Email address where error reports will be sent

If these variables are not set, the error reporting feature will be disabled.

## Project Structure

```
pogodi-zastavu/
├── app/
│   ├── api/
│   │   └── report-error/     # Error reporting API endpoint
│   ├── components/
│   │   ├── Confetti.tsx      # Confetti animation component
│   │   ├── FlagQuestion.tsx  # Individual question component
│   │   ├── Footer.tsx        # Footer component
│   │   ├── GameResults.tsx   # Results screen component
│   │   ├── GameStart.tsx     # Welcome screen component
│   │   ├── LanguageSwitcher.tsx # Language switcher
│   │   └── ReportError.tsx   # Error reporting modal
│   ├── contexts/
│   │   └── LanguageContext.tsx # Language context provider
│   ├── data/
│   │   ├── countries.ts      # Countries data
│   │   └── flags.ts          # Flag questions logic
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main game page
├── messages/
│   ├── en.json              # English translations
│   └── sr.json              # Serbian translations
├── public/
│   └── flags_svg/           # Flag images directory
├── package.json
├── tailwind.config.js
└── README.md
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management and side effects
- **Mailgun**: Email service for error reporting
- **Canvas Confetti**: Confetti animation library

## Customization

### Adding More Countries

1. Add flag images to `public/flags_svg/`
2. Update the `countries` array in `app/data/countries.ts`
3. Add new country objects with correct answers and options

### Changing Game Settings

- Modify `getRandomQuestions(10)` in `app/data/flags.ts` to change the number of questions
- Update styling in component files or `tailwind.config.js`
- Adjust timing in `FlagQuestion.tsx` for result display duration

## Error Reporting

Users can report issues with questions by clicking the "Report an error" link below the submit button. This will:

1. Open a modal with question information
2. Allow users to describe the issue
3. Optionally provide their email for follow-up
4. Send the report to your configured email address

## Deployment

The app can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform:

```bash
npm run build
npm start
```

For Vercel deployment, make sure to set the environment variables in the Vercel dashboard.

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