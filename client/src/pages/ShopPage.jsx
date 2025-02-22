import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";

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
  };

  return (
    <Layout>
      <div className="flex-grow p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => {
            const originalPrice = parseInt(product.price.slice(1));
            const discountedPrice = originalPrice - 100;

            return (
              <div key={product.id} className="relative">
                <motion.div
                  className="cursor-pointer rounded-2xl shadow-lg p-6 bg-white text-center border border-gray-200 h-full flex flex-col justify-between"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setExpandedId(product.id)}
                >
                  <h3 className="text-lg font-semibold text-green-700">
                    {product.name}
                  </h3>
                  <div>
                    <p className="text-gray-500 line-through">
                      ${originalPrice}
                    </p>
                    <p className="text-gray-900 font-bold">
                      ${discountedPrice}
                    </p>
                    <p className="text-green-600 font-medium">
                      {product.points} points
                    </p>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {expandedId === product.id && (
                    <motion.div
                      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-lg p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setExpandedId(null)}
                    >
                      <motion.div
                        className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-2xl font-semibold text-green-700 mb-4">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 line-through">
                          ${originalPrice}
                        </p>
                        <p className="text-gray-900 font-bold text-xl mb-4">
                          ${discountedPrice}
                        </p>
                        <p className="text-green-600 text-lg mb-4">
                          {product.points} points
                        </p>
                        <p className="text-gray-700 text-lg mb-4">
                          {product.description}
                        </p>

                        <button
                          onClick={() => handleBuyClick(product.id)}
                          className="mt-4 py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        >
                          Buy Now
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default ShopPage;
