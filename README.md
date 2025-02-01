# Battleship Game

A modern implementation of the classic Battleship board game built with React, TypeScript, and Tailwind CSS.
![Battleship screenshot](https://github.com/user-attachments/assets/03c1f51c-7cb7-4c4d-93a8-3f4c5111160a)


## Features

- 🎮 Classic Battleship gameplay against a computer opponent
- 🚢 Interactive ship placement with rotation
- 💥 Real-time hit/miss feedback
- 🎯 Smart computer opponent
- 📱 Responsive design for all screen sizes
- 🎨 Modern UI with smooth animations

## How to Play

1. **Setup Phase**
   - Place your ships on your board by clicking the desired position
   - Use the "Rotate Ship" button to change ship orientation
   - Ships to place: Carrier (5), Battleship (4), Cruiser (3), Submarine (3), Destroyer (2)

2. **Battle Phase**
   - Take turns attacking the computer's board by clicking cells
   - Red indicates a hit, white indicates a miss
   - The computer will automatically take its turn after your move
   - Sink all enemy ships to win!

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/         # React components
├── context/           # Game context and state management
├── types/             # TypeScript type definitions
├── utils/             # Game logic utilities
└── main.tsx          # Application entry point
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for learning or as a base for your own Battleship game implementation.
