import React from 'react'
import { Text } from 'theme-ui'

import Accordion from '../src/index'

export default {
  title: 'Accordion Component',
  component: Accordion,
}

const Header = <Text>Wazaaa</Text>

export const Emoji = () => {
  return (
    <Accordion>
      <Accordion.Section id="waza" header={Header}>
        <span>sdfsdfsdf</span>
      </Accordion.Section>
      <Accordion.Section id="bla" header="this is the header">
        <span>sdfsdfsdf</span>
      </Accordion.Section>
    </Accordion>
  )
}
