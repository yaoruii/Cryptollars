import React, { useEffect, useState } from "react";
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
             onOk={props.onOk} >
                <closeOutlined style={{ fontSize: '16px', color: '#08c' }} />
                
                <span>{props.att_or_confirm ==="confirm"? "Are you sure to begin the hunt?" 
                :props.result? "Win":"Lose"}</span>
                
            </Modal>

        </>
    )
}