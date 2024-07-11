import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const ListingTable = ({ data, onView, onEdit, onDelete, openModal, openImageModal }) => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">ID</span>,
      selector: (row) => row._id || "No ID",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Business Name</span>,
      selector: (row) => {
        return (
          <React.Fragment>
            <Link to="#" className="business_name">
              {row.name || "No Business Name"}
            </Link>
          </React.Fragment>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Category</span>,
      selector: (row) => row.category?.name || "No Category",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description || "No Description",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.email || "No Email",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Phone</span>,
      selector: (row) => row.phone || "No Phone",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Features</span>,
      selector: (row) => (row.features && row.features.length > 0 ? row.features.join(', ') : "No Features"),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Thumbnail</span>,
      selector: (row) =>
        row.thumbnail ? (
          <div onClick={() => openModal(row.thumbnail)}>
            <img
              src={row.thumbnail}
              alt="Thumbnail"
              style={{ maxWidth: "50px", cursor: "pointer" }}
            />
          </div>
        ) : (
          "No Thumbnail"
        ),
      sortable: true,
    },
    {
        name: <span className="font-weight-bold fs-13">Images</span>,
        selector: (row) =>
          row.images && row.images.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {row.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`image-${index}`}
                  className='py-1'
                  style={{ maxWidth: "50px", height:"50px" ,cursor: "pointer" }}
                  onClick={() => openModal(image)}
                />
              ))}
            </div>
          ) : (
            "No Images"
          ),
        sortable: true,
      },
    {
      name: <span className="font-weight-bold fs-13">Website</span>,
      selector: (row) => (
        row.website ? (
          <a href={row.website} target="_blank" rel="noopener noreferrer">
            {row.website}
          </a>
        ) : (
          "No Website"
        )
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Designation</span>,
      selector: (row) => row.designation || "No Designation",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Location</span>,
      selector: (row) => row.location || "No Location",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Lowest Price</span>,
      selector: (row) => row.lowestPrice || "No Lowest Price",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Highest Price</span>,
      selector: (row) => row.highestPrice || "No Highest Price",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Company</span>,
      selector: (row) => row.company || "No Company",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Iframe</span>,
      selector: (row) => (
        row.iframe ? (
          <div dangerouslySetInnerHTML={{ __html: row.iframe }} />
        ) : (
          "No Iframe"
        )
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Facebook</span>,
      selector: (row) => (
        row.facebook ? (
          <a href={row.facebook} target="_blank" rel="noopener noreferrer">
            {row.facebook}
          </a>
        ) : (
          "No Facebook"
        )
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Twitter</span>,
      selector: (row) => (
        row.twitter ? (
          <a href={row.twitter} target="_blank" rel="noopener noreferrer">
            {row.twitter}
          </a>
        ) : (
          "No Twitter"
        )
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">LinkedIn</span>,
      selector: (row) => (
        row.linked ? (
          <a href={row.linked} target="_blank" rel="noopener noreferrer">
            {row.linked}
          </a>
        ) : (
          "No LinkedIn"
        )
      ),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Skype</span>,
      selector: (row) => row.skype || "No Skype",
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: false,
      cell: (row) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem href="#!" onClick={() => onView(row._id)}>
                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>View
              </DropdownItem>
              <DropdownItem
                className="edit-item-btn"
                onClick={() => onEdit(row._id)}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem
                className="remove-item-btn"
                onClick={() => onDelete(row._id)}
              >
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} pagination />;
};

export default ListingTable;
