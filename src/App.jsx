import { useEffect } from "react";
import { useList } from "./store/uselist";

export default function App() {
  let {
    data,
    getUsers,
    addTodo,
    deletUser,
    idx,
    setIdx,
    deleteImage,
    modalEdit,
    setModalEdit,
    modalInfo,
    setModalInfo,
    name,
    desc,
    setName,
    setDesc,
    putUser,
  } = useList();

  useEffect(() => {
    getUsers();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Name", e.target["name"].value);
      formData.append("Description", e.target["description"].value);
      const files = e.target["files"].files;
      for (let i = 0; i < files.length; i++) {
        formData.append("Images", files[i]);
      }
      await addTodo(formData);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    let obj = {
      name: name,
      description: desc,
      id: idx,
    };
    putUser(obj);
    setModalEdit(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6">
      {/* Add New Item Form */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Item</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            required
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="files"
            multiple
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            + Add
          </button>
        </div>
      </form>

      {/* Edit Modal */}
      {modalEdit && (
        <dialog open className="modalEdit fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <button
              onClick={() => setModalEdit(false)}
              className="absolute top-4 right-4 text-gray-600"
            >
              x
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Item</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              multiple
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleEdit}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </dialog>
      )}

      {/* Information Modal */}
      {modalInfo && (
        <dialog open className="modalInfo fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <button
              onClick={() => setModalInfo(false)}
              className="absolute top-4 right-4 text-gray-600"
            >
              x
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Item Information</h2>
            <h3 className="font-bold">{name}</h3>
            <p>{desc}</p>
            {data.map((el, i) => (
              <div key={i} className="mt-4">
                {el?.images?.map((image) => (
                  <div key={image.id} className="flex flex-col items-center">
                    <img
                      className="w-[200px] h-[200px] object-cover rounded-lg mb-2"
                      src={`${import.meta.env.VITE_API_IMAGES}${image?.imageName}`}
                      alt={image?.imageName}
                    />
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="text-red-500 hover:text-red-600 transition duration-200"
                    >
                      Delete Image
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </dialog>
      )}

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full max-w-7xl">
        {data.map((el, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
            {el?.images?.map((el, idx) => (
              <div key={idx} className="relative">
                <img
                  className="w-[200px] h-[200px] object-cover rounded-lg"
                  src={`${import.meta.env.VITE_API_IMAGES}${el?.imageName}`}
                  alt={el?.imageName}
                />
                <button
                  onClick={() => deleteImage(el.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200"
                >
                  del
                </button>
              </div>
            ))}
            <h2 className="text-xl font-semibold">{el.name}</h2>
            <p>{el.description}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => deletUser(el.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setModalEdit(true);
                  setIdx(el.id);
                  setName(el.name);
                  setDesc(el.description);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => setModalInfo(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
