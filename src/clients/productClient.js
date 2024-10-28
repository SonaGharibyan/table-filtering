import data from '../data.json'

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getFilteredProducts = async (filters) => {
  await delay(1000);
  
  const { name, category, brand, price, rating } = filters;
  const filteredData = data.filter((item) => {
    return (
      (!name ||
        item.name.toLocaleLowerCase().includes(name?.toLocaleLowerCase())) &&
      (!category?.length || category.includes(item.category)) &&
      (!brand?.length || brand.includes(item.brand)) &&
      (!price?.length || (item.price >= price[0] && item.price <= price[1])) &&
      (!rating || Math.round(item.rating) === rating)
    );
  });

  return filteredData;
};

export {getFilteredProducts}
