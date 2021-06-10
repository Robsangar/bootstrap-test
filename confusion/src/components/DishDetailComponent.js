import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label, Col, Row, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else
        return (<div></div>);
}

function RenderComments({ comments }) {
    if (comments != null) {
        var list = comments.map(comment => {
            return (
                <>
                    <li> {comment.comment}</li>
                    <li> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
                    <p></p>
                </>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul class="list-unstyled">
                    {list}
                </ul>
                <CommentForm></CommentForm>
            </div>
        );
    } else
        return (<div></div>);
}

const DishDetail = (props) => {
    if (props.dish) {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    } else
        return (<div></div>);
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody >
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    default="1"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message">Comment</Label>
                                <Control.textarea model=".message" id="message" name="message"
                                    rows="12"
                                    className="form-control" />
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default DishDetail;