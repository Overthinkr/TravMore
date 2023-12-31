# TravMore - Travel and Discovery Application

TravMore is a cutting-edge travel and exploration web application designed to enhance your travel experience. Leveraging the power of modern technologies, TravMore utilizes a comprehensive tech stack, including:

- **Frontend:**
  - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) with [Babel](https://babeljs.io/) for Fast Refresh.
  - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) powered by [SWC](https://swc.rs/) for efficient code transpilation.
  - **React.js:** Building the user interface with the popular React library.

- **Backend:**
  - **FastAPI:** A modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.
  - **PostgreSQL:** A powerful, open-source relational database system.

## Key Features

### TravMore API
A custom API was designed using FASTAPI to set and view reviews, ratings, forum queries and forum replies.
- [github link](https://github.com/DineshK-1/TravMoreAPI) for the API

### Interactive Maps with HERE Maps API

TravMore integrates seamlessly with the HERE Maps API, providing a visually responsive map background. Our maps offer the perfect experience for exploring businesses, locations and tourist spots in and around your location.

### Explore and Discover

1. **Location Lookup:** TravMore allows users to search for specific restaurants, shops, bars, and more directly on the maps. With intuitive controls, finding points of interest has never been easier.

2. **Ratings and Reviews:** Users can not only discover exciting places but also contribute to the community by providing ratings and reviews. Share your experiences and help fellow travelers make informed decisions.

3. **Directions and Navigation:** Get accurate and detailed directions to your chosen destination. TravMore ensures that you can navigate confidently, whether you're on foot or using other modes of transportation.

4. **Discover Page:** Check out the Discover page with a yes or no picking functionality. Swipe through handpicked destinations to plan your next adventure with ease.

5. **Investment Opportunities:** Users can invest in handpicked locations and have a chance to contribute to their growth. Receive incentives upon visiting and supporting these locations.

6. **Community Forum:** Engage with the TravMore community on the Forum. Find answers to your travel-related quest

## How to Run
1. Access the website travmore.netlify.app
2. To test all the functionalities locally :
   --npm install
   --npm run dev
   --add VITE_APIKEY=L0-2LCY4n1A2kedFrMAlPVsd9bjfFL9RmaA-JTv-Sgg to .env file
3. TravMoreAPI cannot be tested locally due to our connections string being exposed.
