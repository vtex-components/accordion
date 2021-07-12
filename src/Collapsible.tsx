import React, { ReactNode, PropsWithChildren } from 'react'
import { Box, Flex } from 'theme-ui'

interface Props {
  header: ReactNode
  variant?: string
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
  variant = 'vtex-components',
}: CollapsibleProps) {
  const handleOnClick = () => {
    onClick?.(id ?? '')
  }

  const customVariant = `${variant}.collapsible`
  const icon = renderIcon?.(isActive)

  return (
    <Box variant={customVariant}>
      <Flex
        data-testid="collapsibleHeader"
        variant={`${customVariant}.header`}
        onClick={handleOnClick}
      >
        {header}
        {icon}
      </Flex>
      {isActive && children}
    </Box>
  )
}

export default Collapsible
