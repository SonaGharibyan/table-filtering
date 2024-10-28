import { Button, Drawer, Form, Input, Rate, Select, Slider } from "antd";
import React, { useState } from "react";
import data from "../../data.json";
import { useMediaQuery } from "react-responsive";
import "./products-filters.css";

const ProductsFilters = ({ onFilterChange, onFinish }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isOpen, setIsOpen] = useState(false);

  const getFilterOptions = (key) => {
    return data
      .map((item) => ({ value: item[key] }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((i) => i.value === item.value)
      );
  };

  const getMaxPrice = () => {
    return data.reduce((max, item) => (item.price > max ? item.price : max), 0);
  };

  const debounce = (func, delay = 500) => {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const onApply = (values) => {
    setIsOpen(false);
    onFinish(values);
  };

  const renderForm = (isSubmission) => {
    return (
      <Form
        layout={"vertical"}
        onFinish={onApply}
        className={"products-filters__filters"}
      >
        <Form.Item
          name={"name"}
          label={"Name"}
          className={"product-filters__name"}
        >
          <Input
            placeholder={"Name"}
            onChange={
              !isSubmission
                ? debounce((e) => onFilterChange("name", e.target.value))
                : null
            }
          />
        </Form.Item>
        <Form.Item
          name={"category"}
          label={"Category"}
          className={"product-filters__category"}
        >
          <Select
            mode={"multiple"}
            placeholder={"Category"}
            options={getFilterOptions("category")}
            onChange={
              !isSubmission
                ? (value) => onFilterChange("category", value)
                : null
            }
          />
        </Form.Item>
        <Form.Item
          name={"brand"}
          label={"Brand"}
          className={"product-filters__brand"}
        >
          <Select
            mode={"multiple"}
            placeholder={"Brand"}
            options={getFilterOptions("brand")}
            onChange={
              !isSubmission ? (value) => onFilterChange("brand", value) : null
            }
          />
        </Form.Item>
        <Form.Item
          name={"price"}
          label={"Price"}
          className={"product-filters__price"}
          initialValue={[0, getMaxPrice()]}
        >
          <Slider
            range
            max={getMaxPrice()}
            step={10}
            tooltip={{
              formatter: (number) => number + "$",
              open: !isSubmission,
              placement: "bottom",
            }}
            onChangeComplete={
              !isSubmission
                ? debounce((value) => onFilterChange("price", value))
                : null
            }
          />
        </Form.Item>
        <Form.Item name={"rating"} label={"Rating"}>
          <Rate
            onChange={
              !isSubmission ? (value) => onFilterChange("rating", value) : null
            }
          />
        </Form.Item>
        {isSubmission && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {"Apply"}
            </Button>
          </Form.Item>
        )}
      </Form>
    );
  };

  return (
    <>
      {isMobile ? (
        <>
          <Button
            onClick={() => setIsOpen(true)}
            className={"product-filters__add-button"}
          >
            {"Add Filters"}
          </Button>
          <Drawer
            placement={"left"}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            closable={false}
            className={"product-filters__drawer"}
          >
            {renderForm(true)}
          </Drawer>
        </>
      ) : (
        renderForm()
      )}
    </>
  );
};

export { ProductsFilters };
