// import { useState } from "react";
// import IntroScreen from "./components/IntroScreen";

// function App() {
//   const [started, setStarted] = useState(false);
//   const [animateOut, setAnimateOut] = useState(false);

//   const handleStart = () => {
//     setAnimateOut(true);

//     setTimeout(() => {
//       setStarted(true);
//     }, 800); // must match CSS animation duration
//   };

//   return (
//     <>
//       {!started && (
//         <IntroScreen
//           name="Bhavyaa Madan"
//           onStart={handleStart}
//           animateOut={animateOut}
//         />
//       )}

//       {started && (
//         <div className="main-content reveal">
//           <h2>Welcome to my world.</h2>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;
import LoaderPack from "./components/LoaderPack";
import "./styles/loader-pack.css";


function App() {
  return (
    <LoaderPack name="Bhavyaa Madan" theme="dark" sound={true}>
      <div className="main-content reveal">
        <h2>Welcome to my world.</h2>
      </div>
    </LoaderPack>
  );
}

export default App;