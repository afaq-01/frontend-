import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

/* Pages */
import About from "./components/Pages/about";
import Cart from "./components/Pages/cart";
import Collection from "./components/Pages/collection";
import Contect from "./components/Pages/contect";
import Login from "./components/Pages/login";
import Placeorder from "./components/Pages/placeorder";
import Product from "./components/Pages/product";
import Nav from "./components/Pages/nav";
import Hero from "./components/Pages/hero";
import Best_seller from "./components/Pages/best_seller";
import Heading from "./components/Pages/heading";
import Policy from "./components/Pages/policy";
import Footer from "./components/Pages/footer";
import Create_account from "./components/Pages/create-account";
import Product_page from "./components/Pages/product_page";
import Delivery from "./components/Pages/delivery-page";
import Nav2 from "./components/Pages/nav2";
import Context from "./Config/Config";

function App() {
  const [input, setinput] = useState("");
  const [cart_data, set_cartdata] = useState([]);
  const [data, setdata] = useState([]);
  const [sizes, setsizes] = useState([]);
  const [token, settoken] = useState(null);

  /* ---------- User Detail ---------- */
  const { user } = useUser();
  const User_id = user ? user.id : null

  /* ---------- Derived values ---------- */
  const cart_length = cart_data.length;


  const price = cart_data.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* ---------- API Calls ---------- */
   const fetching_data = async () => {
    try {
      const res = await axios.post("https://backend-production-929c7.up.railway.app/api/cart/get", { User_id });
      console.log(res.data)
      set_cartdata(res.data.userData || []);
    } catch (error) {
      console.log(error.message);
    }
  };

 

  const getting_data = async () => {
    try {
      const res = await axios.get("https://backend-production-929c7.up.railway.app/api/product/list");

      setdata(res.data.product || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  
  const adding_cart = async (nam, price, image, Product_id, quantity) => {
    try {
      const res = await axios.post(
        "https://backend-production-929c7.up.railway.app/api/cart/add",
        {
          nam,
          price,
          image,
          quantity,
          sizes,
          Product_id,
          User_id,
        }
      );

      if (res.data.success) {
        const newItem = res.data.item;

        set_cartdata((prev) => {
          // check if product already exists (optional safety)
          const exists = prev.find(
            (item) => item.Product_id === Product_id
          );

          if (exists) {
            return prev.map((item) =>
              item.Product_id === Product_id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          return [...prev, newItem];
        });

        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  /* ---------- Cart Actions ---------- */
  const handle_delete = async (_id) => {
    try {
      console.log(_id);
      await axios.post("https://backend-production-929c7.up.railway.app/api/cart/delete", {
        _id,
      });

      set_cartdata((prev) =>
        prev.filter((item) => item._id !== _id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  const increase = (_id) => {
    set_cartdata(prev =>
      prev.map(item =>
        item._id === _id && item.quantity < 4
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrease = (_id) => {
    set_cartdata(prev =>
      prev.map(item =>
        item._id === _id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  /* ---------- Auth ---------- */
  const removing_token = () => {
    localStorage.removeItem("token");
    settoken(null);
    toast.error("Logged out");
  };

  /* ---------- Effects ---------- */
  useEffect(() => {
    getting_data();

  }, []);


  useEffect(() => {
    if (User_id) {
      fetching_data();
    }
  }, [User_id]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) settoken(savedToken);
  }, []);

  /* ---------- Context Value ---------- */
  const value = {
    user,
    input,
    setinput,
    data,
    cart_data,
    cart_length,
    price,
    adding_cart,
    handle_delete,
    increase,
    decrease,
    settoken,
    removing_token,
    sizes,
    setsizes,
    set_cartdata
  };

  /* ---------- Layout Wrapper ---------- */
  const Layout = ({ children }) => (
    <Context.Provider value={value}>
      {token ? <Nav2 /> : <Nav />}
      {children}
      <Footer />
    </Context.Provider>
  );

  /* ---------- Routes ---------- */
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Hero />
          <Heading />
          <Product />
          <Best_seller />
          <Policy />
        </Layout>
      )
    },
    {
      path: "/home",
      element: (
        <Layout>
          <Hero />
          <Heading />
          <Product />
          <Best_seller />
          <Policy />
        </Layout>
      )
    },
    {
      path: "/collections",
      element: (
        <Layout>
          <Collection />
        </Layout>
      )
    },
    {
      path: "/about",
      element: (
        <Layout>
          <About />
        </Layout>
      )
    },
    {
      path: "/contact",
      element: (
        <Layout>
          <Contect />
        </Layout>
      )
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      )
    },
    {
      path: "/create-account",
      element: (
        <Layout>
          <Create_account />
        </Layout>
      )
    },
    {
      path: "/productpage/:id",
      element: (
        <Layout>
          <Product_page />
        </Layout>
      )
    },
    {
      path: "/cart",
      element: (
        <Layout>
          <Cart />
        </Layout>
      )
    },
    {
      path: "/delivery",
      element: (
        <Layout>
          <Delivery />
        </Layout>
      )
    },
    {
      path: "/place-order",
      element: (
        <Layout>
          <Placeorder />
        </Layout>
      )
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
