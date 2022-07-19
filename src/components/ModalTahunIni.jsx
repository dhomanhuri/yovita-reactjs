import React, {useState} from "react";
import { Table, Modal, Card, Row, Col  } from "antd";
import array from "./tahunterakhir.json"
import array2 from "./tahunterbaik.json"
import axios from "axios";
// import ModalTable from "./ModalTable";
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)
// import ./ModalTable
// import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL


const ModalTahunIni = ({isModalVisible, setIsModalVisible,datadata}) => {
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(true);
  const [options, setOptions] = React.useState([]);
  const ModalTable = ({data}) => {
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
    
    return (
      <
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
                dataSource={data}
                pagination={{ pageSize: 12 }}
              />
          </Card>
        </Col>
      </Row>
        
      </>
    );
  };
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
  const ModalTableBM = ({data}) => {
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
                dataSource={data}
                pagination={{ pageSize: 12 }}
              />
          </Card>
        </Col>
      </Row>
        
      </>
    );
  };
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
  
  console.log(toggle,toggle3,toggle2);
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
          options={options}
          // setData={setData}
          data={array2}
        />
        </div>
        <div style={{ display: toggle2 ? "none" : "block" }}>
          <br></br>
        <ModalTable
          options={options}
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