import { React, useState } from "react";
import { Table, Modal, Card, Row, Col  } from "antd";
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)
const ModalTable = ({isModalVisible, setIsModalVisible, data}) => {
  let tempPredict = data.map(item => item.predict)
  let tempact = data.map(item => item.readiness)
  console.log(tempPredict)
  const [data2]= useState({
    labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
    datasets:[
      {
        label:"Prediksi",
        data:tempPredict,
        backgroundColor:'yellow',
        borderColor:'yellow',
        tension:0.4,
        // fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      },
      {
        label:"Aktual",
        data:tempact,
        backgroundColor:'red',
        borderColor:'red',
        tension:0.4,
        // fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      }
    ]
  })
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
      title: "Aktual",
      dataIndex: "tai",
      key: "tai",
    },
    {
      title: "Prediksi",
      key: "maintenance",
      dataIndex: "predict",
    },
  ];
  
  return (
    <Modal
      title="Tabel Prediksi"
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
      width="100vw"
      maskClosable={false}
    >
      
      {/* <Line data={data2}>Hello</Line> */}
      <Row justify="space-around" align="top" className="h-full">
      <Col>
      <Card  bordered={false} className="text-center" style={{ width: 500 }} >
           
      <Line data={data2}>Hello</Line>
        </Card>      
      </Col>
      <Col>
      <Card  bordered={false} className="text-center" style={{ width: 500 }} >
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }}
            />
        </Card>
      </Col>
    </Row>
      
    </Modal>
  );
};

export default ModalTable;
