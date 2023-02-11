import React, { useState } from "react";
import axios from "axios";

const SaveWeight = () => {
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/save_weight",
        {
          weight,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setWeight("");
    } catch (error) {
      setError("Error while saving the weight.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SaveWeight;
