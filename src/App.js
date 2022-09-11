import { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web"
import Menu from "./Menu";

const menuItems = [
  { name: "Angus Burger", price: 8.99, category: 'burger' },
  { name: "Tuna Steak Burger", price: 15.00, category: 'burger' },
  { name: "Bacon Burger", price: 11.50, category: 'burger' },
  { name: "Southwest Chicken Burger", price: 9.99, category: 'burger' },
  { name: "Mozzarella Burger", price: 12.50, category: 'burger' },
  { name: "Cesar Salad", price: 6.50, category: 'salad' },
  { name: "BBQ Chicken Salad", price: 13.99, category: 'salad' },
  { name: "Garden Salad", price: 9.99, category: 'salad' },
  { name: "Veggie Lasagna", price: 17.99, category: 'pasta' },
  { name: "Spaghetti & Meatballs", price: 17.99, category: 'pasta' },
  { name: "Fettuccine Alfredo", price: 17.99, category: 'pasta' },
];

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    alanBtn({
      key:
        "e3a32cd64395a643bd3a03cee62943562e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "getMenu") {
          setProducts(commandData.data)
        } else if (commandData.command === "addToCart") {
          console.log(commandData)
          addToCart(commandData.data)
        }
      },
    })
  }, [])

  const addToCart = (product) => {
    setCart((oldCart) => {
      return [...oldCart, product]
    })
  }

  return (

<main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        <Menu items={products} />
      </section>
      {cart.map((cartItem) => (
        <div key={cartItem.name}>
          {cartItem.name} - {cartItem.price} - {cartItem.category}
        </div>
      ))}
    </main>

   
  )
}

export default App;
