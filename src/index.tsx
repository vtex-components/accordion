import React, {
  Children,
  useState,
  ReactElement,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'
import { Box } from 'theme-ui'

import { assertSingleOpen } from './utils/assert'
import Collapsible, { CollapsibleProps } from './Collapsible'

type Props = {
  renderIcon?: (isActive: boolean) => ReactNode
  mode?: 'multiOpen' | 'singleOpen'
  variant?: string
} & {
  children: Array<ReactElement<CollapsibleProps>>
}

function Accordion({
  children,
  renderIcon,
  mode = 'singleOpen',
  variant = 'vtex-components',
}: Props) {
  const [activeKeys, setActiveKeys] = useState<boolean[]>(() =>
    Children.map(children, (child) => !!child.props.isActive)
  )

  const customVariant = `${variant}.accordion`

  const toggleSection = useCallback(
    (key: number) => {
      setActiveKeys((keys) =>
        keys.map((state, index) => {
          if (index === key) {
            return !state
          }

          return mode === 'singleOpen' ? false : state
        })
      )
    },
    [mode]
  )

  useEffect(() => {
    const keys = Children.map(children, (child) => !!child.props.isActive)

    setActiveKeys(keys)
  }, [children])

  useEffect(() => {
    if (mode === 'singleOpen') {
      Children.forEach(children, assertSingleOpen())
    }
  }, [children, mode])

  const onClickSection = (key: number, callback?: Function) => {
    toggleSection(key)
    callback?.(key)
  }

  const createSection = (
    child: ReactElement<CollapsibleProps>,
    key: number
  ) => {
    const props = {
      ...child.props,
      isActive: activeKeys[key],
      onClick: () => onClickSection(key, child.props.onClick),
      renderIcon: child.props.renderIcon ?? renderIcon,
      variant: child.props.variant ?? customVariant,
    }

    return React.cloneElement(child, props)
  }

  const sections = Children.map(children, createSection)

  return <Box variant={customVariant}>{sections}</Box>
}

Accordion.Section = Collapsible

export default Accordion
