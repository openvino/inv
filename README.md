# INV Mock Site Repository

## Overview
This repository contains the source code for the mock site of the **Instituto Nacional de la Vitivinicultura (INV)**, created for demonstration and testing purposes. The site allows wineries to simulate the submission of information for the chemical analysis of wines. This project is not affiliated with the INV and is intended solely for example and testing purposes.

The site is deployed at: [inv.openvino.org](https://inv.openvino.org)

## Features
- Simulated form submission for wine chemical analysis.
- Lightweight front-end built with [Vite](https://vitejs.dev/).
- Designed to showcase how wineries could interact with an INV-like platform.

## Purpose
This mock site was created as part of the **OpenVino** initiative to:
- Provide a testing environment for submitting and managing wine-related data.
- Explore integrations with decentralized systems and blockchain-based solutions.
- Showcase potential user interfaces for winery submissions.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/OpenVino/inv.git
   cd inv-mock-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Build for Production
To create an optimized production build:
```bash
npm run build
```
or
```bash
yarn build
```

The build files will be available in the `dist` directory.

### Preview the Production Build
To preview the production build locally:
```bash
npm run preview
```
or
```bash
yarn preview
```

## Folder Structure
```
├── public         # Static assets
├── src
│   ├── assets     # Project-specific assets (images, etc.)
│   ├── components # Reusable components
│   ├── pages      # Application pages
│   ├── styles     # Global and component-specific styles
│   ├── App.jsx    # Main application component
│   └── main.jsx   # Entry point
├── vite.config.js # Vite configuration
└── package.json   # Project metadata and dependencies
```

## Technologies Used
- **Vite**: Fast front-end build tool.
- **React**: UI library for building interactive user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Disclaimer
This project is not associated with or endorsed by the **Instituto Nacional de la Vitivinicultura (INV)**. It is a mock site created solely for demonstration and testing purposes.



## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For inquiries, please contact the OpenVino team at [info@openvino.org](mailto:info@openvino.org).

