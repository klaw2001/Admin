import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { useApi } from '../../../context/MyContext';

const AddListingCategory = () => {
  const navigate = useNavigate();
  const { addListingCategory } = useApi();
  const [category, setCategory] = useState({
    name: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null); // State to hold image preview URL

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
    console.log(category)
    e.preventDefault();
  
    try {
      await addListingCategory(category);
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
          <Breadcrumbs title="Buisness Listings" breadcrumbItem="Add Listing Category" />

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
              <FormText color="muted">Upload the category image.</FormText>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Category Preview"
                    style={{ maxWidth: '200px' }}
                  />
                </div>
              )}
            </FormGroup>
            <Button type="submit" color="primary">
              Add Store Category
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddListingCategory;
