import React, {
  Children,
  useState,
  ReactElement,
  ReactNode,
  useEffect,
  PropsWithChildren,
  useCallback,
} from 'react'
import { Box } from 'theme-ui'

import Collapsible, { CollapsibleProps } from './Collapsible'

interface Props {
  renderIcon?: (isActive: boolean) => ReactNode
  mode?: 'multiOpen' | 'singleOpen'
  variant?: string
}

function Accordion({
  children,
  renderIcon,
  mode = 'singleOpen',
  variant = 'vtex-components',
}: PropsWithChildren<Props>) {
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({})
  const customVariant = `${variant}.accordion`

  const toggleItem = useCallback(
    (key: number, isActive: boolean) => {
      setActiveKeys(
        mode === 'multiOpen'
          ? (currentKeys) => ({ ...currentKeys, [key]: isActive })
          : { [key]: isActive }
      )
    },
    [mode]
  )

  useEffect(() => {
    setActiveKeys({})
  }, [mode])

  useEffect(() => {
    Children.map(
      children as ReactElement,
      (child: ReactElement, key: number) => {
        if (child.props.isActive) {
          toggleItem(key, true)
        }
      }
    )
  }, [children, toggleItem])

  const onClickItem = (key: number, callback?: Function) => {
    const isActive = activeKeys[key]

    toggleItem(key, !isActive)
    callback?.(key)
  }

  const createSection = (child: ReactElement, key: number) => {
    const isActive = activeKeys[key]

    const props: CollapsibleProps = {
      ...child.props,
      id: key,
      isActive,
      onClick: () => onClickItem(key, child.props.onClick),
      renderIcon: child.props.renderIcon ?? renderIcon,
      variant: child.props.variant ?? customVariant,
    }

    return React.cloneElement(child, props)
  }

  const items = Children.map(children as ReactElement, createSection)

  return <Box variant={customVariant}>{items}</Box>
}

Accordion.Section = Collapsible

export default Accordion
