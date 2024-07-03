import React, { useEffect, useState } from "react";
import { useApi } from "../../context/MyContext";
import { Button, Container, Modal, ModalHeader, ModalBody } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { BasicTable } from "../Tables/DataTables/datatableCom";
import { Link, useNavigate } from "react-router-dom";
import CategoryTable from "./Categories/CategoryTable";

const CategoriesList = () => {
  const navigate = useNavigate();
  const { getAllCategories, categories, deleteCategory } = useApi();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleView = (id) => {
    console.log("View product with id:", id);
    // Add your view logic here
  };

  const handleEdit = (id) => {
    console.log("Edit product with id:", id);
    navigate(`/marketplace-categories/edit-caetgory/${id}`);
  };

  const handleDelete = async (id) => {
    console.log("Delete product with id:", id);
    await deleteCategory(id);
    
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
          <Breadcrumbs title="Marketplace" breadcrumbItem="All Products" />
          <Link
            color="success"
            role="button"
            className="add-btn btn btn-primary mb-3"
            to="/marketplace-products/add-category"
            id="create-btn"
          >
            <i className="ri-add-line align-bottom me-1"></i> Add Category
          </Link>
          <CategoryTable
            categories={categories}
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

export default CategoriesList;
