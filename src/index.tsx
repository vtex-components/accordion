import React, {
  PropsWithChildren,
  Children,
  useState,
  ReactElement,
  ReactNode,
} from 'react'
import { Box } from 'theme-ui'

import Collapse, { CollapseProps } from './Collapse'

interface Props {
  renderIcon?: (isActive: boolean) => ReactNode
}

const Accordion = ({ children, renderIcon }: PropsWithChildren<Props>) => {
  const [activeKey, setActiveKey] = useState<number>()

  const onClickItem = (key?: number) => {
    if (key !== activeKey) {
      setActiveKey(key)
    } else {
      setActiveKey(undefined)
    }
  }

  const createSection = (child: ReactElement, index: number) => {
    if (!child) return null

    const isActive = activeKey === index

    const props: CollapseProps = {
      ...child.props,
      id: index,
      isActive,
      onClick: onClickItem,
      renderIcon: child.props.renderIcon ?? renderIcon,
    }

    return React.cloneElement(child, props)
  }

  const items = Children.map(children as ReactElement, createSection)

  return <Box>{items}</Box>
}

Accordion.Section = Collapse

export default Accordion
