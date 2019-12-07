This submission consists of two parts:
- A React Application
- A node JS server that hosts an optimized build of the React Application 
Both are stored in one package with some helper scripts 

To start the server to view the project (requires npm):
- open a terminal in the folder APP
- npm install
- npm start

If there are any issues, try 'npm run build' this runs the build script of the react application and dumps it in the public folder of the server 

The app is hosted on process.env.PORT OR port 3030 so localhost:3030 is the most likely place unless PORT is set on the machine 