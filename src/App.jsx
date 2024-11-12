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
    complete
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
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6 px-4">
      {/* Add New Item Form */}
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Add New Item</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            required
            placeholder="Description"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="files"
            multiple
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            + Add Item
          </button>
        </div>
      </form>

      {/* Edit Modal */}
      {modalEdit && (
        <dialog open className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md relative shadow-lg transform transition-all duration-300 scale-95 md:scale-100">
            <button
              onClick={() => setModalEdit(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Edit Item</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
            />
            <input
              type="file"
              multiple
              className="w-full px-4 py-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleEdit}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </dialog>
      )}

      {/* Information Modal */}
    

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full max-w-7xl">
        {data.map((el, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300">
            {el?.images?.map((image, idx) => (
              <div key={idx} className="relative">
                <img
                  className="w-[200px] h-[200px] object-cover rounded-lg"
                  src={`${import.meta.env.VITE_API_IMAGES}${image?.imageName}`}
                  alt={image?.imageName}
                />
                <button
                  onClick={() => deleteImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200"
                >
                  del
                </button>
              </div>
            ))}
            <h2 className="text-xl font-semibold" style={{color:el.isCompleted?"red":"black"}}>{el.name}</h2>
            <p style={{color:el.isCompleted?"red":"black"}}>{el.description}</p>
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
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => setModalInfo(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
              >
                Info
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                onClick={() => {
                  complete(el)
                }}
 >
                Complete
              </button>
            </div>
              {modalInfo && (
          <dialog open className="dialog fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md relative shadow-lg transform transition-all duration-300 scale-95 md:scale-100">
              <button
                onClick={() => setModalInfo(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Item Information</h2>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">{el.name}</h3>
              <p className="text-gray-600 mb-4">{el.description}</p>
              {data.map((el, i) => (
                <div key={i} className="mt-4">
                  {el?.images?.map((image) => (
                    <div key={image.id} className="flex flex-col items-center mb-6">
                      <img
                        className="w-[200px] h-[200px] object-cover rounded-lg mb-2"
                        src={`${import.meta.env.VITE_API_IMAGES}${image?.imageName}`}
                        alt={image?.imageName}
                      />
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="text-red-500 hover:text-red-600 focus:outline-none transition duration-200"
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
          </div>
        ))}
      </div>
    </div>
  );
}
