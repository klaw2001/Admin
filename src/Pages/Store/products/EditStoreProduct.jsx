import React, { useEffect, useState } from "react";
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
import { useApi } from "../../../context/MyContext";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";

const EditStoreProduct = () => {
  const navigate = useNavigate();
  const { getSingleStoreProduct, updateStoreProduct } = useApi();
  const [singleProduct, setSingleProduct] = useState({});
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  const { product_id } = useParams();
  const getParamsProduct = async () => {
    const res = await getSingleStoreProduct(product_id);
    setSingleProduct(res);
    setThumbnailPreview(res.thumbnail);
    setImagesPreview(res.images)
  };
  useEffect(() => {
    getParamsProduct();
  }, [product_id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail") {
      setSingleProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files[0],
      }));
      setThumbnailPreview(URL.createObjectURL(files[0]));
    } else if (name === "images") {
      setSingleProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files,
      }));
      setImagesPreview([...files].map((file) => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(singleProduct).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < singleProduct.images.length; i++) {
          formData.append("images", singleProduct.images[i]);
        }
      } else if (key === "thumbnail") {
        formData.append("thumbnail", singleProduct.thumbnail); // Ensure product.thumbnail is correctly set here
      }else if (key === "category") {
        formData.append("category", singleProduct.category._id);
      }
       else {
        formData.append(key, singleProduct[key]);
      }
    });

    try {
      await updateStoreProduct(product_id, formData);
      // navigate("/marketplace-products");
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
                value={singleProduct?.name}
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
                value={singleProduct.category?.name}
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
                value={singleProduct.quantity}
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
                value={singleProduct.price}
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
                value={singleProduct.shortdescription}
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
                value={singleProduct.description}
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
                value={singleProduct.variant}
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
                value={singleProduct.size}
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
                value={singleProduct.shipping}
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
                value={singleProduct.returns}
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
                value={singleProduct.specialization}
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
                value={singleProduct.status}
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
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  style={{ width: "100px", height: "100px", marginTop: "10px" }}
                />
              )}
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
              {imagesPreview.length > 0 && (
                <div>
                  {imagesPreview.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    />
                  ))}
                </div>
              )}
              <FormText color="muted">
                Upload additional product images.
              </FormText>
            </FormGroup>
            <Button type="submit" color="primary">
              Update Product
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditStoreProduct;
