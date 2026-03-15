# Food Delivery App Frontend

A modern, responsive food delivery application built with React and Vite. This frontend provides a seamless user experience for browsing menus, managing carts, and placing orders.

## Features

- **Browse Menu**: Explore different food categories and view available items
- **Food Display**: Interactive food catalog with detailed item information
- **Shopping Cart**: Add, remove, and manage items in your cart
- **Order Placement**: Streamlined checkout process
- **User Authentication**: Login popup for user management
- **Responsive Design**: Optimized for desktop and mobile devices
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS Modules
- **State Management**: React Context API
- **Linting**: ESLint

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd food-del/frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Asset files (admin and frontend)
│   ├── components/        # Reusable UI components
│   │   ├── AppDownload/   # App download section
│   │   ├── ExploreMenu/   # Menu category explorer
│   │   ├── FoodDisplay/   # Food items display
│   │   ├── FoodItem/      # Individual food item component
│   │   ├── Footer/        # Site footer
│   │   ├── Header/        # Site header
│   │   ├── LoginPopup/    # Authentication modal
│   │   └── Navbar/        # Navigation bar
│   ├── context/           # React Context for state management
│   ├── pages/             # Main application pages
│   │   ├── Cart/          # Shopping cart page
│   │   ├── Home/          # Landing page
│   │   └── PlaceOrder/    # Order placement page
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── eslint.config.js       # ESLint configuration
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Usage

1. **Home Page**: Browse featured foods and explore menu categories
2. **Menu Exploration**: Click on categories to filter foods
3. **Add to Cart**: Click the "+" button on food items to add them to cart
4. **View Cart**: Navigate to cart page to review and modify items
5. **Place Order**: Proceed to checkout and complete your order
6. **Login**: Access user-specific features through the login popup

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@fooddelivery.com or create an issue in this repository.
