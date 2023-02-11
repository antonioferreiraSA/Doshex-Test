import React, { useState, useEffect } from "react";
import axios from "axios";

const WeightHistory = () => {
  const [weights, setWeights] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/get_weight_history",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setWeights(response.data);
      } catch (error) {
        setError("Error while fetching the weight history.");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Weight History</h2>
      <ul>
        {weights.map((weight) => (
          <li key={weight._id}>
            {weight.weight} ({weight.date})
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeightHistory;
