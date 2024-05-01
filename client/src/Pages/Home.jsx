import React, { useEffect, useState } from "react";
import Card from "../Components/Card.jsx";

import "./Home.css"

const Home = () => {
  const [search, setSearch] = useState("");

  const [value, setData]= useState([])
  const [category, setCategory]= useState([])

  const loadData = async() => {
    let response = await fetch('http://localhost:8000/data/taskdata', {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();
    // console.log(json)
    setData(json[1]);
    setCategory(json[0]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div className="wrapper">
      <div className="carousel" style={{ zIndex: "10" }}>
        <div className="d-flex justify-content-center">
        <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => {
            setSearch(e.target.value);
            }}
        />
        </div>
            </div>  
      <div className="container">
        {category.length > 0 ? (
          category.map((data, index) => {
            return (
              <div key={index}>
                <div className="fs-3 m-3">
                  {data.taskCategory} 
                </div>
                <hr />
                {value.length > 0 ? (
                  value.filter((item) => (item.taskCategory === data.taskCategory) && (item.title.toLowerCase().includes(search.toLocaleLowerCase()))).map((filteritems, i) => {
                    return(
                      <div className="col-12 col-md-6 col-lg-3" key={i}>
                        <Card id={filteritems._id} title={filteritems.title} assignedTo={filteritems.assignedTo} priority={filteritems.priority} date={filteritems.date} description={filteritems.description} />
                      </div>
                    )
                  })
                ):(
                  <div>hi</div>
                )}
              </div>
            )
          })
        ):(
          <div>"""""""""""""""" </div>
        )}
      </div>
    </div>
  );
};

export default Home;