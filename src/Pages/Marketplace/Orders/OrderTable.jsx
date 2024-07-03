import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";

const CategoryTable = ({ orders, onView, onEdit, onDelete, openModal }) => {
  const columns = [
    {
      name: (
        <Input
          className="form-check-input fs-15"
          type="checkbox"
          name="checkAll"
          value="option1"
        />
      ),
      cell: () => (
        <input
          className="form-check-input fs-15"
          type="checkbox"
          name="checkAll"
          value="option1"
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">SR No.</span>,
      selector: (row) => row.srNo,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Order ID</span>,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Payment ID</span>,
      selector: (row) => row.paymentId,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Products</span>,
      selector: (row) => row.products,
      sortable: true,
    },
    
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row) => <Link to="#!">{row.name}</Link>,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Created At</span>,
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
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
              <DropdownItem href="#!" onClick={() => onView(row.id)}>
                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>View
              </DropdownItem>
              <DropdownItem
                className="edit-item-btn"
                onClick={() => onEdit(row.id)}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
              <DropdownItem
                className="remove-item-btn"
                onClick={() => onDelete(row.id)}
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

  const data = orders?.map((order, index) => ({
    srNo: (index + 1).toString().padStart(2, "0"),
    id: order?._id,
    image: order?.image || "no img",
    name: order?.name,
    createdAt: order?.createdAt,
  }));

  return <DataTable columns={columns} data={data} pagination />;
};

export default CategoryTable;
