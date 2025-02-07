import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice.js";
import CategoryForm from "../../components/CategoryForm.jsx";
import Loader from "../../components/Loader.jsx";
import Modal from "../../components/Modal.jsx";

const CategoryList = () => {
  const { data: categories, isLoading, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required!");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating category failed. Try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    if (updatingName === selectedCategory.name) {
      toast.error("Please provide different name for the category");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted`);
      }
    } catch (error) {
      console.log("Category deletion failed, please try again.");
    }
  };

  return (
    <div className="flex justify-center flex-col md:flex-row">
      {/* <AdminMenu/> */}
      <div className="md:w-3/4 p-1">
        <div className="h-12 mt-[3rem]">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
          handleDelete
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {isLoading ? (
            <div className="flex  h-screen w-full justify-center">
              <Loader />
            </div>
          ) : (
            categories.map((category) => (
              <div key={category._id}>
                <button
                  className="bg-black border text-pink-500 cursor-pointer border-pink-500 py-1 px-2 lg:py-2  lg:px-3 xl:px-4 rounded-lg m-1 lg:m-2 xl:m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => {
                    {
                      setModalVisible(true);
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))
          )}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};
export default CategoryList;
