import React, { useEffect, useState } from "react";
import { Button, Container, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../../context/MyContext";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CategoryTable from "../../Marketplace/Categories/CategoryTable";

const ListingCategoryList = () => {
  const navigate = useNavigate();
  const { getAllListingCategories, listingCategories, deleteListingCategory } = useApi();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getAllListingCategories();
  }, []);

  const handleView = (id) => {
    console.log("View product with id:", id);
    // Add your view logic here
  };

  const handleEdit = (id) => {
    navigate(`/listing-categories/edit-category/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteListingCategory(id);
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
          <Breadcrumbs title="Business Listings" breadcrumbItem="All Listing Categories" />
          <Link
            color="success"
            role="button"
            className="add-btn btn btn-primary mb-3"
            to="/listing-categories/add-category"
            id="create-btn"
          >
            <i className="ri-add-line align-bottom me-1"></i> Add Listing Category
          </Link>
          <CategoryTable
            categories={listingCategories}
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

export default ListingCategoryList;
