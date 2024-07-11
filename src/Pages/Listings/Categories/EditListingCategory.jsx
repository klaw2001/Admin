import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../../../context/MyContext';
import Breadcrumbs from '../../../components/Common/Breadcrumb';


const EditListingCategory = () => {
  const navigate = useNavigate();
  const { getSingleListingCategory, updateListingCategory } = useApi();
  const { category_id } = useParams();
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState({
    name: "",
    image: "",
  });
  const getSinCategory = async(category_id)=>{
    try {
      const res = await getSingleListingCategory(category_id)
      setCategory({
        name:res.name,
        image:res.image
      })
      setImagePreview(res.image)
    } catch (error) {
      console.error(error)
    }
  } 

  useEffect(() => {
    getSinCategory(category_id);
  }, []);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: files[0], // Assuming only one file for image upload
    }));

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formData = new FormData();
    Object.keys(category).forEach((key) => {
      formData.append(key, category[key]);
    });

    try {
      await updateListingCategory(category_id, formData);
      navigate('/listing-categories');
    } catch (error) {
      console.error(error);
    }
  };

  const formGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const labelStyle = {
    flex: '1',
    marginBottom: '0', // Removes default margin from Label component
  };

  const inputStyle = {
    flex: '1',
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Business Listings" breadcrumbItem="Edit Listing Category" />

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
                value={category.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </FormGroup>
            <FormGroup style={formGroupStyle}>
              <Label for="image" style={labelStyle}>
                Image
              </Label>
              <Input
                className="form-control"
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
                style={inputStyle}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Category Preview"
                  style={{ width: '100px', height: '100px', marginTop: '10px' }}
                />
              )}
              <FormText color="muted">Upload the category image.</FormText>
            </FormGroup>
            <Button type="submit" color="primary">
              Update Category
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditListingCategory;
