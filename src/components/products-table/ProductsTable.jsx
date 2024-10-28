import React from "react";
import { Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.localeCompare(b.brand),
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Rating",
    dataIndex: "rating",
    sorter: (a, b) => a.rating - b.rating,
  },
];

const ProductsTable = ({ data, isLoading }) => {
  return (
    <Table
      rowKey={"id"}
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={{ spinning: isLoading, indicator: <LoadingOutlined /> }}
    />
  );
};

export { ProductsTable };
