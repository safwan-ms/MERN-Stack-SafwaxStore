import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilterProductsQuery } from "../redux/api/productApiSlice.js";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice.js";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice.js";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();

  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState("");

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
        //Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            //Check if the product price included the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
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

  // Add "All Brands" option to uniqueBrands
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
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <div className="container mx-auto mt-10 md:mt-16">
      <div className="flex flex-col md:flex-row">
        {/* Toggle button for small screens */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden bg-black text-white px-4 py-2 rounded-full mx-3 my-2"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filter section */}
        <div
          className={`bg-[#151515] p-3 mt-2 mb-2 ${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-auto max-w-sm`}
        >
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
            Filter by Categories
          </h2>
          <div className="p-5 w-full md:w-[15rem]">
            {categories.map((c) => (
              <div key={c._id} className="mb-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checkbox-${c.id}`}
                    onChange={(e) => handleCheck(e.target.checked, c.id)}
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-${c.id}`}
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {c.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
