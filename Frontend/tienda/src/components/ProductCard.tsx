type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

interface Props {
    product: Product;
    onAddToCart: (product: Product) => void;

}

export default function ProductCard({ product, onAddToCart}: Props) {
    return (
        <div className="product-card">
            <div className="image-container">
                <img src={product.imageUrl} alt={product.imageUrl} />
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="price">Q{product.price.toFixed(2)}</span>
            <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
        </div>
    );
}
