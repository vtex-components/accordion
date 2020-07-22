import React, { useState } from 'react'

import Collapse from '../src/Collapse'

export default {
  title: 'Example Component',
  component: Collapse,
}

export const Default = () => {
  const [isopen, setOpen] = useState(false)

  return (
    <Collapse
      isActive={isopen}
      onClick={() => setOpen(!isopen)}
      header="This is the collapse"
    >
      Wazaaaa
    </Collapse>
  )
}
