import React, { useState } from 'react'
import { Box, Text } from 'theme-ui'

import Collapse from '../src/Collapse'
import { CaretDown, CaretUp } from './Icons'

export default {
  title: 'Collapse',
  component: Collapse,
}

const renderIcon = (isActive: boolean) => (
  <Box paddingLeft={2}>
    {isActive ? <CaretUp size={16} /> : <CaretDown size={16} />}
  </Box>
)

export const Default = () => {
  const [isopen, setOpen] = useState(false)

  return (
    <Collapse
      isActive={isopen}
      onClick={() => setOpen(!isopen)}
      header="What is Lorem Ipsum?"
      renderIcon={renderIcon}
    >
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
    </Collapse>
  )
}
