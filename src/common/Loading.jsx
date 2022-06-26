import React from 'react'
import { CenteredLayout } from './Layout'
import { Spin } from 'antd'

const Loading = () => {
  return (
    <CenteredLayout>
      <Spin size="large" />
    </CenteredLayout>
  )
}

export default Loading
