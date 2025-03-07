import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilterProductsQuery } from "../redux/api/productApiSlice.js";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice.js";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice.js";
import ProductCard from "./Products/ProductCard.jsx";
import Loader from "../components/Loader.jsx";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProductsQuery = useGetFilterProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="container mx-auto px-5 mt-10 md:mt-16">
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden bg-black text-white px-4 py-2 rounded-full"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <div
          className={`bg-[#151515] p-3 rounded-lg shadow-md ${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-auto max-w-[90vw] md:max-w-xs`}
        >
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
            Filter by Categories
          </h2>
          <div className="p-5">
            {categories.slice(1).map((c) => (
              <div key={c._id} className="mb-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checkbox-${c._id}`}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label
                    htmlFor={`checkbox-${c._id}`}
                    className="ml-2 text-sm font-medium text-white"
                  >
                    {c.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-black rounded-full mb-2">
            Filter By Brands
          </h2>
          <div className="p-5 flex flex-wrap gap-2">
            {uniqueBrands.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
                />
                <label htmlFor={brand} className="ml-2 text-sm text-white">
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-black rounded-full mb-2">
            Filter By Price
          </h2>
          <div className="p-5">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:ring-pink-500"
            />
          </div>

          <div className="p-5 pt-0">
            <button
              className="w-full border border-gray-400 cursor-pointer text-sm my-4"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex-grow p-3">
          <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <div key={p._id} className="p-3">
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
