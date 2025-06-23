import { motion } from "framer-motion";

export const LoadingScreen = () => (
  <div className="loading-screen">
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="loading-text text-center my-10"
    >
      Cargando productos...
    </motion.div>
  </div>
);
