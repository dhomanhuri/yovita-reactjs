import React, {useState} from "react";
import { Table, Modal, Card, Row, Col  } from "antd";

import array2 from "./tahunterbaik.json"
import datarev from "./datarev.json"
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)


const ModalTahunIni = ({isModalVisible, setIsModalVisible,datadata,rev}) => {
  // List<dynamic> tabledata = [];
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(true);
  // const [options, setOptions] = React.useState([]);
  const ModalTable = ({data}) => {
    
    let tabledata = "";
    let tempPredict = data.map(item => item.predict)
    let tempact = data.map(item => item.readiness)
    // console.log(data)
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
    const columnsrev = [
      {
        title: "MAPE",
        dataIndex: "mape",
        key: "mape",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "RMSE",
        dataIndex: "rmse",
        key: "rmse",
      },
      {
        title: "R2",
        dataIndex: "r2",
        key: "r2",
      },
    ];
    console.log("ini rev : "+rev);
    if(rev==="2017"){
      tabledata = [
        {
          "mape": "9.055",
          "rmse": "66.813",
          "r2": "32.99 %"
        },
        {
          "mape": "Sangat Akurat",
          "rmse": "Jauh dengan Nilai Prediksi",
          "r2": "Rendah"
        }]
    }
    else if (rev == "2018"){
      tabledata = [
        {
          "mape": "5.122",
          "rmse": "7.263",
          "r2": "64.09 %"
        },
        {
          "mape": "Sangat Akurat",
          "rmse": "Dekat dengan Nilai Predisiksi",
          "r2": "Kuat"
        }
      ]
    }
    else if (rev == "2019"){
      tabledata = [
        {
          "mape": "7.864",
          "rmse": "53.171",
          "r2": "78.86 %"
      },
      {
        "mape": "Sangat Akurat",
        "rmse": "Jauh dengan Nilai Prediksi",
        "r2": "Kuat"
      }
      ]
    }
    else if (rev === "2020"){
      tabledata = [{
        "mape": "18.651",
        "rmse": "185.472",
        "r2": "25.29 %"
    },
    {
      "mape": "Baik",
      "rmse": "Jauh dengan Nilai Prediksi",
      "r2": "Rendah"
    }]
    }
    else if (rev == "2021"){
      tabledata = [{
        "mape": "8.629",
        "rmse": "86.129",
        "r2": "44.936 %"
    },
    {
      "mape": "Sangat Akurat",
      "rmse": "Jauh dengan Nilai Prediksi",
      "r2": "Sangat Rendah"
    }]
    }
    else if (rev === "2021"){
     tabledata = [{
        "mape": "6.33",
        "rmse": "13.60",
        "r2": "8.49 %"
    },
    {
      "mape": "Sangat Akurat",
      "rmse": "Dekat dengan Nilai Prediksi",
      "r2": "Sangat Rendah"
    }]
    }
    else{
     tabledata = [
        {
          "mape": "",
          "rmse": "",
          "r2": ""
      }
      ]
    }
    console.log(tabledata);
    return (
      <
      >
        
        {/* <Line data={data2}>Hello</Line> */}
        <Row justify="space-around" align="top" className="h-full">
        <Col>
        <Card  bordered={false} className="text-center" style={{ width: 500 }} >{/*ini*/}
             
        <Line data={data2}>Hello</Line>
        <Table
                columns={columnsrev}
                dataSource={tabledata}
                pagination={{ pageSize: 12 }}
              />
          </Card>      
        </Col>
        <Col>
        <Card  bordered={false} className="text-center" style={{ width: 500 }} >
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 12 }}
              />
          </Card>
        </Col>
      </Row>
        
      </>
    );
  };
  const ModalTableLY = ({data}) => {
    let tempPredict = data.map(item => item.predict)
    // console.log(data)
    const [data2]= useState({
      labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
      datasets:[
        {
          label:"Prediksi",
          data:tempPredict,
          backgroundColor:'purple',
          borderColor:'purple',
          tension:0.4,
          // fill:true,
          pointStyle:'rect',
          pointBorderColor:'blue',
          pointBackgroundColor:'#fff',
          showLine:true
        },
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
        title: "Prediksi",
        key: "maintenance",
        dataIndex: "predict",
      },
    ];
    
    return (
      <
      >

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
                dataSource={datarev}
                pagination={{ pageSize: 12 }}
              />
          </Card>
        </Col>
      </Row>
        
      </>
    );
  };
  
  
  
  return (
    <Modal
      title="."
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
      width="82vw"
      maskClosable={false}
    >
      <Card bordered={false} className="text-center" style={{ width: 1060 }} >
        <Row justify="space-around" align="top" className="h-full">
          <Col>
            <Card onClick={() => { setToggle((t) => true); setToggle2((t) => false);setToggle3((t) => true)}}  bordered={false} className="text-center" style={{ width: 300 }} >
              Tahun Ini
            </Card>      
          </Col>
          {/* <Col>
            <Card onClick={() => { setToggle((t) => false); setToggle2((t) => false);setToggle3((t) => true)}}  bordered={false} className="text-center" style={{ width: 500 }} >
              Tahun Terbaik
            </Card>      
          </Col>
          <Col>
            <Card onClick={() => { setToggle((t) => true); setToggle2((t) => false);setToggle3((t) => false)}} bordered={false} className="text-center" style={{ width: 500 }} >
                Tahun Terakhir
            </Card>
          </Col>*/}
        </Row>   
        <div style={{ display: toggle ? "none" : "block" }}>
          <br></br>
        <ModalTableLY
          // options={options}
          // setData={setData}
          data={array2}
        />
        </div>
        <div style={{ display: toggle2 ? "none" : "block" }}>
          <br></br>
        <ModalTable
          // options={options}
          // setData={setData}
          data={datadata}
        />
        </div>
        <div style={{ display: toggle3 ? "none" : "block" }}>
          <br></br>
        
        </div>
      </Card>
    </Modal>
  );
};
export default ModalTahunIni;