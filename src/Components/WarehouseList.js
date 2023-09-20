import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./WarehouseList.css";
import axios from "axios";

function WarehouseList() {
  const [warehouses, setWarehouses] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    cluster: "",
    spaceAvailable: "",
  });

  const [filteredWarehouses, setFilteredWarehouses] = useState([]);

  useEffect(() => {
    
    const fetchWarehousesData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/warehouse"); 
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };

    
    const fetchData = async () => {
      try {
        const data = await fetchWarehousesData();
        console.log("data===>", data);
        setWarehouses(data);
        setFilteredWarehouses(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching warehouses data:", error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filteredData = [...warehouses];
    if (filters.city) {
      filteredData = filteredData.filter((warehouse) =>
        warehouse.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.cluster) {
      filteredData = filteredData.filter((warehouse) =>
        warehouse.cluster.toLowerCase().includes(filters.cluster.toLowerCase())
      );
    }
    if (filters.spaceAvailable) {
      filteredData = filteredData.filter(
        (warehouse) =>
          warehouse.spaceAvailable >= parseInt(filters.spaceAvailable, 10)
      );
    }

    setFilteredWarehouses(filteredData);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    console.log("name ===>", event.target);
    console.log("filter", filters.city);
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterClick = () => {
    console.log("filter ==>", filters);
    applyFilters();
  };

  const uniqueCities = [
    ...new Set(warehouses.map((warehouse) => warehouse.city)),
  ];
  const uniqueClusters = [
    ...new Set(warehouses.map((warehouse) => warehouse.cluster)),
  ];

  return (
    <div>
      <h1 className="page-title">Warehouse List</h1>
      <div className="filters">
        <select name="city" value={filters.city} onChange={handleFilterChange}>
          <option value="">Select City</option>
          
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          name="cluster"
          value={filters.cluster}
          onChange={handleFilterChange}
        >
          <option value="">Select Cluster</option>
         
          {uniqueClusters.map((cluster) => (
            <option key={cluster} value={cluster}>
              {cluster}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Space Available"
          name="spaceAvailable"
          value={filters.spaceAvailable}
          onChange={handleFilterChange}
        />
        <button onClick={handleFilterClick}>Apply Filters</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Cluster</th>
            <th>Space Available</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>
                <Link to={`/warehouse/${warehouse.id}`}>{warehouse.name}</Link>
              </td>
              <td>{warehouse.city}</td>
              <td>{warehouse.cluster}</td>
              <td>{warehouse.space_available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WarehouseList;
