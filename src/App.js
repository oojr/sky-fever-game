import React, { useState } from 'react';
import './App.css';

import initialSeatMap from './initialSeatMap';

function App() {
  const [seatMap, setSeatMap] = useState(initialSeatMap);
  const [winnerSeatMap, setWinnerSeatMap] = useState(initialSeatMap);
  const [matchEnded, setMatchEnded] = useState(false);

  // useEffect(() => {
  //   const selectRandomNumbers = () => {
  //     return Math.floor(Math.random() * 60 + 1);
  //   };

  //   const randomNumber = selectRandomNumbers();

  //   const seatLetters = ['F', 'A', 'B', 'C', 'D', 'E'];

  //   const rowNumber = Math.ceil(randomNumber / 6);
  //   const columnNumber = randomNumber % 6;

  //   const columnLetter = seatLetters[columnNumber];
  // });

  const startGame = () => {
    const winnerMap = {};
    while (Object.keys(winnerMap).length < 15) {
      console.log('starting game');
      const randomNumber = Math.floor(Math.random() * 60 + 1);
      console.log(randomNumber);

      const seatLetters = ['F', 'A', 'B', 'C', 'D', 'E'];

      const rowNumber = Math.ceil(randomNumber / 6);
      const columnNumber = randomNumber % 6;

      const columnLetter = seatLetters[columnNumber];
      winnerMap[rowNumber + columnLetter] = true;
    }

    const nextWinnerSeatMap = {
      ...winnerSeatMap,
      ...winnerMap,
    };
    console.log('selfie', nextWinnerSeatMap);

    setMatchEnded(true);

    setWinnerSeatMap(nextWinnerSeatMap);
  };

  const restartGame = () => {
    setMatchEnded(false);
    setWinnerSeatMap(initialSeatMap);
    setSeatMap(initialSeatMap);
  };

  // useEffect(() => {
  //   const nextSeatMap = Object.assign(seatMap, { '1A': true });
  //   setSeatMap(nextSeatMap);
  //   console.log(seatMap);
  // }, [seatMap]);

  const handleSeatClick = (seatNumber) => {
    const { count } = renderSelectedNumbers();

    if (count >= 10 && !seatMap[seatNumber]) {
      return;
    }
    const nextSeatMap = {
      ...seatMap,
      [seatNumber]: !seatMap[seatNumber],
    };
    setSeatMap(nextSeatMap);
  };

  const renderSelectedNumbers = () => {
    const selectedSeats = [];

    for (const seat in seatMap) {
      if (seatMap[seat]) {
        selectedSeats.push(seat);
      }
    }

    // setSeatsSelected([]);

    return { text: selectedSeats.join(', '), count: selectedSeats.length };
  };

  const renderScore = () => {
    const selectedSeats = [];

    for (const seat in seatMap) {
      if (seatMap[seat] && winnerSeatMap[seat]) {
        selectedSeats.push(seat);
      }
    }

    return {
      scoreText: selectedSeats.join(', '),
      scoreCount: selectedSeats.length,
      scoreNumbers: Object.keys(seatMap).length,
    };
  };
  const Seat = ({ seatNumber }) => {
    if (matchEnded) {
      const resultText = winnerSeatMap[seatNumber] ? seatNumber : '🤒';
      const correctWinner = winnerSeatMap[seatNumber] && seatMap[seatNumber];

      // background: #bada55;

      let backgroundColor;

      if (winnerSeatMap[seatNumber] && seatMap[seatNumber]) {
        backgroundColor = 'blue';
      } else if (!winnerSeatMap[seatNumber] && seatMap[seatNumber]) {
        backgroundColor = '#dddddd';
      } else if (winnerSeatMap[seatNumber] && !seatMap[seatNumber]) {
        backgroundColor = '#bada55';
      }

      return (
        <li className='seat'>
          <input
            type='checkbox'
            // style={{ background: 'green' }}
            checked={winnerSeatMap[seatNumber]}
            readOnly
            id={seatNumber}
            disabled={!winnerSeatMap[seatNumber] && seatMap[seatNumber]}
          />
          <label style={{ background: backgroundColor }} htmlFor={seatNumber}>
            <span style={{ color: correctWinner ? 'gold' : 'inherit' }}>
              {resultText}
            </span>
          </label>
        </li>
      );
    }
    return (
      <li className='seat pre-game'>
        <input
          type='checkbox'
          onChange={() => handleSeatClick(seatNumber)}
          checked={seatMap[seatNumber]}
          id={seatNumber}
        />
        <label htmlFor={seatNumber}>{seatNumber}</label>
      </li>
    );
  };

  const renderGameButtons = () => {
    if (matchEnded) {
      return (
        <button onClick={() => restartGame()} className='start-button'>
          Restart Game
        </button>
      );
    }
    return (
      <button onClick={() => startGame()} className='start-button'>
        Start Game
      </button>
    );
  };

  const { text, count } = renderSelectedNumbers();
  const { scoreText, scoreCount } = renderScore();

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'>
          <div className='game-columns'>
            <div className='instructions'>
              The whole plane got infected except a lucky few select seats of
              the passengers that were safe
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className='plane'>
            <div className='cockpit'>
              <h2>Please select seats</h2>
              <div>{count >= 1 && renderGameButtons()}</div>
            </div>
            <div className='exit exit--front fuselage'>
              <div className='score-text'>
                <div>
                  {matchEnded && (
                    <span>
                      Hits: <strong>({scoreCount}) </strong>
                      {scoreText} <br></br>Misses: {count - scoreCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ol className='cabin fuselage'>
              <li className='row row--1'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='1A' />
                  <Seat seatNumber='1B' />
                  <Seat seatNumber='1C' />
                  <Seat seatNumber='1D' />
                  <Seat seatNumber='1E' />
                  <Seat seatNumber='1F' />
                </ol>
              </li>
              <li className='row row--2'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='2A' />
                  <Seat seatNumber='2B' />
                  <Seat seatNumber='2C' />
                  <Seat seatNumber='2D' />
                  <Seat seatNumber='2E' />
                  <Seat seatNumber='2F' />
                </ol>
              </li>
              <li className='row row--3'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='3A' />
                  <Seat seatNumber='3B' />
                  <Seat seatNumber='3C' />
                  <Seat seatNumber='3D' />
                  <Seat seatNumber='3E' />
                  <Seat seatNumber='3F' />
                </ol>
              </li>
              <li className='row row--4'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='4A' />
                  <Seat seatNumber='4B' />
                  <Seat seatNumber='4C' />
                  <Seat seatNumber='4D' />
                  <Seat seatNumber='4E' />
                  <Seat seatNumber='4F' />
                </ol>
              </li>
              <li className='row row--5'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='5A' />
                  <Seat seatNumber='5B' />
                  <Seat seatNumber='5C' />
                  <Seat seatNumber='5D' />
                  <Seat seatNumber='5E' />
                  <Seat seatNumber='5F' />
                </ol>
              </li>
              <li className='row row--6'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='6A' />
                  <Seat seatNumber='6B' />
                  <Seat seatNumber='6C' />
                  <Seat seatNumber='6D' />
                  <Seat seatNumber='6E' />
                  <Seat seatNumber='6F' />
                </ol>
              </li>
              <li className='row row--7'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='7A' />
                  <Seat seatNumber='7B' />
                  <Seat seatNumber='7C' />
                  <Seat seatNumber='7D' />
                  <Seat seatNumber='7E' />
                  <Seat seatNumber='7F' />
                </ol>
              </li>
              <li className='row row--8'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='8A' />
                  <Seat seatNumber='8B' />
                  <Seat seatNumber='8C' />
                  <Seat seatNumber='8D' />
                  <Seat seatNumber='8E' />
                  <Seat seatNumber='8F' />
                </ol>
              </li>
              <li className='row row--9'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='9A' />
                  <Seat seatNumber='9B' />
                  <Seat seatNumber='9C' />
                  <Seat seatNumber='9D' />
                  <Seat seatNumber='9E' />
                  <Seat seatNumber='9F' />
                </ol>
              </li>
              <li className='row row--10'>
                <ol className='seats' type='A'>
                  <Seat seatNumber='10A' />
                  <Seat seatNumber='10B' />
                  <Seat seatNumber='10C' />
                  <Seat seatNumber='10D' />
                  <Seat seatNumber='10E' />
                  <Seat seatNumber='10F' />
                </ol>
              </li>
            </ol>
            <div className='exit exit--back fuselage'></div>
          </div>
        </div>
        <div className='col-3'>
          <div className='numbers-selected'>
            <div className='seats-selected'>Seats selected: {text} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
