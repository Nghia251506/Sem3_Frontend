import React, { useEffect, useState } from "react";
import { Card, Descriptions, Spin } from "antd";
import { useAuth } from "../context/AuthContext"



const EmployeeDirectory: React.FC = () => {
     const { currentUser } = useAuth();

  if (!currentUser) {
    return <p>No user logged in.</p>;
  }



    return (
        <>
       <div className="p-6 justify-center">
      <Card title="Employee Profile" bordered={false}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Employee Code">
            {currentUser.employeeCode}
          </Descriptions.Item>
          <Descriptions.Item label="Full Name">
            {currentUser.employeeName}
          </Descriptions.Item>
          <Descriptions.Item label="Department">
            {currentUser.employeeDepartment}
          </Descriptions.Item>
          <Descriptions.Item label="Grade">
            {currentUser.employeeGrade}
          </Descriptions.Item>
          <Descriptions.Item label="Job Title">
            {currentUser.employeeJobTitle}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {currentUser.employeePhone}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {currentUser.employeeAddress}
          </Descriptions.Item>
          <Descriptions.Item label="Education">
            {currentUser.employeeEducation}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {currentUser.roleName}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Is Admin">
            {currentUser.isAdmin ? "Yes" : "No"}
          </Descriptions.Item> */}
        </Descriptions>
      </Card>
    </div>
        </>
    )
}

export default EmployeeDirectory;