import { useEffect, useState } from "react";
import MyShopSideBar from "../../../components/MyShopSideBar/MyShopSideBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const CreatShop = () => {
  const { t } = useTranslation();
  // shop states / shop states / shop states / shop states / shop states / shop states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("clothing");
  const [error] = useState("");
  // image upload states / image upload states / image upload states / image upload states
  const [selectedFile, setSelectedFile] = useState(null);
  // loading state / loading state / loading state  / loading state  / loading state
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");
  // navigate to home if not connecter / navigate to home if not connecter
  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: t("CreatShop.createAccountTitle"),
        text: t("CreatShop.createAccountText"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("CreatShop.login"),
        cancelButtonText: t("CreatShop.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else {
          navigate("/home");
        }
      });
    }
  }, [token, navigate,t]);
  // creat shop APIcall / creat shop APIcall / creat shop APIcall / creat shop APIcall
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", selectedFile);

    // get userId from localStorage / get userId from localStorage / get userId from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData ? userData._id : null;

    // get userId from user and includ it in the request payload / get userId from user and includ it in the request payload
    formData.append("userId", userId);

    // get JWT token from localStorage / get JWT token from localStorage / get JWT token from localStorage

    axios
      .post(`${API}/shop/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Shop Created Successfully",res);
    
        setIsLoading(false);
        // sweet alert success message / sweet alert success message / sweet alert success message
        Swal.fire({
          title: t("CreatShop.congratulationsTitle"),
          text: t("CreatShop.congratulationsText"),
          icon: "success",
        });
        navigate("/myShop");
      })
      .catch((err) => {
        console.error("Error creating shop:", err);
        setIsLoading(false);
        // sweet alert fail message / sweet alert fail message / sweet alert fail message
        Swal.fire({
          icon: "error",
          title: t("CreatShop.sorryTitle"),
          text: t("CreatShop.sorryText"),
        });
      });
  };

  return (
    <>
      <MyShopSideBar />
      {isLoading && <Loader></Loader>}
      <form onSubmit={handleSubmit} className="add-new-product">
        {/* shop name / shop name/ shop name/ shop name/ shop name/ shop name/ shop name/ shop name */}
        <label>{t("CreatShop.shopName")}</label>
        <input
          type="text"
          name="Name"
          placeholder={t("CreatShop.shopNamePlaceholder")}
          required
          value={name}
          className="add-product-input"
          onChange={(e) => setName(e.target.value)}
        />
        {/* / shop Description / shop Description / shop Description / shop Description / shop Description*/}
        <label>{t("CreatShop.shopDescription")}</label>
        <input
          type="text"
          name="Description"
          placeholder={t("CreatShop.shopDescriptionPlaceholder")}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="add-product-input"
        />
        {/* shop Category / shop Category / shop Category / shop Category / shop Category / shop Category */}
        <label>{t("CreatShop.shopCategory")}</label>
        <select
          id="category"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="cloth">clothing</option>
          <option value="accessory">accessory</option>
          <option value="shoes">shoes</option>
          <option value="home decoration">home decoration</option>
        </select>
        {/* image upload / image upload / image upload / image upload / image upload / image upload */}
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleFileChange}
        />
        {/* creat Shop and back buttons / creat Shop and back buttons / creat Shop and back buttons */}
        <div className="my-product-btn">
          <Link to="/myShop">
            <button type="submit" className="cancel-add-product-btn">
            {t("CreatShop.backButton")}
            </button>
          </Link>
          <button type="submit" className="add-product-btn">
          {t("CreatShop.createShopButton")}
          </button>
        </div>
      </form>
      <div className="error">{error}</div>
    </>
  );
};

export default CreatShop;
