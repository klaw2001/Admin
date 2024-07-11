import React, { useEffect, useState } from "react";
import { Button, Container, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import ListingTable from "./ListingTable";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useApi } from "../../../context/MyContext";

const ListingList = () => {
  const navigate = useNavigate();
  const { getAllBusinessListings, listings, deleteListingBusiness } = useApi();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getAllBusinessListings();
  }, []);

  const handleView = (id) => {
    // Add your view logic here
  };

  const handleEdit = (id) => {
    navigate(`/listings/edit-listing/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteListingBusiness(id);
    getAllBusinessListings();
  };

  // Function to open the modal and set the selected thumbnail
  const openModal = (thumbnailUrl) => {
    setSelectedThumbnail(thumbnailUrl);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedThumbnail(null);
  };
  const openImageModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Business Listings" breadcrumbItem="All Business Listings" />
          <Link
            color="success"
            role="button"
            className="add-btn btn btn-primary mb-3"
            to="/listings/add-listing"
            id="create-btn"
          >
            <i className="ri-add-line align-bottom me-1"></i> Add Business Listing
          </Link>
          <ListingTable
            data={listings}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            openModal={openModal}
          />
          {/* Modal component */}
          <Modal isOpen={modalOpen} toggle={closeModal}>
            <ModalHeader toggle={closeModal}>Thumbnail Preview</ModalHeader>
            <ModalBody>
              {selectedThumbnail && (
                <img
                  src={selectedThumbnail}
                  alt="Enlarged Thumbnail"
                  style={{ width: "100%" }}
                />
              )}
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ListingList;
