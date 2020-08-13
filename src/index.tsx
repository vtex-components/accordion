import React, {
  Children,
  useState,
  ReactElement,
  ReactNode,
  useEffect,
  PropsWithChildren,
  useCallback,
  // useCallback,
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
  const [sections, setSections] = useState<ReactElement[]>([])

  useEffect(() => {
    setActiveKeys({})
  }, [mode])

  const onClickSection = useCallback(
    (key: number, callback?: Function) => {
      const isActive = activeKeys[key]

      setActiveKeys(
        mode === 'multiOpen'
          ? (currentKeys) => ({ ...currentKeys, [key]: !isActive })
          : { [key]: !isActive }
      )

      callback?.(key)
    },
    [activeKeys, mode]
  )

  useEffect(() => {
    const keys: Record<string, boolean> = activeKeys
    const createSection = (child: ReactElement, key: number) => {
      if (mode === 'multiOpen' || Object.keys(keys).length === 0) {
        if (child.props.isActive) {
          keys[key] = true
        }
      }

      const isActive = keys[key]

      const props: CollapsibleProps = {
        ...child.props,
        id: key,
        isActive,
        onClick: () => onClickSection(key, child.props.onClick),
        renderIcon: child.props.renderIcon ?? renderIcon,
        variant: child.props.variant ?? customVariant,
      }

      setActiveKeys(keys)

      return React.cloneElement(child, props)
    }

    setSections(Children.map(children as ReactElement, createSection))
  }, [activeKeys, children, customVariant, mode, onClickSection, renderIcon])

  return <Box variant={customVariant}>{sections}</Box>
}

Accordion.Section = Collapsible

export default Accordion
