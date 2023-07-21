import './PendingConections.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminInstance } from '../../../axios';



function PendingConnections() {
  const [connections, setConnections] = useState([]);
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');



  // Function to close the modal
  const openModal = (photoUrl) => {
    setSelectedPhotoUrl(photoUrl);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPhotoUrl('');
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await adminInstance.get('pending-connections/', {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });

      setConnections(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (connectionId) => {
    console.log(connectionId)
    try {
      await adminInstance.put(`pending-connections/${connectionId}/actions/`, {
        approved: 'true',
      }, {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });

      // Remove the approved connection from the connections array
      setConnections(connections.filter(connection => connection.id !== connectionId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (connectionId) => {
    try {
      await adminInstance.put(`pending-connections/${connectionId}/actions/`, {
        approved: 'false',
      }, {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });

      // Remove the rejected connection from the connections array
      setConnections(connections.filter(connection => connection.id !== connectionId));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Add a click event listener to close the lightbox when clicking outside the content
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('lightbox')) {
        closeModal();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className='pendings'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username"
          />
        </div>
      </div>
      <h1>Pending Connections</h1>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile Name</th>
            <th>Connection Type</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>Status</th>
            <th>Document</th>
            <th>Photo</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
  {connections.map((connection) => (
    <tr key={connection.id}>
      <td>{connection.id}</td>
      <td>{connection.profile_name}</td>
      <td>{connection.connection_type}</td>
      <td>{connection.mob_number}</td>
      <td>
        {`${connection.address.street}, ${connection.address.city}, ${connection.address.state}, ${connection.address.zip_code}`}
      </td>
      <td>{connection.status}</td>
      <td>
        <a href={connection.document_file} target="_blank" rel="noopener noreferrer">
          View Document
        </a>
      </td>
      <td>
                {connection.photo && (
                  // Open the modal when clicking on the thumbnail
                  <div className="thumbnail-container" onClick={() => openModal(connection.photo)}>
                    <img src={connection.photo} alt="Profile" className="thumbnail" />
                  </div>
                )}
          </td>
      <td style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button className="approve-button" onClick={() => handleApprove(connection.id)}>
          Approve
        </button>
        <button className="reject-button" onClick={() => handleReject(connection.id)}>
          Reject
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
      {/* Modal to display the full-size photo */}
      {selectedPhotoUrl && (
        <div className="lightbox">
          <div className="lightbox-content">
            <img src={selectedPhotoUrl} alt="Profile" className="full-size-photo" />
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PendingConnections;
