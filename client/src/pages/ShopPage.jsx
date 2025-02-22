import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
const products = [
  {
    id: 1,
    name: "Eco Laptop",
    price: "$1299",
    points: 1299,
    description:
      "High-performance laptop made with recycled materials and energy-efficient components.",
  },
  {
    id: 2,
    name: "Eco Smartphone",
    price: "$899",
    points: 899,
    description:
      "Feature-packed smartphone with a biodegradable case and low-energy consumption.",
  },
  {
    id: 3,
    name: "Eco Headphones",
    price: "$299",
    points: 299,
    description:
      "Noise-canceling headphones made from sustainable materials with a long-lasting battery.",
  },
  {
    id: 4,
    name: "Eco Smartwatch",
    price: "$399",
    points: 399,
    description:
      "Stylish smartwatch with solar charging and eco-friendly manufacturing process.",
  },
];

function ShopPage() {
  const [expandedId, setExpandedId] = useState(null);

  const handleBuyClick = (productId) => {
    console.log(`Product with ID ${productId} has been added to the cart.`);
    // Ovdje možete dodati funkcionalnost za dodavanje proizvoda u korpu
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {products.map((product) => {
        const originalPrice = parseInt(product.price.slice(1));
        const discountedPrice = originalPrice - 100;

        return (
          <>
            <TopBar />
            <div key={product.id}>
              {/* Normalna kartica */}
              <motion.div
                className="cursor-pointer rounded-2xl shadow-lg p-4 bg-white dark:bg-gray-800 text-center border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.05 }}
                onClick={() => setExpandedId(product.id)}
              >
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                  {product.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 line-through">
                  ${originalPrice}
                </p>
                <p className="text-gray-900 dark:text-white font-bold">
                  ${discountedPrice}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {product.points} points
                </p>
              </motion.div>

              {/* Proširena kartica */}
              <AnimatePresence>
                {expandedId === product.id && (
                  <motion.div
                    className="fixed inset-0 z-50 backdrop-blur-lg bg-opacity-50 flex justify-center items-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setExpandedId(null)}
                  >
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl w-full mx-4"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      onClick={(e) => e.stopPropagation()} // Spriječi zatvaranje prilikom klika unutar kartice
                    >
                      <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-300 line-through">
                        ${originalPrice}
                      </p>
                      <p className="text-gray-900 dark:text-white font-bold text-xl mb-4">
                        ${discountedPrice}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                        {product.points} poena
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                        {product.description}
                      </p>

                      {/* Dugme Kupi */}
                      <button
                        onClick={() => handleBuyClick(product.id)}
                        className="mt-4 py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                      >
                        Kupi
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <BottomBar />
          </>
        );
      })}
    </div>
  );
}

export default ShopPage;
