import React, {
  Children,
  useState,
  ReactElement,
  ReactNode,
  useEffect,
  PropsWithChildren,
} from 'react'
import { Box } from 'theme-ui'

import Collapsible, { CollapsibleProps } from './Collapsible'

interface Props {
  renderIcon?: (isActive: boolean) => ReactNode
  mode?: 'multiOpen' | 'singleOpen'
  prefix?: string
}

function Accordion({
  children,
  renderIcon,
  mode = 'singleOpen',
  prefix = 'vtex-components',
}: PropsWithChildren<Props>) {
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const prefixClassName = `${prefix}-accordion`

  useEffect(() => {
    setActiveKeys([])
  }, [mode])

  const onClickItem = (key: string) => {
    const index = activeKeys.indexOf(key)
    const isActive = index > -1

    if (isActive) {
      setActiveKeys((currentKeys) =>
        currentKeys.filter((current) => current !== key)
      )
    } else {
      setActiveKeys((currentKeys) =>
        mode === 'multiOpen' ? [...currentKeys, key] : [key]
      )
    }
  }

  const createSection = (child: ReactElement, index: number) => {
    const id = index.toString()
    const isActive = activeKeys.indexOf(id) > -1

    const props: CollapsibleProps = {
      ...child.props,
      id,
      isActive,
      onClick: onClickItem,
      renderIcon: child.props.renderIcon ?? renderIcon,
    }

    return React.cloneElement(child, props)
  }

  const items = Children.map(children as ReactElement, createSection)

  return <Box variant={prefixClassName}>{items}</Box>
}

Accordion.Section = Collapsible

export default Accordion
