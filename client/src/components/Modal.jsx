/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productsServices';

export const Modal = ({ isOpen, onClose, formData, handleChange, userId, isEdit, productId, onUpdateProduct }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let updatedProduct;
      if (isEdit) {
        updatedProduct = await updateProduct(userId, productId, formData);
        console.log('Produto atualizado:', updatedProduct);
        onUpdateProduct(updatedProduct); // Atualiza o produto na interface
      } else {
        const newProduct = await createProduct(userId, formData);
        console.log('Novo produto criado:', newProduct);
      }
      onClose(); // Fecha o modal após a operação ser concluída
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  useEffect(() => {
    if (isEdit && formData && Object.keys(formData).length === 0) {
      // Handle initialization of formData if needed for edit modal
    }
  }, [isEdit, formData]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={handleOverlayClick}
          onKeyDown={handleKeyPress}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-4">
            <div className="absolute top-0 right-0 p-2">
              <button
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Fechar modal</span>
              </button>
            </div>
            <div className="p-4">
              <h3 id="modal-title" className="text-lg font-semibold text-gray-900 mb-4">
                {isEdit ? 'Editar Produto' : 'Criar Novo Produto'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Digite o nome do produto"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Preço
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Digite o preço do produto"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="img"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      URL da Imagem
                    </label>
                    <input
                      type="text"
                      id="img"
                      name="img"
                      value={formData.img}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Digite a URL da imagem"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isEdit ? 'Salvar Alterações' : 'Criar Produto'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
