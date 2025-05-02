import styled from '@emotion/styled';
import React from 'react';

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  rtl: boolean;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/logo.png"
          alt="Stockly logo"
          loading="lazy"
        />
      </div>
    </StyledSidebarHeader>
  );
};
