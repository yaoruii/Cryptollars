import React, { useState } from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Modal, Button, Form, Input } from "antd";
import { closeOutlined } from '@ant-design/icons';
export default function PopUp(props) {
    
    
     
    return(
        <>
             <Modal 
             closable={false}
             title = "Confirmation"
             visible={props.isModalVisible} 
             
             onCancel={() => {
                props.setIsModalVisible(false);
                }} 
             onOk={() => {
                props.setIsModalVisible(false);
                }} >
                <closeOutlined style={{ fontSize: '16px', color: '#08c' }} />
                <span>Are you sure to begin the hunt?</span>
                
            </Modal>

        </>
    )
}