import React, { ReactNode, PropsWithChildren } from 'react'
import { Box, Flex } from 'theme-ui'

interface Props {
  header: ReactNode
  prefix?: string
  id?: string
  onClick?: (id: string) => void
  isActive?: boolean
  renderIcon?: (isActive: boolean) => ReactNode
}

export type CollapsibleProps = PropsWithChildren<Props>

function Collapsible({
  id,
  header,
  children,
  isActive = false,
  onClick,
  renderIcon,
  prefix = 'vtex-components',
}: CollapsibleProps) {
  const handleOnClick = () => {
    onClick?.(id ?? '')
  }

  const variant = `${prefix}.collapsible`
  const icon = renderIcon?.(isActive)

  return (
    <Box variant={variant}>
      <Flex variant={`${variant}.header`} onClick={handleOnClick}>
        {header}
        {icon}
      </Flex>
      {isActive && children}
    </Box>
  )
}

export default Collapsible
