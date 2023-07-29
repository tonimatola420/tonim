import React from 'react';
import { Spin } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';
import { AiOutlineLoading3Quarters, AiOutlineLoading } from "react-icons/ai";
import { FiCommand } from "react-icons/fi";
import { ImSpinner, ImSpinner2, ImSpinner3, ImSpinner4, ImSpinner9, ImSpinner10, } from "react-icons/im";
import { CgSpinner, CgSpinnerTwo, CgSpinnerTwoAlt, } from "react-icons/cg";

export default function Loading({ isLoading, children }: { isLoading: boolean, children: any }) {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: 300,
      height: 300,
      margin: "50px auto",
      backgroundColor: "orange",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
    loadingIcon: {
      color: 'teal',
      fontSize: '2rem',
      animation: 'animate 2s infinite',
    },
    
  };
  
  // const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const antIcon = <FiCommand style={styles.loadingIcon} />;
  // const antIcon = <FiCommand style={{ color: gray  }} />;
  

  return (
    <Spin indicator={antIcon} spinning={isLoading}>
      {children}
    </Spin>
  );
}
