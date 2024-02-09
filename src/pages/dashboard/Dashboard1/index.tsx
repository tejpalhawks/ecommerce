import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

// components
import HyperDatepicker from "../../../components/Datepicker";
import cardImg from "../../../assets/images/mylogo.png";
import cartImg from "../../../assets/images/cartAdded.gif"

import Statistics from "./Statistics";
import RevenueChart from "./RevenueChart";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import UsersBalances from "./UsersBalances";
import RevenueHistory from "./RevenueHistory";

import { balances, revenueHistory } from "./data";
import { Link } from "react-router-dom";
import { AddToCart, GetAllProducts } from "../../../helpers/api/APIs";
import { PiShoppingCartFill } from "react-icons/pi";


interface setAddToCart {
  [productId: string]: boolean;
}

const Dashboard1 = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [allProducts, setAllProducts] = useState<any>();
  console.log(allProducts);
  const onDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const[isAddedToCart, setAddToCart] = useState<setAddToCart>({});
  const cartAdd = async(productId : any)=>{
      try {
         const response = await AddToCart(productId, 1)
         if(response.code === 200){
          setAddToCart((prevState: any) => ({
            ...prevState,
            [productId]: true
        }));
        setTimeout(() => {
          setAddToCart((prevState: any) => ({
              ...prevState,
              [productId]: false
          }));
      }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllProducts();
        setAllProducts(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <div className="page-title-box">
            <div className="page-title-right">
             
            </div>
            <h4 className="page-title">Dashboard</h4>
          </div>
        </Col>
      </Row>

      <Row className="d-flex row justify-content-between">
        {allProducts && allProducts.map((product :any) => (
            <Card className="col-lg-3 col-md-4 col-sm-6 col-12 ">
            <Card.Body><Card.Img src={product?.thumbnail} className="mt-1" style={{height: "220px"}}/></Card.Body>
            <Card.Body style={{marginTop:"-1.5rem"}}>
              <Card.Title as="h5"> {product?.title} </Card.Title>
              <h5> ₹{product?.price} <del> {product?.price + Math.round(product?.price * product?.discountPercentage /100)} </del> </h5> 
              <h6>{product?.stock === 0 ? <span className="text-danger">Out Of Stock</span> : <span className="text-success">Available</span>}</h6>
              <span  className="btn btn-primary waves-effect waves-light" onClick={()=> cartAdd(product?._id)}>
                {isAddedToCart[product._id] ? <img src={cartImg} alt="addedToCart" style={{width:"20px"}}/> : <PiShoppingCartFill/>}
              </span>
              <Link to={`/product-details/${product?._id}`} className="btn btn-success waves-effect waves-light m-2">
                Buy Now
              </Link>
            </Card.Body>
            </Card>
          ))}
      </Row>
    </>
  );
};

export default Dashboard1;
