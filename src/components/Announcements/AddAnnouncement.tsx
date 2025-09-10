import React, { FC } from 'react'
import { Col, Modal, Row } from 'antd'

import { IAddAnnouncement } from '@/src/data/types'
import CustomInput from '@/src/hoc/CustomInputs/CustomInput'

const AddAnnouncement: FC<IAddAnnouncement> = ({ isOpen, onClose, onOk, loading }) => {
    return (
        <Modal
            centered
            destroyOnHidden
            open={isOpen}
            onOk={onOk}
            onCancel={onClose}
            width={420}
            confirmLoading={loading}
            okText="Yes"
            cancelText="Cancel"
        >
            <Row>
                <Col span={24}>
                    <p className='text-lg font-medium'>Add Announcement</p>
                </Col>

                <Col span={24}>
                    <CustomInput name="title" placeholder="Enter Title" required />
                </Col>

                <Col span={24}>
                    <CustomInput name="description" placeholder="Enter Description" required />
                </Col>

                <Col span={24}>
                    <CustomInput name="instructions" placeholder="Enter Instructions" required />
                </Col>
            </Row>
        </Modal>
    )
}

export default AddAnnouncement