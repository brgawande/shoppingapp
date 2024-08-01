import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartslice/cartSlice";

export default function ProductList({ products, loading }) {
  const dispatch = useDispatch();
  //   const [products, setProducts] = useState([]);
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         setLoading(true);
  //         const response = await fetch("https://dummyjson.com/products");
  //         if (!response.ok) {
  //           throw new Error(`No Products Found + ${response.status}`);
  //         }
  //         const data = await response.json();
  //         // console.log(data);
  //         setProducts(data?.products);
  //         setLoading(false);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchProducts();
  //   }, []);
  console.log(products);

  const addToCartHandler = (id, price, title, image, quantity) => {
    // console.log(id, price, title, image);;
    dispatch(addToCart(id, price, title, image, quantity));
  };
  return (
    <div className="bg-white">
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <a key={product.id} className="group">
                <div className="aspect-h-1 h-[250px] aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt={product?.title}
                    src={product?.images[0]}
                    className="h-full w-full object-contain object-center group-hover:opacity-75"
                  />
                </div>
                <div>
                  <div>
                    <h3 className="mt-4 text-md text-black font-semibold text-center pb-2 ">
                      {product?.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between px-4">
                    {" "}
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product?.price}
                    </p>
                    <Button
                      onClick={() =>
                        addToCartHandler({
                          id: product?.id,
                          price: product?.price,
                          title: product?.title,
                          image: product?.images[0],
                          quantity: 1,
                        })
                      }
                      variant="contained"
                    >
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
