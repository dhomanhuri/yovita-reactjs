import React from "react";
import { Table, Image, Button } from "antd";
import ModalPredict from "../components/ModalPredict";
import ModalTable from "../components/ModalTable";
import ModalSelect from "../components/ModalSelect";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Predict = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [visibleSelect, setVisibleSelect] = React.useState(false);
  const [visibleTable, setVisibleTable] = React.useState(false);
  const [image, setImage] = React.useState();
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/readiness`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const tahun = [...new Set(data.map((datum) => datum.tahun))];
        setOptions(tahun);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
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
// console.log(setVisibleTable);
  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Pilih Tahun</Button>
      <Button onClick={() => setVisible(true)} className="ml-4">Tampilkan Grafik</Button>
      <Button onClick={() => setVisibleSelect(true)} className="ml-4">Predict</Button>
      <ModalPredict
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        options={options}
        setImage={setImage}
        setData={setData}
      />
      <ModalTable
        isModalVisible={visibleTable}
        setIsModalVisible={setVisibleTable}
        data={data}
      />
      <ModalSelect
        isModalVisible={visibleSelect}
        setIsModalVisible={setVisibleSelect}
        datadata={data}
        
      />
      <Table
        columns={columns}
        dataSource={isModalVisible ? [] : data}
        pagination={{ pageSize: 10 }}
        loading={isModalVisible}
      />
      {visible && (
        <div className="flex justify-center content-center">
          <Image
            width={200}
            src={`data:image/png;base64,${image}`}
            style={{ display: "none", justifyContent: 'center', alignContent: 'center' }}
            preview={{
              visible,
              src: `data:image/png;base64,${image}`,
              onVisibleChange: (value) => {
                console.log(value);
                setVisible(value);
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default Predict;