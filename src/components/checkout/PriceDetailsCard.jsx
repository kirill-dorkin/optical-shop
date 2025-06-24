const PriceDetailsCard = ({
  totalItems,
  actualPriceOfCart,
  totalPriceOfCartProducts,
}) => {
  const summaryData = [
    { label: "Всего товаров", value: totalItems },
    {
      label: "Промежуточный итог",
      value: `${actualPriceOfCart} сом`,
    },
    {
      label: "Скидка",
      value: `-${actualPriceOfCart - totalPriceOfCartProducts} сом`,
    },
    {
      label: "Доставка",
      value: "Бесплатно",
    },
  ];

  return summaryData.map(({ label, value }) => (
    <div key={label} className=" flex justify-between items-center p-0 ">
      <p className=" text-gray-600">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  ));
};
export default PriceDetailsCard;
