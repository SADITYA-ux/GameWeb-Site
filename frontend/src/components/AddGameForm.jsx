import React, { useState } from "react";
import { apiPost } from "../api"; // your helper

export default function AddGameForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    platform: "",
    image: "", // for image URL or path
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // send data as JSON
    const res = await apiPost("add_game.php", form);
    console.log(res);
    if (res.success) {
      alert("Game added! ID: " + res.id);
    } else {
      alert(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Platform"
        value={form.platform}
        onChange={(e) => setForm({ ...form, platform: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <button type="submit">Add Game</button>
    </form>
  );
}
