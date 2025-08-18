import { Modal, Form, Input, Select, DatePicker } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

export type FieldType = {
  name: string;
  label: string;
  type?: "text" | "email" | "select" | "date";
  options?: { label: string; value: string | number }[];
  rules?: any[];
  disabled?: boolean; // sửa lại từ disable -> disabled
};

interface CommonModalProps {
  visible: boolean;
  title: string;
  okText?: string;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  fields: FieldType[];
  initialValues?: any;
}

const {Option} = Select;

const CommonModal: React.FC<CommonModalProps> = ({
  visible,
  title,
  okText = "Save",
  onCancel,
  onSubmit,
  fields,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      const values = { ...initialValues };

      // Convert string date -> dayjs object để DatePicker hiểu
      fields.forEach((f) => {
        if (f.type === "date" && values[f.name]) {
          values[f.name] = dayjs(values[f.name]);
        }
      });

      form.setFieldsValue(values || {});
    }
  }, [visible, initialValues, form, fields]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Format date field thành YYYY-MM-DD
      const formattedValues = { ...values };
      fields.forEach((f) => {
        if (f.type === "date" && values[f.name]) {
          formattedValues[f.name] = values[f.name].format("YYYY-MM-DD");
        }
      });

      onSubmit(formattedValues);
      form.resetFields();
    } catch (err) {
      console.error("Validation failed", err);
    }
  };

  return (
    <Modal
      open={visible}
      title={title}
      onCancel={onCancel}
      onOk={handleOk}
      okText={okText}
    >
      <Form form={form} layout="vertical">
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules}
          >
            {field.type === "select" ? (
              <Select
                placeholder={`Select ${field.label}`}
                options={field.options?.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
              />
            ) : field.type === "date" ? (
              <DatePicker style={{ width: "100%" }} disabled={field.disabled} />
            ) : (
              <Input type={field.type || "text"} disabled={field.disabled}/>
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default CommonModal;
