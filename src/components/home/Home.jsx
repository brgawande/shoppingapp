import React, { useEffect, useState } from "react";
import CartPage from "../cart/CartPage";
import { IoCartOutline } from "react-icons/io5";
import ProductList from "../productlist/ProductList";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";

const sortOptions = [
  //   { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", value: "rating", current: false, order: "asc" },
  //   { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", value: "price", current: false, order: "asc" },
  { name: "Price: High to Low", value: "price", current: false, order: "desc" },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const [open, setOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortTitle, setSortTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  //   console.log(cartItems.length);

  const [productCategory, setProductCategory] = useState("All Products");
  const [productCategoryArray, setProductCategoryArray] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchProduct, setSearchProducts] = useState("");

  const [page, setPage] = useState(1);

  const [url, setUrl] = useState("https://dummyjson.com/products?limit=100");

  const searchProductHandler = (e) => {
    setSearchProducts(e.target.value);
    setUrl(`https://dummyjson.com/products/search?q=${e.target.value}`);
  };

  const selectproductcategoryhandler = (id, url) => {
    console.log(id, url);
    setUrl(url);
    setPage(1);
    setProductCategory(id);
  };

  const sortproductHandler = (value, order) => {
    console.log(value);
    setSortTitle(value);
    setSortOrder(order);
    setPage(1);
    setUrl(`https://dummyjson.com/products?sortBy=${value}&order=${order}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}`);
        if (!response.ok) {
          throw new Error(`No Products Found + ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        setProducts(data?.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [productCategory, url, searchProduct, sortOrder, sortTitle]);

  useEffect(() => {
    const fetchproductsCategory = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Product Categories not found");
        }
        const data = await response.json();
        setProductCategoryArray(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchproductsCategory();
  }, []);

  const openxartHandler = () => {
    setOpen(!open);
  };
  return (
    <div className="relative">
      <div className="dflex absolute right-[60px] -top-[45px] md:right-[210px]">
        <Badge badgeContent={cartItems && cartItems.length} color="primary">
          <IoCartOutline
            onClick={openxartHandler}
            className="text-white text-3xl "
          />
        </Badge>
      </div>

      <div>
        {/* categories section starts */}
        <div className="categoriessection ">
          <div className="bg-white ">
            <div className="">
              {/* Mobile filter dialog */}
              <Dialog
                open={mobileFiltersOpen}
                onClose={setMobileFiltersOpen}
                className="relative z-40 lg:hidden"
              >
                <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                  <DialogPanel
                    transition
                    className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                  >
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        onClick={() => setMobileFiltersOpen(false)}
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-1 border-t border-gray-200">
                      {filters.map((section) => (
                        <Disclosure
                          key={section.id}
                          as="div"
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                <PlusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 group-data-[open]:hidden"
                                />
                                <MinusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                />
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    defaultValue={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </Disclosure>
                      ))}
                    </form>
                  </DialogPanel>
                </div>
              </Dialog>

              <main className="mx-auto   max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className=" flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
                  <h1 className="text-4xl font-bold capitalize tracking-tight text-gray-900">
                    {productCategory}
                  </h1>
                  <TextField
                    id="outlined-basic"
                    label="Search Product"
                    variant="outlined"
                    value={searchProduct}
                    onChange={searchProductHandler}
                  />

                  <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          Sort
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <MenuItem key={option.name}>
                              <a
                                onClick={() =>
                                  sortproductHandler(
                                    option?.value,
                                    option?.order
                                  )
                                }
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  "block px-4 py-2 text-sm data-[focus]:bg-gray-100 cursor-pointer"
                                )}
                              >
                                {option.name}
                              </a>
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Menu>

                    <button
                      type="button"
                      className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                    >
                      <span className="sr-only">View grid</span>
                      <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(true)}
                      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    >
                      <span className="sr-only">Filters</span>
                      <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6"
                >
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <form className="hidden lg:block">
                      <h3 className="sr-only">Categories</h3>
                      <ul
                        role="list"
                        className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                      >
                        {productCategoryArray && productCategoryArray.length > 0
                          ? productCategoryArray.map((i) => (
                              <Button
                                // onClick={() =>
                                //   setProductCategory(i?.slug, i?.url)
                                // }
                                variant="contained"
                                onClick={() =>
                                  selectproductcategoryhandler(i?.slug, i?.url)
                                }
                                sx={{
                                  display: "block",

                                  color: "white",
                                }}
                              >
                                {i?.name}
                              </Button>
                            ))
                          : null}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          key={section.id}
                          as="div"
                          className="border-b border-gray-200 py-6"
                        >
                          <h3 className="-my-3 flow-root">
                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                <PlusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 group-data-[open]:hidden"
                                />
                                <MinusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                />
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    defaultValue={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </Disclosure>
                      ))}
                    </form>

                    {/* Product grid */}
                    <div className="lg:col-span-3 -mt-20">
                      <div>
                        <ProductList
                          products={products}
                          loading={loading}
                          page={page}
                        />
                      </div>
                      {/* <Pagination /> */}
                      <div className=" flex justify-center gap-5">
                        <button
                          onClick={() => setPage(1)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 1 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          1
                        </button>
                        <button
                          onClick={() => setPage(2)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 2 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          2
                        </button>
                        <button
                          onClick={() => setPage(3)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 3 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          3
                        </button>
                        <button
                          onClick={() => setPage(4)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 4 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          4
                        </button>
                        <button
                          onClick={() => setPage(5)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 5 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          5
                        </button>
                        <button
                          onClick={() => setPage(6)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 6 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          6
                        </button>
                        <button
                          onClick={() => setPage(7)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 7 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          7
                        </button>
                        <button
                          onClick={() => setPage(8)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 8 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          8
                        </button>
                        <button
                          onClick={() => setPage(9)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 9 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          9
                        </button>
                        <button
                          onClick={() => setPage(10)}
                          className={`px-4 py-1 text-white font-semibold ${
                            page === 10 ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          10
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
        {/* categories section ends */}
      </div>
      <CartPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Home;
