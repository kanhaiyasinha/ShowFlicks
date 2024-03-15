import React from "react";
import { Form, Input, message, Modal } from "antd";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddTheatre, UpdateTheatre } from "../../apicalls/theatres";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

const { TextArea } = Input;

function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  selectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }

      if (response.success) {
        message.success(response.message);
        setShowTheatreFormModal(false);
        getData();
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
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      visible={showTheatreFormModal}
      onCancel={() => {
        setShowTheatreFormModal(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input theatre name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input theatre address!" }]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input theatre phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input theatre email!" }]}
        >
          <Input />
        </Form.Item>

        <div style={{ textAlign: "right" }}>
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => setShowTheatreFormModal(false)}
          />
          <Button title="Save" type="primary" htmlType="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default TheatreForm;
