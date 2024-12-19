import React, { useState } from "react";
import LogggedNavbar from "../components/LogggedNavbar";
import Sidebar from "../components/Sidebar";
const Items = [
  {
    id: 1,
    name: "Coffee Lover's Shirt",
    description: "A cozy shirt for coffee enthusiasts.",
    price: 500,
    image: "https://via.placeholder.com/150?text=Shirt",
  },
  {
    id: 2,
    name: "Mocha Mug",
    description: "Start your day with a mocha-themed mug.",
    price: 300,
    image: "https://via.placeholder.com/150?text=Mug",
  },
  {
    id: 3,
    name: "Barista Apron",
    description: "For the aspiring barista in you.",
    price: 700,
    image: "https://via.placeholder.com/150?text=Apron",
  },
  {
    id: 4,
    name: "Coffee Beans Tote Bag",
    description: "Carry your essentials in style.",
    price: 450,
    image: "https://via.placeholder.com/150?text=Bag",
  },
];

function Shop() {
  const [mochaPoints, setMochaPoints] = useState(2000);
  const [user, setUser] = useState(() => {
    if (location.state) {
      return location.state;
    } else if (localStorage.getItem("user_data")) {
      console.log(
        "User data from local storage: ",
        localStorage.getItem("user_data")
      );
      return JSON.parse(localStorage.getItem("user_data"));
    } else {
      return null;
    }
  });

  const handlePurchase = (price) => {
    if (mochaPoints >= price) {
      setMochaPoints(mochaPoints - price);
      alert("Purchase successful! Enjoy your item.");
    } else {
      alert("Insufficient Mocha Points.");
    }
  };

  return (
    <div className="min-h-screen flex bg-base-color text-mocha-color">
      <Sidebar user_data={user} />

      <div className=" flex-grow mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-6">Mocha Shop</h1>
        <div className="text-center mb-8">
          <p className="text-lg font-semibold">
            Available Mocha Points:{" "}
            <span className="text-mocha-color font-bold">{mochaPoints}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-lg font-semibold mb-4">
                Price: {item.price} Mocha Points
              </p>
              <button
                onClick={() => handlePurchase(item.price)}
                className="bg-mocha-color text-white py-2 px-4 rounded-lg hover:bg-darker-nav-color transition"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
