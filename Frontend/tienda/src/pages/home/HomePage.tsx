
import ProductCard from '../../components/ProductCard';
import './home.css';
import { addProductToCart, getProducts, getProductToCart, removeProductToCart, setCheckout } from './_service';
import { useEffect, useState } from 'react';


import { SweetModal } from '../../components/ModalPopup/SweetAlert';
import LoginForm from '../../components/Login/LoginForm';
import swals from "sweetalert2";
import Header from '../../components/Header';

export default function LoginPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [carrito, setCarrito] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.ok) {
          setProducts(response.body);
        } else {
          console.log('Error fetching products:', response.body);
        }
      } catch (error) {
        console.log('Error fetching products:', error);
      } finally {
        console.log('Error fetching products:');
      }
    };
    getCartItems()
    fetchProducts();
  }, []);

  const handleAddToCart = (product: typeof products[0]) => {
    //valida si tiene sesion activa
    if (!localStorage.getItem('user')) {


      swals.fire({
        title: "Información",
        text: "Por favor, inicia sesión para agregar productos al carrito.",
        icon: "info",
        imageHeight: 80,
        imageWidth: 80,
        showCloseButton: true,
        confirmButtonText: "Iniciar sesión"
      }).then((result) => {
        if (result.isConfirmed) {
          SweetModal({
            html: <LoginForm getCartItems={getCartItems} />,
            width: 'auto'
          })
        }
      });
      return;
    } else {
      //preguntar cuantas unidades desea agregar con botones para sumar y restar
      swals.fire({
        title: 'Agregar al carrito',
        text: `¿Cuántas unidades de ${product.name} desea agregar?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        input: 'number',
        inputPlaceholder: 'Cantidad',
      }).then(async (result) => {
        if (result.isConfirmed && result.value) {
          const quantity = parseInt(result.value, 10);

          const userStr = localStorage.getItem('user');
          const token = userStr ? JSON.parse(userStr) : null;

          if (quantity > 0) {
            // Aquí puedes agregar la lógica para agregar el producto al carrito
            const res = await addProductToCart({ quantity, productId: product.idProduct }, token);

            if (res.ok) {
              getCartItems()
              swals.fire({
                title: "Información",
                text: `${quantity} unidades de ${product.name} han sido agregadas al carrito.`,
                icon: "success",
                imageHeight: 80,
                imageWidth: 80,
                showCloseButton: true,
                confirmButtonText: "Seguir comprando"
              });
            }

          } else {
            swals.fire({
              title: "Información",
              text: "Por favor, ingresa una cantidad válida.",
              icon: "error",
              imageHeight: 80,
              imageWidth: 80,
              showCloseButton: true,
              confirmButtonText: "Intentar de nuevo"
            });
          }
        }

      });
    }

  };

  const handleRemoveFromCart = async (idProductCart: number) => {
    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr) : null;

    //eliminar el producto del carrito
    await removeProductToCart(idProductCart, token);
    getCartItems()

  }

  const getCartItems = async () => {
    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr) : null;
    const response = await getProductToCart(token);
    if (response.ok) {
      setCarrito(response.body);
    }

  }

  const checkout = async () => {
    // verifica si tiene sesion activa y si esta seguro de realizar la compra
    if (!localStorage.getItem('user')) {
      swals.fire({
        title: "Información",
        text: "Por favor, inicia sesión para realizar la compra.",
        icon: "info",
        imageHeight: 80,
        imageWidth: 80,
        showCloseButton: true,
        confirmButtonText: "Iniciar sesión"
      }).then((result) => {
        if (result.isConfirmed) {
          SweetModal({
            html: <LoginForm />,
            width: 'auto'
          })
        }
      });
      return;
    } else {
      //verifica si el carrito esta vacio
      if (carrito.length <= 0) {
        swals.fire({
          title: "Información",
          text: "El carrito está vacío, por favor agrega productos antes de realizar la compra.",
          icon: "info",
          imageHeight: 80,
          imageWidth: 80,
          showCloseButton: true,
          confirmButtonText: "Seguir comprando"
        });
        return;
      } else {
        //pregunta si esta seguro de realizar la compra
        const result = await swals.fire({
          title: 'Confirmar compra',
          text: '¿Estás seguro de que deseas realizar la compra?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, comprar',
          cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
          const userStr = localStorage.getItem('user');
          const token = userStr ? JSON.parse(userStr) : null;

          const response = await setCheckout(token);
          console.log(response);
          if (response.ok) {
            swals.fire({
              title: "Información",
              text: "Compra realizada con éxito. No. de orden: " + response.body.orderId,
              icon: "success",
              imageHeight: 80,
              imageWidth: 80,
              showCloseButton: true,
              confirmButtonText: "Seguir comprando"
            }).then(() => {
              localStorage.removeItem('user');
              window.location.reload();
            });
          } else {
            swals.fire({
              title: "Información",
              text: "Ha ocurrido un error al procesar la compra.",
              icon: "error",
              imageHeight: 80,
              imageWidth: 80,
              showCloseButton: true,
              confirmButtonText: "Intentar de nuevo"
            });
          }
        }
      }
    }
  }
  return (
    <div>
      <>{
        localStorage.getItem('user') ? <Header page='/perfil' name='Mi Perfil' /> : <Header page='/register' name='Registro' />
      }
      </>
      <div className="page-container">

        <div className="store-layout">
          <div className="product-section">
            <h1>Productos</h1>
            <div className="product-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
          <div className="cart-box">
            <h2>🛒 Carrito</h2>
            {!localStorage.getItem('user') || carrito.length <= 0 ? (
              <p>El carrito está vacío.</p>
            ) : (
              <>
                <ul>
                  {carrito.map((item, index) => {
                    const producto = products.find((p) => p.idProduct === item.productId);
                    return (
                      <li key={index}>
                        {producto ? (
                          <>
                            <a onClick={() => handleRemoveFromCart(item.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
                              ❌
                            </a>
                            {producto.name} - Cantidad: {item.quantity} - Precio: ${producto.price}

                          </>
                        ) : (
                          <>Producto no encontrado (ID: {item.idProduct})</>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p>
                  <br></br>
                  <strong>Total: $</strong>
                  {carrito.reduce((total, item) => {
                    const producto = products.find((p) => p.idProduct === item.productId);
                    return producto ? total + producto.price * item.quantity : total;
                  }, 0).toFixed(2)}
                </p>
                <br></br>
                <div className='class-checkout-div'>
                  <button>
                    <a className='class-checkout' onClick={() => checkout()} style={{ textDecoration: 'none' }}>Finalizar compra</a>
                  </button>
                </div>

              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

