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
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useApi } from "../../../context/MyContext";
const EditListing = () => {
  const navigate = useNavigate();
  const { getSingleListingBusiness, updateListingBusiness } = useApi();
  const { listing_id } = useParams();
  const [singleListing, setSingleListing] = useState({});
  const getSingleListing = async () => {
    const res = await getSingleListingBusiness(listing_id);
    setSingleListing(res);
  };
  useEffect(() => {
    getSingleListing();
  }, [listing_id]);


  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleListing((prevListing) => ({
      ...prevListing,
      [name]:
        name === "lowestPrice" || name === "highestPrice"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleFeaturesChange = (e) => {
    const { value } = e.target;
    const featuresArray = value.split(",").map((feature) => feature.trim());
    setSingleListing((prevListing) => ({
      ...prevListing,
      features: featuresArray,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail") {
      setSingleListing((prevProduct) => ({
        ...prevProduct,
        [name]: files[0],
      }));
    } else {
      setSingleListing((prevProduct) => ({
        ...prevProduct,
        [name]: files,
      }));
    }
    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(files[0]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object to handle file uploads
    const formData = new FormData();
    Object.keys(singleListing).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < singleListing.images.length; i++) {
          formData.append("images", singleListing.images[i]);
        }
      }else if(key === "category"){
        formData.append("category", singleListing.category._id)
      } else if(key === "user"){
        formData.append("user",singleListing.user._id)
      } else {
        formData.append(key, singleListing[key]);
      }
    });

    try {
      await updateListingBusiness(listing_id,formData); // Use addListingBusiness instead of AddListing
      navigate("/listings-list");
    } catch (error) {
      console.error("Error adding listing business:", error);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Business Listings"
            breadcrumbItem="Add Listing Category"
          />

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
                value={singleListing.name}
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
                value={singleListing.description}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="features" style={labelStyle}>
                Features
              </Label>
              <Input
                className="form-control"
                type="text"
                name="features"
                id="features"
                value={singleListing.features}
                onChange={handleFeaturesChange}
                style={inputStyle}
              />
              <FormText color="muted">
                Enter features separated by commas.
              </FormText>
            </FormGroup>

            <FormGroup style={formGroupStyle}>
              <Label for="email" style={labelStyle}>
                Email
              </Label>
              <Input
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={singleListing.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="phone" style={labelStyle}>
                Phone
              </Label>
              <Input
                className="form-control"
                type="tel"
                name="phone"
                id="phone"
                value={singleListing.phone}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="website" style={labelStyle}>
                Website
              </Label>
              <Input
                className="form-control"
                type="url"
                name="website"
                id="website"
                value={singleListing.website}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="lowestPrice" style={labelStyle}>
                Lowest Price
              </Label>
              <Input
                className="form-control"
                type="number"
                name="lowestPrice"
                id="lowestPrice"
                value={singleListing.lowestPrice}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="highestPrice" style={labelStyle}>
                Highest Price
              </Label>
              <Input
                className="form-control"
                type="number"
                name="highestPrice"
                id="highestPrice"
                value={singleListing.highestPrice}
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
            <FormGroup style={formGroupStyle}>
              <Label for="iframe" style={labelStyle}>
                Map iframe
              </Label>
              <Input
                className="form-control"
                type="text"
                name="iframe"
                id="iframe"
                value={singleListing.iframe}
                onChange={handleChange}
                style={inputStyle}
              />
              <FormText color="muted">
                Enter iframe code for Google Maps.
              </FormText>
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="facebook" style={labelStyle}>
                Facebook
              </Label>
              <Input
                className="form-control"
                type="url"
                name="facebook"
                id="facebook"
                value={singleListing.facebook}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="twitter" style={labelStyle}>
                Twitter
              </Label>
              <Input
                className="form-control"
                type="url"
                name="twitter"
                id="twitter"
                value={singleListing.twitter}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="linked" style={labelStyle}>
                LinkedIn
              </Label>
              <Input
                className="form-control"
                type="url"
                name="linkedin"
                id="linkedin"
                value={singleListing.linkedin}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            {/* Add more fields as needed */}
            <Button type="submit" color="primary">
              Add Store Category
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditListing;
