import React, { FC, useState } from "react";
import { Form, Input } from "antd";

import { ICustomInput } from "@/src/data/types";
import styles from "./styles/customInput.module.css";

const CustomInput: FC<ICustomInput> = ({ name, value, placeholder, onChange, rules, required, type = "text" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = !!value; // Check if the input has a value

    return (
        <Form.Item label="" name={name} rules={rules} required={required} className={styles.formItem}>
            <div className={`${styles.inputContainer} ${isFocused || hasValue ? styles.focused : ""}`}>
                <label className={styles.floatingLabel}>{placeholder}</label>
                <Input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={isFocused ? "" : placeholder} // Hide placeholder when focused
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`${styles.customInput} ${styles.customInputField}`}
                />
            </div>
        </Form.Item>
    );
};

export default CustomInput;
