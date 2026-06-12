import { useContext, useEffect, useState } from "react";
import Context from "../../Config/Config";
import { Link } from "react-router-dom";
import axios from "axios";

const Collection = () => {
  const { input } = useContext(Context);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sort, setSort] = useState("relavent");
  const [showFilter, setShowFilter] = useState(false); // mobile toggle

  const getting_data = async () => {
    try {
      const res = await axios.get("https://backend-production-929c7.up.railway.app/api/product/list");
      setData(res.data.product);
      setFilteredData(res.data.product);
    } catch (error) {
      alert(error.message);
    }
  };

  const toggle_category = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggle_subcategory = (e) => {
    const value = e.target.value;
    setSubcategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const apply_filter_and_sort = () => {
    let products_copy = [...data];

    if (category.length > 0) {
      products_copy = products_copy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subcategory.length > 0) {
      products_copy = products_copy.filter((item) =>
        subcategory.includes(item.subcategory)
      );
    }

    if (input) {
      products_copy = products_copy.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
    }

    if (sort === "low to high") {
      products_copy.sort((a, b) => a.price - b.price);
    } else if (sort === "high to low") {
      products_copy.sort((a, b) => b.price - a.price);
    }

    setFilteredData(products_copy);
  };

  useEffect(() => {
    apply_filter_and_sort();
  }, [category, subcategory, input, sort]);

  useEffect(() => {
    getting_data();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 pt-20">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          ALL COLLECTIONS
        </h1>

        <div className="flex gap-3 items-center">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden border px-3 py-1 rounded"
          >
            Filters
          </button>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="relavent">Relevance</option>
            <option value="low to high">Low → High</option>
            <option value="high to low">High → Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">

        {/* Sidebar */}
        <div
          className={`${showFilter ? "block" : "hidden"
            } sm:block w-full sm:w-1/3 lg:w-1/5`}
        >
          <div className="border p-4 rounded mb-4">
            <h2 className="font-bold mb-2">CATEGORIES</h2>
            <label className="block">
              <input type="checkbox" value="Men" onChange={toggle_category} /> Men
            </label>
            <label className="block">
              <input type="checkbox" value="Women" onChange={toggle_category} /> Women
            </label>
            <label className="block">
              <input type="checkbox" value="kids" onChange={toggle_category} /> Kids
            </label>
          </div>

          <div className="border p-4 rounded">
            <h2 className="font-bold mb-2">TYPES</h2>
            <label className="block">
              <input type="checkbox" value="Top-wear" onChange={toggle_subcategory} /> Topwear
            </label>
            <label className="block">
              <input type="checkbox" value="bottom-wear" onChange={toggle_subcategory} /> Bottomwear
            </label>
            <label className="block">
              <input type="checkbox" value="winter-wear" onChange={toggle_subcategory} /> Winterwear
            </label>
          </div>
        </div>

        {/* Products */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
                const { name, price, image, _id } = item;
                return (
                  <div
                    key={_id}
                    className="border rounded-lg p-2 hover:shadow-md transition"
                  >
                    <Link to={`/productpage/${_id}`}>
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-40 sm:h-48 md:h-52 object-cover rounded"
                      />
                    </Link>
                    <p className="mt-2 text-sm font-medium">{name}</p>
                    <p className="text-sm text-gray-600">$ {price}</p>
                  </div>
                );
              })
            ) : (
              <p className="col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Collection;