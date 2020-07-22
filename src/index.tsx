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
  multiOpen?: boolean
}

const Accordion = ({
  children,
  renderIcon,
  multiOpen = false,
}: PropsWithChildren<Props>) => {
  const [activeKeys, setActiveKeys] = useState<string[]>([])

  const onClickItem = (key: string) => {
    const index = activeKeys.indexOf(key)
    const isActive = index > -1

    if (isActive) {
      setActiveKeys((currentKeys) =>
        currentKeys.filter((current) => current !== key)
      )
    } else {
      setActiveKeys((currentKeys) =>
        multiOpen ? [...currentKeys, key] : [key]
      )
    }
  }

  const createSection = (child: ReactElement, index: number) => {
    const id = index.toString()
    const isActive = activeKeys.indexOf(id) > -1

    const props: CollapseProps = {
      ...child.props,
      id,
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
