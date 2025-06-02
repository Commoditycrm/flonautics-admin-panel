import { AnyObject } from "antd/es/_util/type"

export const riskLevelHandler = (value: string | number) => {
    const result: AnyObject = {
        color: "",
        text: ""
    }
    if (value == 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        result.color = "success", result.text = "Low"
    } else if (value == 5) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        result.color = "warning", result.text = "Medium"
    } else if (value == 10) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        result.color = "error", result.text = "High"
    }
    else if (value == 15) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        result.color = "default", result.text = "Critical"
    }
    return result
}