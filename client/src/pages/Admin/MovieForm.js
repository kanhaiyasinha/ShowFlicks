import React from "react";
import { Modal, Form, Row, Col, Input, Select, message } from 'antd';
import Button from "../../components/Button"; // Assuming you have a CustomButton component
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddMovie, UpdateMovie } from "../../apicalls/movies"; // Assuming you have these API calls
import moment from "moment";

const { Option } = Select;

function MovieForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    getData,
    formType,
}) {
    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
            "YYYY-MM-DD"
        );
    }

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response = null;

            if (formType === "add") {
                response = await AddMovie(values);
            } else {
                response = await UpdateMovie({
                    ...values,
                    movieId: selectedMovie._id,
                });
            }

            if (response.success) {
                getData();
                message.success(response.message);
                setShowMovieFormModal(false);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <Modal
            title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
            visible={showMovieFormModal}
            onCancel={() => {
                setShowMovieFormModal(false);
                setSelectedMovie(null);
            }}
            footer={null}
            width="90%" // Adjust width for responsiveness
            style={{ maxWidth: "900px" }} // Limit maximum width for large screens
        >
            <Form
                layout="vertical"
                initialValues={selectedMovie}
                onFinish={onFinish}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Movie Name" name="title">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Movie Description" name="description">
                            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Movie Duration (Min)" name="duration">
                            <Input type="number" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Language" name="language">
                            <Select>
                                <Option value="">Select Language</Option>
                                <Option value="Telugu">Telugu</Option>
                                <Option value="English">English</Option>
                                <Option value="Hindi">Hindi</Option>
                                <Option value="Tamil">Tamil</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Movie Release Date" name="releaseDate">
                            <input type="date" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Genre" name="genre">
                            <Select>
                                <Option value="">Select Genre</Option>
                                <Option value="Action">Action</Option>
                                <Option value="Comedy">Comedy</Option>
                                <Option value="Drama">Drama</Option>
                                <Option value="Romance">Romance</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                        <Form.Item label="Poster URL" name="poster">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ textAlign: 'right' }}>
                    <Button
                        title="Cancel"
                        variant="outlined"
                        type="button"
                        onClick={() => {
                            setShowMovieFormModal(false);
                            setSelectedMovie(null);
                        }}
                    />
                    <Button title="Save" type="primary" htmlType="submit" />
                </div>
            </Form>
        </Modal>
    );
}

export default MovieForm;
