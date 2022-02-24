import { Button, Form, Input, Modal } from "antd";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useProductsContext } from "../context/productsProvider";
import { db } from "../firebase/config";

export default function AddEditModal(props) {
  const { addProduct } = useProductsContext();
  
  const { visible, cancel, onOk, record } = props;

  const [form] = Form.useForm();
  const initialValue = record
    ? {
        name: record.name,
        price: record.price,
        stockLevel: record.stockLevel,
      }
    : "";

  useEffect(() => {
    form.resetFields();
  }, [record, form]);

  const onFinish = async (values) => {
    const { name, price, stockLevel } = values;

    if (record) {
      await setDoc(doc(db, "products", record.key), {
        name,
        price,
        stockLevel,
      });
    } else {
      try {
        const docref = await addDoc(collection(db, "products"), {
          name,
          price,
          stockLevel,
        });

        addProduct({ name, price, stockLevel, key: docref.id });

        
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <Modal
      title={record ? "Edit Product" : "Create Product"}
      visible={visible}
      onOk={onOk}
      onCancel={cancel}
      footer={null}
      forceRender
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValue}
        onFinish={onFinish}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Enter product name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Enter Product Price" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Stock Level"
          name="stockLevel"
          rules={[{ required: true, message: "Enter Stock Level" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={cancel}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
