import { useProductsContext } from "../../contexts";
import TrendingCard from "./TrendingCard";

const TrendingList = () => {
  const { trendingProducts } = useProductsContext();
  return (
    <section className="py-4 mt-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl break-words mb-4">
        Популярные товары
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trendingProducts.map((product) => (
          <TrendingCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingList;
