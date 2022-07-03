import React from "react";
import axios from "axios";
import { Table, Space, Upload, message, Button, Modal, Form, Select, Popconfirm, InputNumber } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined
} from "@ant-design/icons";

const BASE_URL = process.env.REACT_APP_BASE_URL

const Readiness = () => {
  const [data, setData] = React.useState([]);
  const [dataEdit, setDataEdit] = React.useState({});
  const [reload, setReload] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm()
  
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/readiness`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setData(data.map((_,idx) => ({..._, key: idx})));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  const columns = [
    {
      title: 'Tahun',
      dataIndex: 'tahun',
      key: 'tahun',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Bulan',
      dataIndex: 'bulan',
      key: 'bulan',
    },
    {
      title: 'Total Aircraft Inventory (TAI)',
      dataIndex: 'tai',
      key: 'tai',
    },
    {
      title: 'Unchedule Maintenance',
      key: 'maintenance',
      dataIndex: 'maintenance',
    },
    {
      title: 'Operational Readiness',
      key: 'readiness',
      dataIndex: 'readiness',
    },
    {
      title: 'Action',
      key: 'action',
      render: (props) => (
        <Space size="middle">
          <EditOutlined className="cursor-pointer" onClick={() => showModal(props)}/>
          <Popconfirm
            title="Are you sure to delete this data?"
            onConfirm={() => handleDelete(props.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined className="text-red-500 cursor-pointer"/>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const props = {
    name: 'file',
    action: `${BASE_URL}/upload`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setReload(!reload)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const showModal = (props) => {
    form.setFieldsValue({
      ...props
    })
    setDataEdit(props)
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsSubmitting(true)
    await axios.patch(`${BASE_URL}/readiness/${form.getFieldValue('id')}`, form.getFieldValue(), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    setReload(!reload)
    setIsModalVisible(false);
    setIsSubmitting(false)
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/readiness/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    setReload(!reload)
  }

  const rolee = localStorage.getItem("role")
  const [months] = React.useState(['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'])
  if (rolee==="admin") {
    return (
      <>
        <Upload {...props} accept=".csv">
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} loading={!data.length} />
        <Modal title="Edit Data Kesiapan" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} confirmLoading={isSubmitting}>
          <Form form={form} initialValues={dataEdit} labelCol={{span: 6}} wrapperCol={{span: 8}} layout="horizontal">
            <Form.Item name="tahun" label="Tahun">
              <InputNumber onChange={(e) => form.setFieldsValue({tahun: e})}/>
            </Form.Item>
            <Form.Item name="bulan" label="Bulan">
              <Select onChange={(e) => form.setFieldsValue({bulan: e})}>
                {
                  months.map(month => <Select.Option value={month} key={month}>{month}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item name="tai" label="TAI">
              <InputNumber onChange={(e) => form.setFieldsValue({tai: e})}/>
            </Form.Item>
            <Form.Item name="maintenance" label="Maintenance">
              <InputNumber onChange={(e) => form.setFieldsValue({maintenance: e})}/>
            </Form.Item>
            <Form.Item name="readiness" label="Readiness">
              <InputNumber onChange={(e) => form.setFieldsValue({readiness: e})}/>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
  else{
    return (
      <>
        {/* <Upload {...props} accept=".csv">
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} loading={!data.length} />
        <Modal title="Edit Data Kesiapan" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} confirmLoading={isSubmitting}>
          <Form form={form} initialValues={dataEdit} labelCol={{span: 6}} wrapperCol={{span: 8}} layout="horizontal">
            <Form.Item name="tahun" label="Tahun">
              <InputNumber onChange={(e) => form.setFieldsValue({tahun: e})}/>
            </Form.Item>
            <Form.Item name="bulan" label="Bulan">
              <Select onChange={(e) => form.setFieldsValue({bulan: e})}>
                {
                  months.map(month => <Select.Option value={month} key={month}>{month}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item name="tai" label="TAI">
              <InputNumber onChange={(e) => form.setFieldsValue({tai: e})}/>
            </Form.Item>
            <Form.Item name="maintenance" label="Maintenance">
              <InputNumber onChange={(e) => form.setFieldsValue({maintenance: e})}/>
            </Form.Item>
            <Form.Item name="readiness" label="Readiness">
              <InputNumber onChange={(e) => form.setFieldsValue({readiness: e})}/>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
};

export default Readiness;