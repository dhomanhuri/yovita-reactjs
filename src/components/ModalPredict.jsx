import React from "react";
import { Select, Modal } from "antd";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL

const ModalPredict = ({isModalVisible, setIsModalVisible, options, setImage, setData}) => {
  const [year, setYear] = React.useState("");
  const handleOk = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/predict/${year}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setData(data.result.map((_,idx) => ({..._, key: idx})));
      setImage(data.image)
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalVisible(false)
    }
  }, [year, setData, setImage, setIsModalVisible])

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      title="Pilih Tahun Data"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={350}
      maskClosable={false}
    >
      <Select className="w-40" placeholder="Tahun" onChange={(e) => setYear(e)}>
        {
          options.map(option => <Select.Option value={option} key={option}>{option}</Select.Option>)
        }
      </Select>
    </Modal>
  );
};

export default ModalPredict;
