import "./App.css";
import { db } from "./firebase/config";
import {
  collection,
  getDocs,
  
  deleteDoc,
  doc,
  
} from "firebase/firestore";
import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useProductsContext } from "./context/productsProvider";
import AddEditModal from "./components/AddEditModal";

function App() {
  const {products, getProducts, deleteProduct} = useProductsContext()
  
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [record, setRecord] = useState(null);
  
  useEffect(() => {
    let documents = [];
    async function readProuct() {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), key: doc.id });
      });
      
      getProducts(documents)
    }
    readProuct();
  }, []);

  const showModal = (record) => {
    setIsModalVisible(true);
    setRecord(record);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (record) => {
    await deleteDoc(doc(db, "products", record.key));
    
    deleteProduct(record)
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stock Level",
      dataIndex: "stockLevel",
      key: "stockLevel",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="App">
        <Button type="primary" onClick={(record) => showModal()}>
          Create Product
        </Button>
        <Table dataSource={products} columns={columns} />
        <AddEditModal
          visible={isModalVisible}
          cancel={handleCancel}
          onOk={handleOk}
          record={record}
          
          products={products}
        />
      {/* <button onClick={() => readProuct()}>get products</button> */}
    </div>
  );
}

export default App;

