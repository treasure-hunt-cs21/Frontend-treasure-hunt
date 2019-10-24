import React, { useState, useEffect } from 'react';

function Timer(props){
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     timer: 90
  //   };
  // }

  const [secs,setSecs] = useState(0);

  let seconds = 1200, // Number Of Seconds

  countDown = setInterval(function() {
    secondPass();
  }, 1000);

  const secondPass = () => {

    

    let remSeconds = seconds % 60;   // To Determine The Seconds

  }

  const resetTime = () => {
    this.setState({ timer: 0 });
  };

  // render() {
  //   const { timer } = this.state;
    return (
      <div className="App">
        <h2>{secs}</h2>
        <button onClick={() => resetTime()}>Reset</button>
      </div>
    );
  // }
}

// function Timer(props){
//   // const [mins,setMins] = useState(0);
//   const [secs,setSecs] = useState(0);
  

//   const myInterval = setInterval(() => {
//     const seconds = secs
//     // const minutes = mins

//     if(seconds > 0) {
//       setSecs(seconds-1)
//     }

//     if(seconds === 0){
//       // if (minutes === 0 ){
//       //   clearInterval(myInterval)
//       // }
      
//         // setMins(minutes-1)
//         setSecs(seconds-1)
//     }
    
//   },1000)

//   return (
//     <div>
//         { secs === 0
//             ? <h1>Busted!</h1>
//             : <h1>Time Remaining: {secs < 10 ? `0${secs}` : secs}</h1>
//         }
//     </div>
// )

// }

// export default Timer

// export default class Timer extends Component {
//   state = {
//       minutes: 3,
//       seconds: 0,
//   }

//   componentDidMount() {
//       this.myInterval = setInterval(() => {
//           const { seconds, minutes } = this.state

//           if (seconds > 0) {
//               this.setState(({ seconds }) => ({
//                   seconds: seconds - 1
//               }))
//           }
//           if (seconds === 0) {
//               if (minutes === 0) {
//                   clearInterval(this.myInterval)
//               } else {
//                   this.setState(({ minutes }) => ({
//                       minutes: minutes - 1,
//                       seconds: 59
//                   }))
//               }
//           } 
//       }, 1000)
//   }

//   componentWillUnmount() {
//       clearInterval(this.myInterval)
//   }

//   render() {
//       const { minutes, seconds } = this.state
//       return (
//           <div>
//               { minutes === 0 && seconds === 0
//                   ? <h1>Busted!</h1>
//                   : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
//               }
//           </div>
//       )
//   }
// }