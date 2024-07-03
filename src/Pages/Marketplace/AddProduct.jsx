import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from "reactstrap";
import axios from "axios";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useApi } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate()
  const { addSpecificUserProduct } = useApi();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    // subcategory: "",
    quantity: "",
    price: "",
    shortdescription: "",
    description: "",
    variant: "",
    size: "",
    shipping: "",
    returns: "",
    specialization: "",
    status: "",
    thumbnail: null,
    images: [],
    userID: localStorage.getItem("userID"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files[0],
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < product.images.length; i++) {
          formData.append("images", product.images[i]);
        }
      } else {
        formData.append(key, product[key]);
      }
    });

    try {
    await addSpecificUserProduct(formData)
        navigate("/marketplace-products")
    } catch (error) {
      console.error(error);
    }
  };
  const formGroupStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  };

  const labelStyle = {
    flex: "1",
    marginBottom: "0", // Removes default margin from Label component
  };

  const inputStyle = {
    flex: "1",
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Marketplace" breadcrumbItem="Add Product" />

          <Form onSubmit={handleSubmit}>
            <FormGroup style={formGroupStyle}>
              <Label for="name" style={labelStyle}>
                Name
              </Label>
              <Input
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={product.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="category" style={labelStyle}>
                Category
              </Label>
              <Input
                className="form-control"
                type="text"
                name="category"
                id="category"
                value={product.category}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="subcategory" style={labelStyle}>
                Subcategory
              </Label>
              <Input
                className="form-control"
                type="text"
                name="subcategory"
                id="subcategory"
                value={product.subcategory}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="quantity" style={labelStyle}>
                Quantity
              </Label>
              <Input
                className="form-control"
                type="number"
                name="quantity"
                id="quantity"
                value={product.quantity}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="price" style={labelStyle}>
                Price
              </Label>
              <Input
                className="form-control"
                type="number"
                name="price"
                id="price"
                value={product.price}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="shortdescription" style={labelStyle}>
                Short Description
              </Label>
              <Input
                className="form-control"
                type="text"
                name="shortdescription"
                id="shortdescription"
                value={product.shortdescription}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="description" style={labelStyle}>
                Description
              </Label>
              <Input
                className="form-control"
                type="textarea"
                name="description"
                id="description"
                value={product.description}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="variant" style={labelStyle}>
                Variant
              </Label>
              <Input
                className="form-control"
                type="text"
                name="variant"
                id="variant"
                value={product.variant}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="size" style={labelStyle}>
                Size
              </Label>
              <Input
                className="form-control"
                type="text"
                name="size"
                id="size"
                value={product.size}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="shipping" style={labelStyle}>
                Shipping
              </Label>
              <Input
                className="form-control"
                type="text"
                name="shipping"
                id="shipping"
                value={product.shipping}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="returns" style={labelStyle}>
                Returns
              </Label>
              <Input
                className="form-control"
                type="text"
                name="returns"
                id="returns"
                value={product.returns}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="specialization" style={labelStyle}>
                Specialization
              </Label>
              <Input
                className="form-control"
                type="text"
                name="specialization"
                id="specialization"
                value={product.specialization}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="status" style={labelStyle}>
                Status
              </Label>
              <Input
                className="form-control"
                type="text"
                name="status"
                id="status2"
                value={product.status}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="thumbnail" style={labelStyle}>
                Thumbnail
              </Label>
              <Input
                className="form-control"
                type="file"
                name="thumbnail"
                id="thumbnail"
                onChange={handleFileChange}
                style={inputStyle}
              />
              <FormText color="muted">Upload the thumbnail image.</FormText>
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="images" style={labelStyle}>
                Images
              </Label>
              <Input
                className="form-control"
                type="file"
                name="images"
                id="images"
                multiple
                onChange={handleFileChange}
                style={inputStyle}
              />
              <FormText color="muted">
                Upload additional product images.
              </FormText>
            </FormGroup>
            <Button type="submit" color="primary">
              Add Product
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddProduct;
