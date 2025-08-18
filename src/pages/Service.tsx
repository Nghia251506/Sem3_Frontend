import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {fetchServices} from "../redux/serviceSlice";
import { Service } from "../types/Service";

const {Column} = Table;

const ServicePage:React.FC = ()=> {
    const dispatch = useDispatch<AppDispatch>();
    const services = useSelector((state:RootState) => state.services.items);

    useEffect(() => {
        dispatch(fetchServices())
    },[dispatch]);
    console.log(services)
    return (
        <>
            <h1 className="text-center text-2xl font-bold">List Service</h1>
            <Table<Service> dataSource={services} rowKey="id" pagination={{ pageSize: 5 }}>
                    <Column title="Code" dataIndex="code" key="code" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Division" dataIndex="division" key="division" />
                    <Column title="Description" dataIndex="description" key="description" />
                    <Column
                      title="Actions"
                      key="actions"
                      render={(_, record: Service) => (
                        <Space size="middle">
                             <span>Edit</span>
                          {/* <Button type="link" onClick={() => handleEdit(record)}>
                           
                          </Button> */}
                          <span>Delete</span>
                          {/* <Button danger type="link" onClick={() => handleDelete(record.id)}>
                            
                          </Button> */}
                        </Space>
                      )}
                    />
                  </Table>
        </>
    )
}

export default ServicePage;