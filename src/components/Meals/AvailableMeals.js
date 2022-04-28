import React, { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealsItem from "./MealsItem/MealsItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Chicken Biryani",
//     description: "Most favourite dish of vivek",
//     price: 299.00,
//   },
//   {
//     id: "m2",
//     name: "Chicken pakodi",
//     description: "Best street food ever",
//     price: 120.12,
//   },
//   {
//     id: "m3",
//     name: "Tandoori chicken",
//     description: "Never before ever after",
//     price: 160.0,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 100,
//   },
// ];

const AvailableMeals = (props) => {
  const [Data, setData] = useState([]);

  const transformData = (dataObj) => {
    const loadedData = [];
    for (const dataKey in dataObj) {
      loadedData.push({
        id: dataKey,
        name: dataObj[dataKey].name,
        description: dataObj[dataKey].description,
        price: dataObj[dataKey].price,
      });
    }
    setData(loadedData);
  };

  const { sendRequest: fetchData,isLoading , isError } = useHTTP(
    {
      url: "https://foodorderapp-c1ef4-default-rtdb.firebaseio.com/meals.json",
    },
    transformData
  );

  useEffect(()=>{
    fetchData();
  },[])

  const mealsList = Data.map((meal) => (
    <MealsItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading&&<p>Loading....</p>}
        {!isLoading&&isError&&<p>Got an error ! please check ..</p>}
      <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
