const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-4 rounded-lg z-10 text-right">
            <button
              className="text-white text-2xl font-semibold hover:text-gray-300 cursor-pointer focus:outline-none mr-2"
              onClick={onClose}
            >
              x
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
