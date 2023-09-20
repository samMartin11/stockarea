import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './WarehouseDetails.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function WarehouseDetails() {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [editedWarehouse, setEditedWarehouse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    
    const fetchWarehouseDetails = async () => {
      try {
        
        const response = await axios.get(
          `http://localhost:3000/warehouse/${id}`
        ); 
        setWarehouse(response.data);
        
        setEditedWarehouse(response.data);
      } catch (error) {
        console.error("Error fetching warehouse details:", error);
       
        setWarehouse(null);
      }
    };

    fetchWarehouseDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
     
      await axios.put(`http://localhost:3000/warehouse/${id}`, editedWarehouse); 
      
      setWarehouse(editedWarehouse);
      setIsEditing(false);
      Navigate("/");
    } catch (error) {
      console.error("Error saving warehouse details:", error);
     
    }
  };

  const handleCancelClick = () => {
    
    setEditedWarehouse(warehouse);
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setEditedWarehouse({ ...editedWarehouse, [name]: value });
  };

  return (
    <div className="container">
      {warehouse ? (
        <div>
          <h1 className="page-title">Warehouse Details</h1>
          {!isEditing ? (
            <div className="warehouse-details">
              <p>
                <strong>Name:</strong> {warehouse.name}
              </p>
              <p>
                <strong>City:</strong> {warehouse.city}
              </p>
              <p>
                <strong>Cluster:</strong> {warehouse.cluster}
              </p>
              <p>
                <strong>Space Available:</strong> {warehouse.spaceAvailable}
              </p>
              <p>
                <strong>Type:</strong> {warehouse.type}
              </p>
              <p>
                <strong>Code:</strong> {warehouse.code}
              </p>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          ) : (
            <div className="edit-mode">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  className="edit-input"
                  value={editedWarehouse.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  className="edit-input"
                  value={editedWarehouse.city}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Cluster:
                <input
                  type="text"
                  name="cluster"
                  className="edit-input"
                  value={editedWarehouse.cluster}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Space Available:
                <input
                  type="number"
                  name="spaceAvailable"
                  className="edit-input"
                  value={editedWarehouse.spaceAvailable}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  name="type"
                  className="edit-input"
                  value={editedWarehouse.type}
                  onChange={handleInputChange}
                />
              </label>
              <div className="button-group">
                <button className="save-button" onClick={handleSaveClick}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Warehouse not found</p>
      )}
    </div>
  );
}

export default WarehouseDetails;
