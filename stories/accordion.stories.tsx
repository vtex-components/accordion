import React, { useState } from 'react'
import { Text, Box, Button } from 'theme-ui'

import Accordion from '../src/index'
import { CaretUp, CaretDown } from './Icons'
import ThemeProvider from './ThemeProvider'

export default {
  title: 'Accordion',
  component: Accordion,
}

const renderIcon = (isActive: boolean) => (
  <Box paddingLeft={2}>
    {isActive ? <CaretUp size={16} /> : <CaretDown size={16} />}
  </Box>
)

export const SingleOpen = () => {
  const [mode, setMode] = useState<'singleOpen' | 'multiOpen'>('singleOpen')

  const toggleMode = () => {
    setMode(mode === 'singleOpen' ? 'multiOpen' : 'singleOpen')
  }

  return (
    <ThemeProvider>
      <Text>Current mode: {mode}</Text>
      <Button onClick={toggleMode}>Toggle mode</Button>
      <Accordion renderIcon={renderIcon} mode={mode}>
        <Accordion.Section header="What is Lorem Ipsum?" isActive>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </Accordion.Section>
        <Accordion.Section header="How to use it?" isActive>
          <Text>
            t is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using Content here, content here, making
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text,
            and a search for lorem ipsum will uncover many web sites still in
            their infancy. Various versions have evolved over the years,
            sometimes by accident, sometimes on purpose (injected humour and the
            like).
          </Text>
        </Accordion.Section>
      </Accordion>
    </ThemeProvider>
  )
}
