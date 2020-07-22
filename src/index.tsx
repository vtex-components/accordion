import React, {
  PropsWithChildren,
  Children,
  useState,
  ReactElement,
  ReactNode,
  Fragment,
} from 'react'

import Collapse, { CollapseProps } from './Collapse'

interface Props {
  renderIcon?: (isActive: boolean) => ReactNode
}

const Accordion = ({ children, renderIcon }: PropsWithChildren<Props>) => {
  const [activeKey, setActiveKey] = useState<string>()

  const onClickItem = (key: string) => {
    if (key !== activeKey) {
      setActiveKey(key)
    } else {
      setActiveKey(undefined)
    }
  }

  const createSection = (child: ReactElement, index: number) => {
    if (!child) return null

    const key = (index as unknown) as string
    const {
      header,
      headerClasses,
      children: accordionChildren,
    } = child.props as CollapseProps

    const isActive = activeKey === key

    const props: CollapseProps = {
      id: key,
      header,
      headerClasses,
      isActive,
      children: accordionChildren,
      onClick: onClickItem,
      renderIcon,
    }

    if (typeof child.type === 'string') {
      return child
    }

    return React.cloneElement(child, props)
  }

  const items = Children.map(children as ReactElement, createSection)

  return <Fragment>{items}</Fragment>
}

Accordion.Section = Collapse

export default Accordion
