import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";

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
  const [updateProduct, { isLoading: updateLoader }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleteLoader }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const result = setImage(file);
    console.log(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !quantity || !brand) {
      return toast.error("Please fill all required fields.");
    }
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      // Debug: Log the productData
      if (image && image instanceof File) {
        productData.append("image", image);
      }

      console.log("Sending Product Data:", Object.fromEntries(productData));
      const response = await updateProduct({
        productId: params._id,
        formData: productData,
      }).unwrap();
      console.log();
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(`Update failed: ${error.message || "Something went wrong"}`);
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const productId = params._id;
      const publicId = image?.publicId;

      const data = await deleteProduct({ productId, publicId }).unwrap();
      console.log("Delete response:", data);

      toast.success(`${data.product.name} is deleted successfully`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.log(error);
      toast.error("Delete failed. Try again!");
    }
  };

  return (
    <div className="mt-13 md:mt-15 lg:mt-17 mx-5 sm:mx-6 md:mx-10 lg:mx-15">
      <div>
        <div>
          <div className="h-12 text-base sm:text-lg md:text-xl lg:text-2xl">
            Update Product
          </div>

          {image && (
            <div className="text-center">
              <img
                src={image.url ? image.url : URL.createObjectURL(image)}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3 text-center border rounded-lg w-full p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 cursor-pointer">
            <label className="cursor-pointer text-sm sm:text-base md:text-lg">
              {image && image.url ? image.publicId : image.name}
              <input
                type="file"
                accept="image/*"
                className={!image.url ? "hidden" : "text-white"}
                placeholder="Choose File"
                onChange={handleFileChange}
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
            <div className="flex flex-wrap gap-3 sm:gap-5">
              <button
                onClick={handleSubmit}
                className="py-2 px-2 sm:px-8 cursor-pointer mt-2 text-sm sm:text-base md:text-lg font-bold bg-green-600 hover:bg-green-800 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="px-2 py-2 sm:px-8 cursor-pointer mt-2 text-sm sm:text-base md:text-lg font-bold bg-pink-700 hover:bg-pink-900 rounded-lg"
              >
                Delete
              </button>

              {updateLoader && <Loader />}
              {deleteLoader && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;
