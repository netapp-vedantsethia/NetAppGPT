import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [data, setData] = useState('');
  const [response, setResponse] = useState('');

  const sendData = async () => {
    try {
      const res = await axios.post('http://localhost:3040/data', { data });
      setResponse(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={sendData}>Send Data</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default Test;
