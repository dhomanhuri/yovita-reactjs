import React from "react";
import { Table, Modal } from "antd";

const ModalTable = ({isModalVisible, setIsModalVisible, data}) => {
  const columns = [
    {
      title: "Tahun",
      dataIndex: "tahun",
      key: "tahun",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Bulan",
      dataIndex: "bulan",
      key: "bulan",
    },
    {
      title: "Total Aircraft Inventory (TAI)",
      dataIndex: "tai",
      key: "tai",
    },
    {
      title: "Unchedule Maintenance",
      key: "maintenance",
      dataIndex: "maintenance",
    },
    {
      title: "Operational Readiness",
      key: "readiness",
      dataIndex: "readiness",
    }
  ];
  
  return (
    <Modal
      title="Tabel Perrhitungan"
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
      width="100vw"
      maskClosable={false}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </Modal>
  );
};

export default ModalTable;
