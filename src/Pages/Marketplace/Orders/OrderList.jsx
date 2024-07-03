import React, { useEffect, useState } from "react";
import { useApi } from "../../../context/MyContext";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Collapse,
  CardTitle,
  CardText,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const OrderList = () => {
  const { getAllOrders, orders } = useApi();
  useEffect(() => {
    getAllOrders();
  }, []);
  const [modal_list, setmodal_list] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function tog_list() {
    setmodal_list(!modal_list);
  }
  const [openCollapseId, setOpenCollapseId] = useState(null);

  // Function to toggle collapse for a specific order
  const toggleCollapse = (orderId) => {
    setOpenCollapseId(openCollapseId === orderId ? null : orderId);
  };

  const toggle = () => setIsOpen(!isOpen);
  console.log(orders);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Users" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div className="d-flex gap-1">
                          <Button
                            color="success"
                            className="add-btn"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Button>
                          <Button color="soft-danger">
                            <i className="ri-delete-bin-2-line"></i>
                          </Button>
                        </div>
                      </Col>
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th>
                            <th className="sort" data-sort="order_id">
                              Order Id
                            </th>
                            <th className="sort" data-sort="payment_id">
                              Payment Id
                            </th>
                            <th className="sort" data-sort="phone">
                              Products
                            </th>
                            <th className="sort" data-sort="order_amt">
                              Order Amount
                            </th>
                            <th className="sort" data-sort="date">
                              Payment Status
                            </th>
                            <th className="sort" data-sort="status">
                              User Details
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {orders.map((order, ind) => (
                            <React.Fragment key={ind}>
                              <tr>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                <td className="id">
                                  <Link
                                    to="#"
                                    className="fw-medium link-primary"
                                  >
                                    {order._id}
                                  </Link>
                                </td>
                                <td className="order_id">{order.paymentId}</td>
                                <td className="payment_id">
                                  <button
                                    className="btn btn-sm btn-outline-success edit-item-btn"
                                    onClick={() => toggleCollapse(order._id)}
                                  >
                                    View Products
                                  </button>
                                </td>
                                <td className="date">
                                  ₹ {order.paymentAmount}
                                </td>
                                <td className="date">
                                  <span className="badge badge-soft-success text-uppercase">
                                    {order.paymentStatus}
                                  </span>
                                </td>
                                <td className="status">{order?.user?._id}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteRecordModal"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              {openCollapseId === order._id && (
                                <tr>
                                  <td colSpan="8" className="p-0 border-0">
                                    <Collapse isOpen={true} className="w-100">
                                      <div className="p-3">
                                        <div className="row">
                                        {order.products.map((elem, ind) => (

                                          <Card body className="col-6" style={{width:'200px'}}>
                                            <img
                                              src={elem.product.thumbnail}
                                              alt=""
                                              width={100}
                                            />
                                            <CardTitle tag="h5" style={{width:'max-content'}}>
                                              {elem.product.name}
                                            </CardTitle>
                                            <CardText className="text-truncate w-50">
                                              {elem.product.shortdescription}
                                            </CardText>
                                          </Card>
                                        ))}
                                        </div>
                                      </div>
                                    </Collapse>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#121331,secondary:#08a88a"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OrderList;
