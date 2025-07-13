# FC24 Player Market Value Prediction Tool

This web application predicts the market value of football players based on their attributes, position, and other characteristics. It uses machine learning models trained on FC24 player data to provide accurate market value estimations for different player positions.

## Features

- **AI-Powered Predictions**: Advanced machine learning algorithms for accurate market value estimation
- **Position-Specific Models**: Separate trained models for each football position (GK, CB, CM, ST, etc.)
- **Comprehensive Attribute System**: Support for 40+ player attributes including pace, shooting, passing, defending, and more
- **Modern UI**: Beautiful, responsive interface built with React and TailwindCSS
- **Real-time Predictions**: Instant market value calculations based on player data
- **Pre-filled Forms**: Default values for quick testing and evaluation
- **Interactive Design**: Gradient backgrounds, animations, and modern card layouts

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **React Hook Form** - Form validation and management
- **Zod** - Schema validation
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

### Backend
- **Python** - Core programming language
- **FastAPI** - Modern, fast web framework for building APIs
- **Scikit-learn** - Machine learning models
- **Pandas** - Data manipulation and analysis
- **Joblib** - Model serialization
- **Uvicorn** - ASGI server

## Project Structure

```
fc24-prediction/
├── README.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env
├── src/
│   ├── components/         # React components
│   ├── constants/          # Data mappings and configurations
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   └── App.jsx            # Main application component
├── server/
│   ├── api/
│   │   ├── controller.py  # FastAPI application
│   │   └── labels.json    # Position and attribute mappings
│   ├── saved_models/      # Trained ML models (.pkl files)
│   └── main.ipynb         # Model training notebook
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

### Installation

1. **Clone the repository:**
   ```bash
   https://github.com/slimkiddjudas/FC24-Prediction.git
   cd fc24-prediction
   ```

2. **Frontend Setup:**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env and set VITE_API_URL=http://localhost:5000/predict
   ```

3. **Backend Setup:**
   ```bash
   # Create Python virtual environment (recommended)
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   
   # Install Python dependencies
   pip install fastapi uvicorn scikit-learn pandas joblib python-multipart
   ```

### Training the Models

Before running the application, you need to train the machine learning models:

1. **Prepare your FC24 dataset** and place it in the project root
2. **Open and run the Jupyter notebook:**
   ```bash
   # Install Jupyter if you haven't already
   pip install jupyter
   
   # Start Jupyter Notebook
   jupyter notebook
   
   # Open and run server/main.ipynb
   ```
3. **The notebook will:**
   - Load and preprocess the FC24 player data
   - Train separate models for each player position
   - Save the trained models to `server/saved_models/` directory
   - Create the `labels.json` file with position and attribute mappings

### Running the Application

1. **Start the Backend Server:**
   ```bash
   # Navigate to the server directory
   cd server
   
   # Start the FastAPI server
   uvicorn api.controller:app --reload --host 0.0.0.0 --port 5000
   uvicorn server.api.controller:app --reload
   ```
   
   The API will be available at: `http://localhost:5000`
   - API Documentation: `http://localhost:5000/docs`
   - Available Models: `http://localhost:5000/models`

2. **Start the Frontend Development Server:**
   ```bash
   # In a new terminal, from the project root
   npm run dev
   ```
   
   The application will be available at: `http://localhost:5173`

## Usage

1. **Open the application** in your web browser
2. **Select player position** from the dropdown menu
3. **Configure player attributes:**
   - Player Information (position, preferred foot, work rate)
   - Physical Attributes (age, height, weight)
   - Special Ratings (weak foot, skill moves, international reputation)
   - Skill Attributes (pace, shooting, passing, dribbling, etc.)
4. **Click "Predict Market Value"** to get the AI-generated market value estimation
5. **View the results** with the predicted value in EUR

## API Endpoints

- `POST /predict` - Predict player market value

### Example API Request

```json
{
  "player_positions": 4,
  "age": 25,
  "height_cm": 180,
  "weight_kg": 75,
  "preferred_foot": 1,
  "weak_foot": 3,
  "skill_moves": 4,
  "international_reputation": 2,
  "work_rate": 8,
  "pace": 85,
  "shooting": 78,
  "passing": 82,
  "dribbling": 80,
  "defending": 45,
  "physic": 75
  // ... other attributes
}
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/predict
```

## Development

### Frontend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
# Start with auto-reload for development
uvicorn api.controller:app --reload --host 0.0.0.0 --port 5000

# For production
uvicorn api.controller:app --host 0.0.0.0 --port 5000
```

## Troubleshooting

### Common Issues

1. **"Model not found" error:**
   - Ensure you've run `main.ipynb` to train and save the models
   - Check that `.pkl` files exist in `server/saved_models/`

2. **"Labels file not found" error:**
   - Make sure `labels.json` exists in `server/api/`
   - Re-run the training notebook to generate the file

3. **CORS errors:**
   - Verify the backend server is running on the correct port
   - Check the `VITE_API_URL` in your `.env` file

4. **Environment variables not loading:**
   - Ensure `.env` file is in the project root
   - Restart the development server after changing `.env`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FC24 data for training the machine learning models
- The open-source community for the amazing tools and libraries used in this project
- FastAPI and React communities for excellent documentation and support

---

**Built with ❤️ for football enthusiasts and data science lovers**
