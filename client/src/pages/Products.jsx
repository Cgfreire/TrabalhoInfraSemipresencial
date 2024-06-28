import { Link } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useContext, useEffect, useState } from 'react';
import { createProduct, getAllProductsIndependent, deleteProduct, updateProduct } from '../services/productsServices';
import { AuthContext } from '../contexts/AuthContext';

export const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const userRole = user ? user.role : null;
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    img: ''
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsList = await getAllProductsIndependent();
        setProducts(productsList);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [products]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (product) => {
    setEditProductData(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditProductData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        img: formData.img,
      };
      const response = await createProduct(user.id, productData);
      setProducts([...products, response]);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    } finally {
      closeModal();
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        img: formData.img,
      };
      const response = await updateProduct(user.id, editProductData.id, productData);
      setProducts(products.map(product => (product.id === editProductData.id ? response : product)));
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    } finally {
      closeEditModal();
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(user.id, productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center gap-x-5 p-5">
        <Link
          className='bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700'
          to="/users"
          style={{ display: userRole === 'ADMIN' ? 'inline-block' : 'none' }}
        >
          Gerenciar usuários
        </Link>

        <Link
          className='bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700'
          to="/"
        >
          Entrar
        </Link>
        <Link
          className='bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700'
          to="/"
          onClick={() => logout()}
        >
          Sair
        </Link>
        <Link
          className='bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700'
          to="/signup"
          style={{ display: userRole === 'ADMIN' ? 'inline-block' : 'none' }}
        >
          Criar conta
        </Link>
        <button
          onClick={openModal}
          style={{ display: userRole === 'ADMIN' ? 'inline-block' : 'none' }}
          className="bg-yellow-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
        >
          Adicionar Produto
        </button>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center md:text-start">Produtos</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {isLoading ? <p>Carregando...</p> : null}
            {products.length === 0 ? <p className="text-black/50 font-bold text-xl text-center md:text-start">Nenhum produto encontrado</p> : null}
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
                {userRole === 'ADMIN' && (
                  <div className="mt-2 flex gap-x-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        userId={user.id}
      />

      {editProductData && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
          formData={formData}
          handleChange={handleChange}
          userId={user.id}
          productId={editProductData.id}
          isEdit
        />
      )}
    </>
  );
};

export default Products;
