import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import AdminMenu from "./AdminMenu.jsx";

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.categories?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);
  return (
    <div className="mt-13 md:mt-15 lg:mt-17 mx-5 sm:mx-6 md:mx-10 lg:mx-15">
      <div>
        <div>
          <div className="h-12 text-base sm:text-lg md:text-xl lg:text-2xl">
            Create Product
          </div>

          {/* {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )} */}

          <div className="mb-3 text-center border rounded-lg w-full p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 cursor-pointer">
            <label className="cursor-pointer text-sm sm:text-base md:text-lg">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                className={!image ? "hidden" : "text-white"}
                placeholder="Choose File"
                // onChange={uploadFileHandler}
              />
            </label>
          </div>

          <div className="py-1 md:py-2 xl:py-3 ">
            <div className="flex mb-5 flex-col md:flex-row flex-wrap gap-4 md:gap-6 lg:gap-10">
              <div className="one flex flex-col flex-1">
                {/* Name */}
                <label
                  htmlFor="name"
                  className="text-white text-sm sm:text-base md:text-lg"
                >
                  Name :
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-1 2xl:p-4 2xl:text-xl w-full border text-white rounded-lg text-sm sm:text-base md:text-lg"
                />
              </div>

              <div className="two flex flex-col flex-1">
                {/* Price */}
                <label
                  htmlFor="price"
                  className="text-white text-sm sm:text-base md:text-lg"
                >
                  Price :
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="p-1 2xl:p-4 2xl:text-xl w-full border text-white rounded-lg text-sm sm:text-base md:text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-5 flex-wrap gap-4 md:gap-6 lg:gap-10">
              <div className="one flex flex-col flex-1">
                {/* Quantity */}
                <label
                  htmlFor="quantity"
                  className="text-white text-sm sm:text-base md:text-lg"
                >
                  Quantity :
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-1 2xl:p-4 2xl:text-xl w-full border text-white rounded-lg text-sm sm:text-base md:text-lg"
                />
              </div>

              <div className="two flex flex-col flex-1">
                {/* Brand */}
                <label
                  htmlFor="brand"
                  className="text-white text-sm sm:text-base md:text-lg"
                >
                  Brand :
                </label>
                <input
                  type="text"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="p-1 2xl:p-4 2xl:text-xl w-full border text-white rounded-lg text-sm sm:text-base md:text-lg"
                />
              </div>
            </div>

            <label htmlFor="description" className="mb-5">
              Description :
            </label>
            <textarea
              id="description"
              className="p-1 mb-3 border rounded-lg w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex mb-5 flex-col md:flex-row flex-wrap gap-4 md:gap-6 lg:gap-10">
              <div className="one flex flex-col flex-1">
                {/* Count In Stock */}
                <label
                  htmlFor="stock"
                  className="text-white text-sm sm:text-base md:text-lg"
                >
                  Count In Stock :
                </label>
                <input
                  type="text"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="p-1 2xl:p-4 2xl:text-xl w-full border text-white rounded-lg text-sm sm:text-base md:text-lg"
                />
              </div>

              <div className="two flex flex-col flex-1">
                {/* Category */}
                <label
                  htmlFor="category"
                  className="text-white text-sm sm:text-base md:text-lg"
                >
                  Category :
                </label>
                <div className="cursor-pointer">
                  <select
                    id="category"
                    placeholder="Choose Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className=" p-1 2xl:p-4 2xl:text-xl  w-full border text-white rounded-lg text-sm sm:text-base md:text-lg cursor-pointer"
                  >
                    {categories?.map((c) => (
                      <option
                        className="bg-[#000000f1]"
                        key={c._id}
                        value={c._id}
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button
              // onClick={handleSubmit}
              className="py-1 xl:py-3 cursor-pointer px-5 mt-2 text-base md:mt-5 rounded-lg md:text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
        <AdminMenu />
      </div>
    </div>
  );
};
export default ProductUpdate;
