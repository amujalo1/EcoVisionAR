import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";

const products = [
  {
    id: 7,
    name: "Solarni Punjač",
    price: "$49",
    points: 49,
    description:
      "Prenosivi solarni punjač za pametne telefone i tablete, idealan za ekološku uštedu energije.",
  },
  {
    id: 8,
    name: "Bambusova Četkica za Zube",
    price: "$5",
    points: 5,
    description:
      "Biorazgradiva četkica za zube izrađena od bambusa, smanjuje plastični otpad.",
  },
  {
    id: 9,
    name: "Ekološka Boca za Vodu",
    price: "$25",
    points: 25,
    description:
      "Višekratna boca od nehrđajućeg čelika, smanjuje potrebu za plastičnim bocama.",
  },
  {
    id: 10,
    name: "Pamučne Vrećice za Kupovinu",
    price: "$10",
    points: 10,
    description:
      "Višekratne vrećice od organskog pamuka za smanjenje korištenja plastičnih vrećica.",
  },
  {
    id: 11,
    name: "LED Žarulje",
    price: "$15",
    points: 15,
    description:
      "Energetski učinkovite LED žarulje koje troše manje struje i traju duže.",
  },
  {
    id: 12,
    name: "Organski Sapun",
    price: "$8",
    points: 8,
    description:
      "Prirodni sapun bez štetnih kemikalija, biorazgradiv i nježan za kožu.",
  },
];
function ShopPage() {
  const [expandedId, setExpandedId] = useState(null);
  const [userPoints, setUserPoints] = useState(1000);
  const [message, setMessage] = useState(null);

  const handleBuyClick = (product) => {
    if (userPoints >= product.points) {
      setUserPoints(userPoints - product.points);
      setMessage({
        type: "success",
        text: `Uspješno ste kupili ${product.name}!`,
      });
    } else {
      setMessage({
        type: "error",
        text: "Nemate dovoljno bodova za ovu kupovinu!",
      });
    }
  };

  return (
    <Layout>
      <div className="flex-grow p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => {
            const originalPrice = parseInt(product.price.slice(1));
            const discountedPrice = originalPrice - originalPrice * 0.1;

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
                      ${originalPrice.toFixed(2)}
                    </p>
                    <p className="text-gray-900 font-bold">
                      ${discountedPrice.toFixed(2)}
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
                          ${originalPrice.toFixed(2)}
                        </p>
                        <p className="text-gray-900 font-bold text-xl mb-4">
                          ${discountedPrice.toFixed(2)}
                        </p>
                        <p className="text-green-600 text-lg mb-4">
                          {product.points} points
                        </p>
                        <p className="text-gray-700 text-lg mb-4">
                          {product.description}
                        </p>

                        <button
                          onClick={() => handleBuyClick(product)}
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

        {/* Pop-up poruka */}
        <AnimatePresence>
          {message && (
            <motion.div
              className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-lg p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={`p-6 rounded-lg shadow-lg text-white max-w-sm w-full text-center ${
                  message.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <p className="text-lg font-semibold">{message.text}</p>
                <button
                  className="mt-4 py-2 px-6 bg-white text-black rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setMessage(null)}
                >
                  OK
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default ShopPage;
